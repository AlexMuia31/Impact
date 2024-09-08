// STK PUSH IMPORTS
import { Request, Response } from "express";
import axios from "axios";
import { generateAuth, generatePassword} from "./mpesa-auth"
import {formatMpesaNumber, randomCode } from "./helpers";
import { config } from "../../config";
import { User, Transaction, Wallet, Balance } from "../../database/models";
import { createERCWallet } from "../../routes/bsc";
import { checkBalance, newBalance } from "../../routes/balanceChecker";
import {getFees } from "../../utils/fees";
import { priceFeed_KES } from "../../utils/price-feed";

// STK PUSH CONTROLLER
const stkPushController = async (
  access_token: string,
  BusinessShortCode: number,
  Password: string,
  Timestamp: string,
  Amount: number,
  PartyA: number,
  PartyB: number,
  PhoneNumber: number,
  CallBackURL: string
) => {
    let url = config.MPESA.STK_PUSH_URL!;

    let data ={
        BusinessShortCode,
        Password,
        Timestamp,
        TransactionType:"CustomerPayBillOnline",
        Amount,
        PartyA,
        PartyB, // Same as BusinessShortCode
        PhoneNumber, // PartyA
        CallBackURL,
        AccountReference: "musapay-limited",
        TransactionDesc: "Test Payment"
    }

    // console.log({access_token,data, url});

    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });
        // console.log("STK PUSH RESPONSE:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("STK PUSH ERROR: ", error);
        return error;
    }
};

// STK PUSH ENDPOINT
const stkPush = async (req: Request, res: Response) => {
    try {
        //Params
        const PhoneNumber= Number(formatMpesaNumber(req.body.PhoneNumber));
        const Amount = parseFloat(req.body.Amount);
        let fees = 0;
        const BusinessShortCode = Number(process.env.BUSINESS_SHORTCODE);
        const ShortCode =Number(process.env.SHORTCODE);
        const {timestamp, password} = generatePassword();
        const access_token_object = await generateAuth();
        const access_token: any = access_token_object.access_token;
        const CallBackURL = config.MPESA.CALLBACK_URL!;

        // Build TXN
        const tx = await stkPushController(
            access_token,
            BusinessShortCode,
            password,
            timestamp,
            Amount,
            PhoneNumber, // PartyA
            BusinessShortCode, // PartyB
            PhoneNumber, // PartyA
            CallBackURL
        ).then((data) => {
            return data;
        });

        console.log("STK PUSH TX:", tx);



        // CREATE INITIAL TRANSACTION

        //params
        const tx_number = randomCode();
        const recipient = Number(formatMpesaNumber(req.body.recipient)); // Phone Number
        const currency = req.body.currency;
        const token = req.body.token;
        const isTesnet = req.body.isTestnet;
        const chainID = isTesnet ? 97 : 56;

        const userExist = await User.findOne({phone_number: recipient});
        console.log("User Exist:", userExist)



        const txnParams = {
            tx_number,
            recipient,
            amount: Amount,
            fees,
            currency,
            token,
            method: "MPESA",
            status: "PENDING",
            type: "DEPOSIT",
            date: new Date(),
            mpesaPhoneNumber: PhoneNumber,
            merchantRequestID: tx.MerchantRequestID,
            checkoutRequestID: tx.CheckoutRequestID,
            mpesaReceiptNumber: "",
            narration: `Deposit from ${PhoneNumber} to Account: ${recipient} waiting Completion`,
        }
        console.log({txnParams});


     // 1. Check if user exists
    if(!userExist || userExist === null){


      // 2. Generate wallet
      const walletInfo = await createERCWallet(isTesnet).then((wallet) => {
        return wallet;
      });

      // 3. Create a new user
      const newUser = await User.create({
        phone_number: PhoneNumber,
        eth_address: walletInfo.walletAddress,
        chainIDs: [chainID],
      }).then((doc) => {
        return doc;
      });

      console.log("New User Created:", newUser);

      console.log("Wallet Info:", walletInfo);
      // 4. Create a new wallet
      const newWalletDoc = await  Wallet.create({
        user: (newUser)._id,
        addressId: "",
        privateKey: walletInfo.walletPivateKey,
        publicKey: walletInfo.walletAddress,
        mnemonic: walletInfo.mnemonic,
        chainID: 97,
      }).then((doc) => {
        return doc;
      });

      console.log("New Wallet Created:",newWalletDoc);

      // Get Fees and Price in USD
      const priceKES= await  priceFeed_KES(currency)
      const amountUSD = priceKES.quote.USD.price * Amount;
      const fee_Obj = await getFees(newUser._id, amountUSD.toString(), token);
      if(!fee_Obj){
        return null;
      }
      fees = fee_Obj.fees_total;

      // 5. Save the transaction to the database
      const txnDoc = await Transaction.create({
        ...txnParams,
        user: (await newUser)._id,
        recipient: (await newUser).phone_number,
      }).then((doc) => {
        return doc;
      });
      console.log("Transaction Saved:", txnDoc);

      // 6. Create a new balance
      const balDoc = await Balance.create({
        user: (await newUser)._id,
        tx_number: txnDoc.tx_number,
        tx_id: txnDoc._id,
        debit: 0,
        credit: 0,
        balance: 0,
        balHistory: [],
        currency: currency,
        token: token,
        method: "MPESA",
      }).then((doc) => {
      return doc;
      })

      console.log("New Balance Account Created:", balDoc);
      const newBal = await newBalance(txnDoc, newUser, recipient).then((doc) => {
        return doc;
      });

      return res.status(200).json({
        success: true,
        message: "MPESA TXN SAVED PENDING",
        stkPush: tx,
        data: txnDoc,
        user: newUser,
        wallet: newWalletDoc,
        balance: newBal,
      });
    }
    else{
        // Get the user wallet
        const wallet = await Wallet.findOne({user: userExist._id}).then((doc) => {
            return doc;
        });
        console.log("User Wallet:", wallet);

        // Get Fees and Price in USD
      const priceKES= await  priceFeed_KES(currency)
      const amountUSD = priceKES.quote.USD.price * Amount;
      const fee_Obj = await getFees(userExist._id, amountUSD.toString(), token);
      if(!fee_Obj){
        return null;
      }
      fees = fee_Obj.fees_total;

        // Save the transaction to the database
        const txnDoc = await  Transaction.create({
            ...txnParams,
            user: userExist._id,
            recipient: userExist.phone_number,
        }).then((doc) => {
            return doc;
        });

        console.log("Transaction Created as Pending...:", txnDoc);

        // Create a new balance
        const currBal = await checkBalance(userExist._id, userExist.phone_number).then((doc) => {
          return doc;
        });
        console.log("Current Balance:", currBal);

        // QUery balance (DO NOT UPDATE)
        // const newBal = await newBalance(txnDoc, userExist, recipient).then((doc) => {
        //   return doc;
        // });

        return res.status(200).json({
            success: true,
            message: "MPESA TXN SAVED PENDING",
            stkPush: tx,
            data: txnDoc,
            user: userExist,
            wallet: wallet,
            balance : currBal,
        });
    }

    } catch (error:any) {
      console.log("STK PUSH ERROR:", error);
      res.status(500).json({
			success: false,
			message: "[STK PUSH]: MPESA API",
			error: error,
		});

    }
};

export { stkPush}
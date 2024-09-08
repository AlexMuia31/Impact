import {Request,Response, Router} from "express";
import jwt from "jsonwebtoken"
import { User, IUser, Wallet, Balance } from "../database";
import { createERCWallet } from "./bsc";
import {config} from "../config"
import { UserInfo } from "../types";
import { formatMpesaNumber } from "../payment-gateway/mpesa";
import {newBalance,checkBalance, balanceCheckerRouter } from "./balanceChecker";

const router = Router();

router.post("/connect-user", async (req:Request, res:Response)=>{
    const {PhoneNumber, isTestnet} = req.body;
    const phone_number =Number(formatMpesaNumber(PhoneNumber));
    let user:IUser= await User.findOne({phone_number}).then((user) => user).catch((err) => err);
    let _chainID = (isTestnet ? 97 : 56).toString();
    console.log("User Found:", user,"\n User ID");


    if(!user){
        // Create a new user
        const walletInfo = await createERCWallet(isTestnet);
        const newUser = await User.create({
            phone_number: phone_number,
            eth_address: walletInfo.walletAddress,
            chainIDs: [isTestnet ? 97 : 56]
        }).then((doc) => doc);
        console.log("New User Created:", newUser);

        const newWalletDoc = await Wallet.create({
            user: (newUser)._id,
            addressId: "",
            privateKey: walletInfo.walletPivateKey,
            publicKey: walletInfo.walletAddress,
            mnemonic: walletInfo.mnemonic,
            chainID: isTestnet ? 97 : 56
        }).then((doc) => doc);

        console.log("New Wallet Created:", newWalletDoc);
        let eth_address = newUser.eth_address;
        let chainID = newUser.chainIDs;
        let _phone_number = newUser.phone_number;
        let id = newUser._id;
        const token = jwt.sign({eth_address, phone_number:_phone_number, chainID},`${config.APP.JWT_SECRET}`,{expiresIn:config.APP.JWT_EXPIRES_IN});

        req.currUser = {eth_address:newUser.eth_address, phone_number:newUser.phone_number, chainID, id, token, is_active:true} as UserInfo;

        console.log("New User Connected:", req.currUser);

        // TODO Get Wallet Balance
        // CREATE A NEW BALANCE
        const  newBalAcc = await Balance.create({
            user: (newUser)._id,
            tx_number: "",
            tx_id: null,
            debit: 0,
            credit: 0,
            balance: 0,
            balHistory: [{debit: 0, credit: 0, balance: 0, timestamp: new Date()}],
            currency: "KES",
            token: "USDT",
            method: "MPESA"
        }).then((doc) => doc);
        const newBal = await checkBalance (newBalAcc._id, phone_number).then((doc)=>{
            return doc;
        });

        console.log("New Balance Created:", newBal);

        return res.status(200).json({
            success: true,
            message: "User Connected",
            data: (req.currUser) as UserInfo,
            wallet: newWalletDoc,
            token,
            balance: newBal
        });
     }
     let id = user.id;
    const token = jwt.sign({eth_address:user.eth_address, phone_number:user.phone_number, chainID:[_chainID], is_active:true},`${config.APP.JWT_SECRET}`,{expiresIn:config.APP.JWT_EXPIRES_IN});

    req.currUser= {eth_address:user.eth_address, phone_number:user.phone_number, chainID:[_chainID], id, token, is_active:true} as UserInfo;
    console.log("Existing User Connected:", req.currUser);

    // TODO Get Wallet Balance
    const newBal = await checkBalance(id, phone_number).then((doc)=>{
        return doc;
    });

    return res.status(200).json({
        success: true,
        message: "User Connected",
        data: (req.currUser) as UserInfo,
        token,
        balance: newBal
    });

})

// Disconnect User
router.post("/disconnect-user", async (req:Request, res:Response)=>{
    const token = "";
    req.currUser = {eth_address:"", phone_number:"", chainID:"", id:"", token:"", is_active:false} as unknown as UserInfo;

    console.log("User Disconnected:", req.currUser);
    return res.status(200).json({
        success: true,
        message: "User Disconnected",
        data: req.currUser,
        token,
        balance: 0
    });
});

export {router as connectUser}
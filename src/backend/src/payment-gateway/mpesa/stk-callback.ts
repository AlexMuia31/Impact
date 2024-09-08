import {Request, Response} from "express";
import { CallbackItem, getItemValue,randomCode } from "./helpers";
import { Transaction, Balance, User } from "../../database/models";
import {newBalance} from "../../routes/balanceChecker"
import { priceFeed_KES } from "../../utils/price-feed";

export const callback = async (req: Request, res:Response)=>{
    try {
        const bodyString = JSON.stringify(req.body);
        console.log("MPESA CALLBACK:", bodyString);

      if (req.body.Body.stkCallback.ResultCode !== 0) {
			console.log("Payment Unsuccessful. CALLBACK MSG:", bodyString);

      //TODO Implement a Method to handle failed transactions/Cancelled by user
      // Payment Unsuccessful. CALLBACK MSG: {"Body":{"stkCallback":{"MerchantRequestID":"69be-41a1-9cc1-b494e9e2076631150284","CheckoutRequestID":"ws_CO_01082024205244471727641393","ResultCode":1032,"ResultDesc":"Request cancelled by user"}}}

			return res
				.status(200)
				.json({ success: false, message: "MPESA CALLBACK", data: bodyString });
		} else {
			console.log("Payment Successful:", bodyString);
      const stkCallback = req.body.Body.stkCallback;
      const jsonData = bodyString;
      console.log("STK CALLBACK:", stkCallback);

			// TODO: Save the transaction to the database
	const { MpesaReceiptNumber, TransactionDate } =
        stkCallback.CallbackMetadata.Item.reduce(
          (acc: any, item: CallbackItem) => {
            acc[item.Name] = item.Value;
            return acc;
          },
          {}
        );
    const phoneNumber: string = getItemValue(
            stkCallback.CallbackMetadata.Item,
            "PhoneNumber"
          )?.toString() || "";
		const CheckoutRequestID = stkCallback.CheckoutRequestID;

    console.log("MPESA CALLBACK DATA:", phoneNumber, MpesaReceiptNumber, TransactionDate, CheckoutRequestID);

    // Check if txn exists
    const txnExists = await Transaction.findOne({checkoutRequestID:CheckoutRequestID}).then((doc) => {
      return doc;
    });

    if(!txnExists){
      console.log(`NULL TXNs:, ${txnExists}, ${CheckoutRequestID}`);
      return res.status(200).json({
        success: false,
        message: "MPESA TXN NOT FOUND",
        data: bodyString,
        tx: CheckoutRequestID
      });
    }

    console.log("Transaction Exists:", txnExists);

    const tx_number = txnExists?.tx_number;
    const user = txnExists?.user;
    const recipient = txnExists?.recipient;

    // Convert Fees to Local Currency
    const priceKES = await priceFeed_KES("KES");
    const feesInKES = priceKES.quote.USD.price * parseFloat(txnExists?.fees.toString() || "0"); // Convert to KES


// Update the params
    	const txParams = {
      tx_number,
      user,
      recipient,
      amount:Number(
            getItemValue(stkCallback.CallbackMetadata.Item, "Amount")
          ) - feesInKES,
      fees: feesInKES,
			method: "MPESA",
			status: "COMPLETED",
      type: "DEPOSIT",
			date: new Date(TransactionDate),
			mpesaPhoneNumber: getItemValue(
            stkCallback.CallbackMetadata.Item,
            "PhoneNumber"
          )?.toString(),
			MpesaReceiptNumber,
      narration: `Deposit from ${phoneNumber} to Account: ${recipient} updated status to COMPLETED at: ${new Date()}`,
		};


    // check txn status
    if(txnExists && txnExists.status === "PENDING"){
      // update txn status
      const updatedTxn = await Transaction.findOneAndUpdate({checkoutRequestID:CheckoutRequestID}, txParams, {new: true}).then((doc) => {
        return doc;
      });


      console.log("Transaction Updated:", updatedTxn);

      // Update Balances
        const _user = await User.findOne({$or:[{user},{phone_number:recipient}]}).then((doc) => {
        return doc;
        });
      const newBal = await newBalance(updatedTxn,user,recipient!)
      console.log("New Bal", newBal)

      return res.status(200).json({
        success: true,
        message: "MPESA TXN Updated To Complete",
        data: bodyString,
        tx: txnExists,
        balance: newBal,
        user: _user
      });
    }
    else{
      console.log("Manually Check Tx:", txnExists);
      const txnStatus = txnExists?.status || null;

        console.log("Transaction Status:", txnExists);
        return res.status(200).json({
          success: false,
          status: txnStatus,
          message: "MPESA TXN COMPLETED |CANCELED | TXN NOT FOUND",
          data: bodyString,
          tx: txnExists,
      });
    }
    }

    }
     catch (error) {
        console.log("Error Processing Callback:", error)
        res.status(500).json({
            success:false,
            error:"YOOH! Internal Server Error!"
        })

    }

}


import {config} from "../../config";
import axios from "axios";
import { generateAuth } from "./mpesa-auth";
import { randomCode, formatMpesaNumber } from "./helpers";
import {generateSecurityCredential} from "./mpesa-auth";
import { Transaction, User} from "../../database/models";
import { getFees } from "../../utils/fees";
import { priceFeed_KES } from "../../utils/price-feed";

const b2c = async (amount: number, phone: string) => {
  try {
    const b2cUrl = config.MPESA.B2C_URL!;

    const token = await generateAuth();
    // const password = await generatePassword();



    const OriginatorConversationID = randomCode() ;
    const InitiatorName = "EnockB2CAPI";
    const SecurityCredential= generateSecurityCredential();
    const PartyA= config.MPESA.SHORTCODE
    const PartyB= formatMpesaNumber(phone);
    const Remarks="Musa-Mensah Dispursement"
    const QueueTimeOutURL=config.MPESA.QUEUE_TIMEOUT_URL
    const ResultURL=config.MPESA.RESULT_URL
    // console.log({token, SecurityCredential, password});

// Calculate Fees
    let fees = 0;
    // Save the transaction details
      const userExists =  await User.findOne({phone_number: PartyB});
       // Calculate Fees
      const feesObj = await getFees(userExists?.id, amount.toString());
      if(feesObj){
          fees = feesObj.fees_total;
      }
        // Calculate Fees in Local Currency
        const priceKES = await priceFeed_KES("KES");
        const feesKES = fees /  priceKES.quote.USD.price;
        let amountLessFee = amount -= feesKES;


    //PARAMS
    const c2bParams = {
   OriginatorConversationID,
   InitiatorName,
   SecurityCredential,
   CommandID:"BusinessPayment",
   Amount:amountLessFee,
   PartyA,
   PartyB,
   Remarks,
   QueueTimeOutURL,
   ResultURL,
   Occassion:"OFF-RAMPING"
}

    const response = await axios.post(b2cUrl, c2bParams, {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    });

    console.log("B2C ENDPOINT:",response.data);

//   B2C ENDPOINT: {
//   ConversationID: 'AG_20240819_20500d5972b98a7ca7ad',
//   OriginatorConversationID: 'f972-4d44-860a-95efa5882799144816420',
//   ResponseCode: '0',
//   ResponseDescription: 'Accept the service request successfully.'
// }

    if (response.data.ResponseCode === "0") {
      // TODOs
      // Create a new DB Transaction
        const tx_number = randomCode();
        const txnParams = {
            tx_number,
            recipient: PartyB,
            amount,
            fees: feesKES,
            currency: "KES",
            token: "USDT",
            method: "MPESA",
            status: "PENDING",
            type: "WITHDRAW",
            date: Date.now(),
            mpesaPhoneNumber: PartyB,
            offramping: "PENDING",
            conversationId: response.data.ConversationID,
            originatorConversationId: response.data.OriginatorConversationID,
            responseDescription: response.data.ResponseDescription,
            narration: `Txn: ${tx_number}. Withdrawal KES: ${amount} from ${PartyB} waiting Completion.\n${Remarks} `,
        }
        console.log({txnParams});


      const tx = await  Transaction.create({
          ...txnParams,
        user: userExists?._id,
        recipient: PartyB
    }).then((data) => {
        return data;
    });

    console.log("B2C TX Created as Pending:", tx);
    return response.data;
    }
    return `B2C Payment Failed", ${response.data}`;
  } catch (error:any) {

    return error;
  }
};

export {b2c};


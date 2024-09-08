import { config } from "../../config";
import { generateAuth } from "./mpesa-auth";
import { Request, Response } from 'express';
import axios from "axios";


export const getTxnStatus = async (TransactionID:string,OriginatorConversationID:string) => {
    // Params
  const url = config.MPESA.TXN_STATUS_URL;
const token = await generateAuth();
const SecurityCredential = Buffer.from(`${config.MPESA.B2C_PASSWORD}${config.MPESA.BUSINESS_SHORTCODE}`).toString('base64')
const PartyA = config.MPESA.SHORTCODE;
const Remarks="Musa-Mensah Dispursement"
const QueueTimeOutURL=config.MPESA.QUEUE_TIMEOUT_URL
const ResultURL=config.MPESA.RESULT_URL


    const data = {
        Initiator:"EnockB2CAPI",
        SecurityCredential,
        CommandID: "TransactionStatusQuery",
        TransactionID,
        OriginatorConversationID,
        PartyA,
        IdentifierType: "4",
        ResultURL,
        QueueTimeOutURL,
        Remarks,
        Occasion:"B2C Transaction Status"
    }
    try {
        const response = await axios.post(url!, data, {
            headers: {
                Authorization: `Bearer ${token.access_token}`
            }
        });
        return response.data;
    } catch (error:any) {
        console.log({error: error.response.data});
        return error
    }
}


// TSET API
export const statusRouter = async (req: Request, res: Response) => {
	try {
		const { TransactionID, OriginatorConversationID } = req.body;
		const response = await getTxnStatus(
			TransactionID,
			OriginatorConversationID
		);
		res.json({ response });
	} catch (error) {
		console.log({ error });
		res.json({ error });
	}
}


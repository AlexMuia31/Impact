import axios from "axios";
import { Request, Response } from "express";

// AUTHORIZATION
const generateAuth = async () => {
	//Generate Auth Token Access  Authorization
	const BasicAuth = `Basic ${Buffer.from(
		`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`,
		"utf8",
	).toString("base64")}`;

	const url ="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: BasicAuth,
				"Content-Type": "application/json",
			},
		});

		return response;
	} catch (error:any) {
        console.log("Error Generating AUth: ", error.response);
		return error.response;
	}
};

// TEST AUTH-API ROUTE
export const testMpesaAuth= async (
	req: Request,
	res: Response,
) =>{
	const authToken = await generateAuth();

	res.status(200).json({
		success: true,
		message: "[TEST API ROUTE]: MPESA API At Work!",
		token: authToken!.data,
	});
}

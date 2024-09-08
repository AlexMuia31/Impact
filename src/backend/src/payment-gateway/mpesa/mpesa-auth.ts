import {Request, Response, NextFunction} from "express";
import axios from "axios";
import {config} from "../../config";
import crypto from "crypto";
import fs from "fs";

// AUTHORIZATION

export const generateAuth = async () => {
    const BasicAuth =`Basic ${Buffer.from(`${config.MPESA.KEY}:${config.MPESA.SECRET}`, "utf8",).toString('base64')}`;

    const url = config.MPESA.AUTH2TOKEN_URL!;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: BasicAuth,
                "Content-Type": "application/json",
            },
            params: {
                grant_type: "client_credentials",
            },
        });
        console.log("MPESA AUTH: ", url, response.data);

        return response.data;


    } catch (error) {
        console.log("Error Generating Auth: ", error);
        return error;
    }
};

// Generate STK Password
export const generatePassword = () =>{
    // const timestamp = moment().format("YYYYMMDDHHmmss");
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
    const businessShortCode = config.MPESA.BUSINESS_SHORTCODE;
    const passkey = config.MPESA.PASSKEY;
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`,"utf8",).toString("base64");

    // Buffer.from(businessShortCode + passkey + timestamp).toString("base64");

    // console.log({password, timestamp, businessShortCode, passkey});

    return {password, timestamp};
}

// Generate SecurityCredential
export const generateSecurityCredential = () =>{
    const publicKey = fs.readFileSync(`ProductionCertificate.cer`, "utf8");

    const initiatorPwd = Buffer.from(config.MPESA.B2C_PASSWORD!);

    const securityCredential = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, initiatorPwd).toString("base64");
    // console.log("Security Credential: ", securityCredential);
    return securityCredential;
}


// TEST AUTHORIZATION

export const testMpesaAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = await generateAuth();

        res.status(200).json({
            success: true,
            message: "[AUTHORIZATION]: Mpesa Auth Generated Successfully",
            token: authToken,
        });

    } catch (error) {
        console.log("Error Testing Mpesa Auth: ", error);
        res.status(500).json({
            success: false,
            message: "[AUTHORIZATION]: Error Testing Mpesa Auth",
            error: error
        });
    }
};
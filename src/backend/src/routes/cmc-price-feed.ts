import { Router, Request, Response } from "express";
import {priceFeed_KES,priceFeed_Token, cryptoMap} from "../utils/price-feed";

const router = Router();

router.get("/cmc-price-feed-kes", async (req:Request, res:Response) => {
    try {
        // Add code
        const {currency} = req.body;
        const response = await priceFeed_KES(currency);

        return res.status(200).json({success:true, data:response});
    } catch (error) {
        console.log('ERROR', error);
        return res.status(500).json({success:false, error});
    }
});

router.get("/cmc-price-feed-token", async (req:Request, res:Response) => {
    try {
        // Add code
        const {token} = req.body;
        const response = await priceFeed_Token(token);

        return res.status(200).json({success:true, data:response});
    }
    catch (error: any) {
        console.log('ERROR', error);
        return res.status(500).json({success:false, error});
    }

});

router.get("/cmc-crypto-map", async (req:Request, res:Response) => {
    try {
    const response = await cryptoMap();

    return res.status(200).json({success:true, count: response.length, data:response});
        
    } catch (error) {
        console.log('ERROR Crypto Map:', error);
        return res.status(500).json({success:false, error});
        
    }
});

export { router as cmcPriceFeedRouter };
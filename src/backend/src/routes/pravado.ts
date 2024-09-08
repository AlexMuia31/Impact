import {Request, Response, Router} from 'express';
import { getAuth } from './../utils/privadoId';


const router = Router();

router.get("/pravado", async (req:Request, res:Response)=>{
    console.log("Pravado Request:", req.body);
    let auth = await getAuth(req, res);
    console.log("Pravado Response:", auth);
    return res.status(200).json({
        success: true,
        message: "Pravado Request API",
        data: auth
    });

})

export {router as pravado}
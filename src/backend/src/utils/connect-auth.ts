import { Request, Response, NextFunction, Router } from "express";
import jwt from "jsonwebtoken";
import { UserInfo } from "../types";
import {config} from "../config"


export const auth = (req:Request, res:Response,next:NextFunction) =>{
    let authToken: any

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        authToken = req.headers.authorization.split("")[1];
    }

    const accessToken = req.currUser.token|| authToken;

    if(!accessToken){
        return res.status(401).json({message:"Unauthorized!. Click Connect"})
    }

    try {
        const decoded = jwt.verify(accessToken, config.APP.JWT_SECRET!) as UserInfo;
        console.log("Decoded: ",decoded);
        req.currUser = decoded;

        if(!req.currUser){
            return res.status(401).json({message:"Unauthorized!. Click Connect"})
        }
        next();        
    } catch (error) {
        console.log("Auth Error: ",error)
        return res.status(401).json({message:"Unauthorized!. Click Connect", error})        
    }

}
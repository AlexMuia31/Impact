import { Types } from "mongoose";

export interface UserInfo {
    eth_address: string;
    phone_number: string;
    chainID: string[];
    id?: Types.ObjectId;
    token?: string;
    is_active?:boolean;
}

declare global {
    namespace Express {
        interface Request {
            currUser: UserInfo;
        }
    }
}
import { User, Wallet } from '../database/';
import { Request, Response } from 'express';
import { createERCWallet } from '../routes/bsc';
import {IUserMetadata} from "../utils/interfaces";

// TODO
// 1. Add a new user
// - Create a new user with the following details:
//     - eth_address: "0x5b1869D9A4C187f2EAa108f3062412ecf0526b24"
//     - phone_number: "+254712345678"
//     - chainID: "ETH"


const userMetadata = async (req?:Request, res?:Response, metadata?:IUserMetadata) => {
try {
// User details
const { phone_number, token, chainId, is_testnet} = req!.body || metadata;

// Check if user exists
const userExists = await User.findOne({phone_number});
if(userExists){
    return res!.status(200).json({Msg: 'User already exists!', userInfo: userExists});
}

// create a ERC20 wallet
const wallet = await createERCWallet(is_testnet);

// Wallet details
const { walletAddress, walletPivateKey, mnemonic } = wallet;

// Create a new user
const newUser = new User({
    phone_number,
    eth_address: walletAddress,
    chainIDs: [chainId]
});
const userInfo = await newUser.save();
console.log('User Info:', userInfo);

// Save wallet details
const newWallet = new Wallet({
    user: userInfo.id,
    address: walletAddress,
    privateKey: walletPivateKey,
    publicKey: walletAddress,
    mnemonic,
    chainId
});
const walletInfo = await newWallet.save();
console.log('Wallet Info:', walletInfo);

// Return user info
res!.status(200).json({userInfo, walletInfo, token, chainId});

    
} catch (error) {
    console.error('Error in user manager!', error);
    res!.status(500).json({error});
    
}
}
export { userMetadata };
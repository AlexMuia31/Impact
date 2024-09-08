import { ethers } from 'ethers';
import {Types, ObjectId} from 'mongoose';
import {erc20Wrapper} from '../payment-gateway/ethereum/ercWallet';
import { bscRPC } from '../routes/bsc';
import {config } from '../config'
import { Wallet } from "../database"
import {priceFeed_Token} from '../utils/price-feed';


export const getFees = async (userId: string | Types.ObjectId, amountUSD:string, token?:string) => {
    try {
        let isTestnet  = config.APP.IS_TESTNET as boolean;
        const rpcUrl = await bscRPC(isTestnet);

        const getWallet = await Wallet.findOne({user: userId});

        if(!getWallet){
            return null;
        }
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        await  erc20Wrapper.connect(getWallet!.privateKey, rpcUrl);
        const _gasFee = await provider.estimateGas({to: getWallet!.publicKey});
        let _token = token ? token: 'ETH';

         // Convert fee to USD
        const ethPrice = await priceFeed_Token(_token);
        let gasFee = await erc20Wrapper.gasFee();

        gasFee = gasFee? gasFee : _gasFee;

        const gasFeeInEth = parseFloat(ethers.formatUnits(gasFee, 'gwei'));

        // Add slippage
        let feeSlippage = 1.8;
        const gasFeeInUSD = (gasFeeInEth * feeSlippage) * parseFloat(ethPrice.quote.USD.price);
        // console.log({gasFee, gasFeeInEth, gasFeeInUSD});

        let musaPayFeePercent = config.TREASURY_WALLET.FEE_PERCENTAGE! as string;
        const musaPayFee =  (parseFloat(musaPayFeePercent) * parseFloat(amountUSD)) // IN CURRENT CURRENCY

        const fees_total = gasFeeInUSD + musaPayFee;
        return {fees_total, gasFeeInUSD, musaPayFee};

    } catch (error) {
        console.log('Error getting fees', error);
        return null;
    }
}
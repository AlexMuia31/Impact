import { ethers} from 'ethers'
import { config, ERC20ABI} from '../../config'
import { Overloads } from '../../utils/interfaces';

// SUPPORTED TOKENS
const SUPPORTED_TOKENS_ADDR = config.BSC_SUPPORTED_TOKENS.map((token) => token.address);
const SUPPORTED_TOKENS = config.BSC_SUPPORTED_TOKENS.map((token) =>{
    const symbol=  token.symbol
    const address = token.address
    return {symbol,address}
});

// MAX INT
export const MAX_INT =
		"115792089237316195423570985008687907853269984665640564039457584007913129639935";

class ERC20Wrapper{
    // initialize
    private _provider: ethers.JsonRpcProvider | undefined;
    private _wallet: ethers.Wallet| undefined;

    get provider(){
        if(!this._provider) throw new Error('Provider not set');
        return this._provider;
    }

    get wallet(){
        if(!this._wallet) throw new Error('Wallet not set');
        return this._wallet;
    }

    async connect(privateKey: string, rpcUrl: string){
        return new Promise((resolve, reject) => {
            try {

        this._provider = new ethers.JsonRpcProvider(rpcUrl);
        this._wallet = new ethers.Wallet(privateKey, this._provider);
        resolve(true);
         } catch (error) {error
                reject(error)
            }
        })
    }
    async gasFee(){
        try {
            const gasPrice = await this.provider.estimateGas({to: this.wallet.address});
            return gasPrice;
        } catch (error:any) {
            console.log('Error getting gas fee', error);
            return error;
        }
    }

    async balanceOfToken(token: string): Promise<string> {
    try {
        const contract = new ethers.Contract(token, ERC20ABI, this.wallet);
        const balance = await contract.balanceOf(this.wallet.address).then((balance) => {
            return balance;
        });
        const decimals = await contract.decimals().then((decimals) => {
            return decimals;
        });

        return ethers.formatUnits(balance, decimals);
    } catch (error:any) {
        console.log('Error getting balance of token', error)
      return error
    }
  }

    async getbalanceOfEth(): Promise<string> {
        try {
            const balance = await this.provider.getBalance(this.wallet.address);
            return ethers.formatEther(balance);
        } catch (error:any) {
            console.log('Error getting balance of eth', error);
            return error;
        }
    }

    async getAllowance(tokenAddress: string, spender: string): Promise<string> {
        try {
            const contract = new ethers.Contract(tokenAddress, ERC20ABI, this.wallet);
            const allowance = await contract.allowance(this.wallet.address, spender);
            const decimals = await contract.decimals();

            return ethers.formatUnits(allowance, decimals);
        } catch (error) {
            console.log('Error getting allowance', error);
            return "0";
        }
    }

    async approve(tokenAddress: string, spender: string, overloads:Overloads): Promise<string | null> {
        try {
            const contract = new ethers.Contract(tokenAddress, ERC20ABI, this.wallet);
            const txReceipt = await contract.approve(spender, MAX_INT, overloads);
            const txStatus = await txReceipt.wait();
            if(txStatus.status === 1){
                console.log('MAX Approved!: ', txReceipt);
                return txReceipt;
            }
            throw new Error(`Approval failed! ${ txReceipt}`);
        } catch (error:any) {
            console.log('Error approving', error);
            return error;
        }
    }

    // transfer ERC Wallet to ERC Wallet
    async transfer(tokenAddress: string, to: string, amount: string, is_eth:boolean, overloads:Overloads): Promise<ethers.TransactionReceipt | string | null> {
        if(is_eth){
        try {

            //balance check
            const balanceEth = await this.getbalanceOfEth();
            console.log({balanceEth});
            if(parseFloat(balanceEth) < parseFloat(amount)){
                throw new Error('Insufficient balance');
            }

            // Balance Supported Tokens
            if(!SUPPORTED_TOKENS_ADDR.includes(tokenAddress)){
                throw new Error('Token not supported');
            }

            // allowance check
            const allowanceEth = await this.getAllowance(tokenAddress, to);
            console.log('Allowance:', allowanceEth);

            // Approve
            if(parseFloat(allowanceEth) < parseFloat(amount)){
                console.log('Approving Eth...');
                const approveEth = await this.approve(tokenAddress, to, overloads);
                return approveEth;
            }

            const payload = {
                to,
                value: ethers.parseEther(amount),
                ...overloads
            }

            const txReceipt = await this.wallet.sendTransaction(payload);
            const tx = await txReceipt.wait();

            if(tx!.status === 1){
                console.log('Transaction Successful!');
                return tx
            }
            console.log('Transaction Failed!', tx);
                return tx;


        } catch (error:any) {
            console.log('Error transferring ETH', error);
            return error;
        }
    }

    try {
        //balance check
        const balanceToken = await this.balanceOfToken(tokenAddress);
        console.log('Token Balance:', balanceToken);
        if(parseFloat(balanceToken) < parseFloat(amount)){
            throw new Error('Insufficient balance');
        }

        // allowance check
        const allowanceToken = await this.getAllowance(tokenAddress, to);
        console.log('Allowance:', allowanceToken);

        // Approve
        if(parseFloat(allowanceToken) < parseFloat(amount)){
            console.log('Approving Token...');
            const approveToken = await this.approve(tokenAddress, to, overloads);
            console.log('Approve Token:', approveToken);
            if(!approveToken) {

                throw new Error(`Approval failed! :::: ${approveToken}`);
            }

            return approveToken;
        }

        // Contract
        const contract = new ethers.Contract(tokenAddress, ERC20ABI, this.wallet);
        const decimals = await contract.decimals();
        const amountInUnits = ethers.parseUnits(amount, decimals);

        // Transfer
        const tx = await contract.transfer(to, amountInUnits, overloads);
        const txReceipt = await tx.wait();

        if(txReceipt.status === 1){
            console.log('Transaction Successful!');
            return txReceipt;
        }
        throw new Error('Transaction failed!');

    } catch (error) {
        console.log('Error transferring token', error);
        return null;
    }
    }
}

export const erc20Wrapper = new ERC20Wrapper();
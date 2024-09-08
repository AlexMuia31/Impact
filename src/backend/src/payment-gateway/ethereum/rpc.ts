import {ethers} from 'ethers';
import {config} from '../../config';

class RPCManager {

    private readonly mainnetRPCs: string[];
    private readonly testnetRPCs: string[];
    private _provider : ethers.JsonRpcProvider | null | undefined;

    constructor (){
        this.mainnetRPCs = config.BSC_MAINNET_RPC;
        this.testnetRPCs = config.BSC_TESTNET_RPC;
    }

    get provider(){
        if(!this._provider){
            throw new Error('Provider not initialized');
        }
        return this._provider;
    } 

    private checkProvider(url:string):Promise<boolean>{
        try {
            const resp = new ethers.JsonRpcProvider(url);
            if(!resp){
            return Promise.resolve(false);
            }
            return Promise.resolve(true);
            
        } catch (error:any) {
            console.log('Error checking provider', error);
            return Promise.resolve(false);
            
        }
       
    }

    public async getProvider(isTestnet:boolean,maxRetries = 3):Promise<string | null>{
    const rpcs = isTestnet ? this.testnetRPCs : this.mainnetRPCs;
       for (let i = 0; i < maxRetries; i++) {
        const randomIndex = Math.floor(Math.random() * rpcs.length);
        const rpcUrl = rpcs[randomIndex];

           if(await this.checkProvider(rpcUrl)){
            this._provider = new ethers.JsonRpcProvider(rpcUrl);
            // console.log('Provider initialized:', rpcUrl);
               return rpcUrl;
           }
           await new Promise((resolve) => setTimeout(resolve, 1000));
       }
       console.log('No provider available');
         return null;
       
    }

    public async initProvider(){
        try {
            this._provider = new ethers.JsonRpcProvider(this.mainnetRPCs[0]);
            await this.provider.getBlockNumber();
        } catch (error) {
            console.error('Error initializing provider', error);
            this._provider = null;
        }
    }

    async walletWithProvider(wallet: ethers.HDNodeWallet, rpcUrl:string):Promise<any>{
        try {    
            console.log('Wallet:', wallet);        
       
        if(!this._provider){            
        this._provider = new ethers.JsonRpcProvider(rpcUrl);
        }
        console.log('Provider initialized:', rpcUrl);
        const walletAddress = wallet.address;
        const walletPivateKey = wallet.privateKey
        const mnemonic = wallet.mnemonic?.phrase;

        return {walletAddress,walletPivateKey, mnemonic, provider: this._provider};
         } catch (error) {
            console.error('Error initializing wallet with provider', error);
            return error;            
        }
    }
}

export default RPCManager

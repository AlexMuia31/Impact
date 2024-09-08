import { BigNumberish } from 'ethers'

export interface Overloads {
	gasLimit?: number;
	nonce?: number;
	gasPrice?: BigNumberish;
	maxPriorityFeePerGas?: BigNumberish;
	maxFeePerGas?: BigNumberish;
	value?: BigNumberish;
}

export interface IUserMetadata {
	phone_number: string;
	token: string;
	chainId: string;
	is_testnet: boolean;
}
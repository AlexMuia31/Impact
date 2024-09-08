MusaPay is an innovative onramp/offramp platform designed to seamlessly integrate mobile money services, specifically Mpesa, with cryptocurrency transactions, providing users with a streamlined way to move between fiat and digital currencies. MusaPay leverages the widespread use of Mpesa in Kenya and other regions where mobile money is prevalent, making it a highly accessible solution for both crypto enthusiasts and those new to digital assets.

The onramp feature of MusaPay allows users to convert their local currency, deposited via Mpesa, into cryptocurrencies like Bitcoin, Ethereum, or stablecoins. Conversely, the offramp feature enables users to cash out their crypto holdings back into fiat currency, which is then transferred directly to their Mpesa accounts. This ensures liquidity and ease of access to digital currencies, particularly for users in developing markets where traditional banking services are less prevalent.

A crucial component of MusaPay’s infrastructure is its integration with Privado ID, a blockchain-based identity verification solution that employs zero-knowledge proofs. This ensures that users go through stringent KYC (Know file:///home/node/Pictures/Screenshots/Screenshot%20from%202024-09-08%2011-13-15.png
Your Customer) and AML (Anti-Money Laundering) checks, maintaining compliance with regulatory standards while preserving privacy. Privado ID verifies users’ credentials without exposing sensitive data, making the platform secure and compliant with global regulations.

MusaPay is aimed at facilitating the adoption of cryptocurrencies in emerging markets by addressing common challenges such as accessibility, trust, and regulation. By merging Mpesa’s extensive mobile money network with crypto and blockchain-based KYC solutions, MusaPay simplifies the crypto experience for users and opens up new opportunities for financial inclusion.
![Screenshot from 2024-09-08 11-17-36](https://github.com/user-attachments/assets/1caa98de-6956-4454-b87f-94d6a079366c)
![Screenshot from 2024-09-08 11-13-00](https://github.com/user-attachments/assets/44d7b668-c5f7-49f7-be79-f604a6c4655c)
![Screenshot from 2024-09-08 10-03-01](https://github.com/user-attachments/assets/ff97199e-cae7-4c45-8e3e-0eb861df687c)

![Screenshot from 2024-09-08 11-13-35](https://github.com/user-attachments/assets/a221f3e4-2a24-47b0-9931-38083a2f548d)


https://www.loom.com/share/b3c9a471eef34d1fb0f0bf6a3c5aad66


**SAMPLE AON-RAMP OFF-RAMP TRANSACTION**

POST http://off-the-ramp-api.onrender.com/api/v1/stk-push [9/8/2024, 8:35:51 AM]
info
MPESA AUTH:  https://api.safaricom.co.ke/oauth/v1/generate { access_token: 'GKJ7pw19ojML6rNGt9FYAnChcjul', expires_in: '3599' }
info
STK PUSH TX: {
info
  MerchantRequestID: '112b-4cf8-a0a0-4f49aab9f2db8791469',
info
  CheckoutRequestID: 'ws_CO_08092024113554234710224989',
info
  ResponseCode: '0',
info
  ResponseDescription: 'Success. Request accepted for processing',
info
  CustomerMessage: 'Success. Request accepted for processing'
info
}
info
User Exist: {
info
  _id: new ObjectId('66dd615cf1c4fe02a3c73e37'),
info
  phone_number: '254710224989',
info
  eth_address: '0x427d5e72D39D715eC6628Bb1D168095BCBEC6339',
info
  chainIDs: [ '56' ],
info
  created_at: 2024-09-08T08:33:32.336Z,
info
  updated_at: 2024-09-08T08:33:32.336Z,
info
  __v: 0
info
}
info
{
info
  txnParams: {
info
    tx_number: '106934-1725784554528',
info
    recipient: 254710224989,
info
    amount: 1,
info
    fees: 0,
info
    currency: 'KES',
info
    token: 'USDT',
info
    method: 'MPESA',
info
    status: 'PENDING',
info
    type: 'DEPOSIT',
info
    date: 2024-09-08T08:35:54.741Z,
info
    mpesaPhoneNumber: 254710224989,
info
    merchantRequestID: '112b-4cf8-a0a0-4f49aab9f2db8791469',
info
    checkoutRequestID: 'ws_CO_08092024113554234710224989',
info
    mpesaReceiptNumber: '',
info
    narration: 'Deposit from 254710224989 to Account: 254710224989 waiting Completion'
info
  }
info
}
info
User Wallet: {
info
  _id: new ObjectId('66dd615cf1c4fe02a3c73e39'),
info
  user: new ObjectId('66dd615cf1c4fe02a3c73e37'),
info
  addressId: '',
info
  privateKey: '0x664290a56b032843fe6ae1b16e31261048855a0613d6169e076d03f3f4cf8870',
info
  publicKey: '0x427d5e72D39D715eC6628Bb1D168095BCBEC6339',
info
  mnemonic: 'bargain relief advice cycle pulp describe robot coyote caution print bulb venue',
info
  created_at: 2024-09-08T08:33:32.567Z,
info
  updated_at: 2024-09-08T08:33:32.567Z,
info
  __v: 0
info
}
info
CURRENCY METADATA 3547
info
Transaction Created as Pending...: {
info
  tx_number: '106934-1725784554528',
info
  user: new ObjectId('66dd615cf1c4fe02a3c73e37'),
info
  recipient: '254710224989',
info
  amount: 1,
info
  fees: 0,
info
  currency: 'KES',
info
  token: 'USDT',
info
  method: 'MPESA',
info
  status: 'PENDING',
info
  type: 'DEPOSIT',
info
  date: 2024-09-08T08:35:54.741Z,
info
  mpesaPhoneNumber: '254710224989',
info
  merchantRequestID: '112b-4cf8-a0a0-4f49aab9f2db8791469',
info
  checkoutRequestID: 'ws_CO_08092024113554234710224989',
info
  mpesaReceiptNumber: '',
info
  narration: 'Deposit from 254710224989 to Account: 254710224989 waiting Completion',
info
  onramping: 'PENDING',
info
  Offramping: 'PENDING',
info
  conversationId: '',
info
  originatorConversationId: '',
info
  responseDescription: '',
info
  hash: '',
info
  _id: new ObjectId('66dd61ecf1c4fe02a3c73e44'),
info
  created_at: 2024-09-08T08:35:56.183Z,
info
  updated_at: 2024-09-08T08:35:56.183Z,
info
  __v: 0
info
}
info
Current Balance: {
info
  _id: new ObjectId('66dd615cf1c4fe02a3c73e3b'),
info
  user: new ObjectId('66dd615cf1c4fe02a3c73e37'),
info
  tx_number: '',
info
  tx_id: null,
info
  debit: 0,
info
  credit: 0,
info
  balance: 0,
info
  balHistory: [
info
    {
info
      debit: 0,
info
      credit: 0,
info
      balance: 0,
info
      timestamp: 2024-09-08T08:33:32.792Z,
info
      _id: new ObjectId('66dd615cf1c4fe02a3c73e3c')
info
    }
info
  ],
info
  currency: 'KES',
info
  method: 'MPESA',
info
  created_at: 2024-09-08T08:33:32.795Z,
info
  updated_at: 2024-09-08T08:33:32.795Z,
info
  __v: 0
info
}
info
POST http://off-the-ramp-api.onrender.com/api/v1/callback [9/8/2024, 8:36:54 AM]
info
MPESA CALLBACK: {"Body":{"stkCallback":{"MerchantRequestID":"112b-4cf8-a0a0-4f49aab9f2db8791469","CheckoutRequestID":"ws_CO_08092024113554234710224989","ResultCode":1037,"ResultDesc":"DS timeout user cannot be reached"}}}
info
Payment Unsuccessful. CALLBACK MSG: {"Body":{"stkCallback":{"MerchantRequestID":"112b-4cf8-a0a0-4f49aab9f2db8791469","CheckoutRequestID":"ws_CO_08092024113554234710224989","ResultCode":1037,"ResultDesc":"DS timeout user cannot be reached"}}}
info
POST http://off-the-ramp-api.onrender.com/api/v1/offramp-api [9/8/2024, 8:37:23 AM]
info
OffRamp API Request: { Amount: 1, PhoneNumber: '0727641393', Token: 'USDT' }
info
OffRamp API Request: {
info
  Amount: 1,
info
  PhoneNumber: '0727641393',
info
  Token: 'USDT',
info
  _amountToString: '1'
info
}
info
User Found: {
info
  _id: new ObjectId('66a39fdec2f733f31e0ec44d'),
info
  phone_number: '254727641393',
info
  eth_address: '0xA64A3A0875c9D6e34c5222BF2269271a73B1c5d6',
info
  chainIDs: [ '97' ],
info
  created_at: 2024-07-26T13:08:46.693Z,
info
  updated_at: 2024-07-26T13:08:46.693Z,
info
  __v: 0
info
} 
info
 User ID new ObjectId('66a39fdec2f733f31e0ec44d')
info
Wallet Found: {
info
  _id: new ObjectId('66a39fdec2f733f31e0ec44f'),
info
  user: new ObjectId('66a39fdec2f733f31e0ec44d'),
info
  addressId: '',
info
  privateKey: '546f252592627d7eba3b2b3b4b6428ee4e2cfbccc89b473b976bb6ffc7788560',
info
  publicKey: '0x6D948834CC2e2a083934381Db23527E089Cc68Ba',
info
  mnemonic: 'lunch rally annual athlete cherry laptop outside toast hill lamp tomato annual',
info
  created_at: 2024-07-26T13:08:46.943Z,
info
  updated_at: 2024-07-26T13:08:46.943Z,
info
  __v: 0
info
}
info
Connected: true
info
CURRENCY METADATA 3547
info
Token Price: {
info
  id: 825,
info
  symbol: 'USDT',
info
  name: 'Tether USDt',
info
  amount: 1,
info
  last_updated: '2024-09-08T08:35:00.000Z',
info
  quote: {
info
    USD: {
info
      price: 0.9998094336163516,
info
      last_updated: '2024-09-08T08:35:00.000Z'
info
    }
info
  }
info
}
info
{
info
  tokenAmountKES: 128.87716566348496,
info
  tokenAmountUsd: 0.9998094336163516
info
}
info
Transferring to Treasury Wallet
info
Token Balance: 12.0
info
Allowance: 115792089237316195423570985008687907853269984665640564039457.584007913129639935
info
Transaction Successful!
info
Transfer Receipt: ContractTransactionReceipt {
info
  provider: JsonRpcProvider {},
info
  to: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
info
  from: '0x6D948834CC2e2a083934381Db23527E089Cc68Ba',
info
  contractAddress: null,
info
  hash: '0xd120cee35cca352129aaa5f16a3ccca16530ba4662f20109dc68badc55c81c10',
info
  index: 0,
info
  blockHash: '0xfb88f7fa9b27f7080abd715cb3df0b7b9d641c1d519ef02c5a85c26baa9b5df7',
info
  blockNumber: 43688013,
info
  logsBloom: '0x00000000000001010000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000020000000000000000000000000000000000000000000000000000000000001000000000000000000000000000010020000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000002000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000',
info
  gasUsed: 34662n,
info
  blobGasUsed: null,
info
  cumulativeGasUsed: 34662n,
info
  gasPrice: 200000000000n,
info
  blobGasPrice: null,
info
  type: 0,
info
  status: 1,
info
  root: undefined
info
}
info
Transfer Hash: [object Object]
info
Transaction History Saved: {
info
  tx_number: '104742-1725784649991',
info
  user: new ObjectId('66a39fdec2f733f31e0ec44d'),
info
  recipient: '0x88f852D7DB6fd080c4fA257F755A517e9db0d124',
info
  amount: 1,
info
  fees: 0,
info
  currency: 'USDT',
info
  token: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
info
  method: 'WALLET',
info
  status: 'PENDING',
info
  type: 'WITHDRAW',
info
  date: 2024-09-08T08:37:29.991Z,
info
  mpesaPhoneNumber: '0727641393',
info
  merchantRequestID: '',
info
  checkoutRequestID: '',
info
  mpesaReceiptNumber: '',
info
  chainId: '97',
info
  narration: 'Withdrawal from 0x6D948834CC2e2a083934381Db23527E089Cc68Ba to Treasury Wallet: 0x88f852D7DB6fd080c4fA257F755A517e9db0d124 waiting Completion or Failed at: Sun Sep 08 2024 08:37:29 GMT+0000 (Coordinated Universal Time)',
info
  onramping: 'PENDING',
info
  Offramping: 'PENDING',
info
  conversationId: '',
info
  originatorConversationId: '',
info
  responseDescription: '',
info
  hash: '[object Object]',
info
  _id: new ObjectId('66dd6249f1c4fe02a3c73e4d'),
info
  created_at: 2024-09-08T08:37:29.993Z,
info
  updated_at: 2024-09-08T08:37:29.993Z,
info
  __v: 0
info
}
info
New Balance Saved: {
info
  user: new ObjectId('66a39fdec2f733f31e0ec44d'),
info
  tx_number: '104742-1725784649991',
info
  tx_id: new ObjectId('66dd6249f1c4fe02a3c73e4d'),
info
  debit: 0,
info
  credit: 1,
info
  balance: 140.87716566348496,
info
  balHistory: [ { _id: new ObjectId('66dd624af1c4fe02a3c73e50') } ],
info
  currency: 'USDT',
info
  method: 'WALLET',
info
  id: new ObjectId('66dd6249f1c4fe02a3c73e4d'),
info
  _id: new ObjectId('66dd624af1c4fe02a3c73e4f'),
info
  created_at: 2024-09-08T08:37:30.229Z,
info
  updated_at: 2024-09-08T08:37:30.229Z,
info
  __v: 0
info
}
info
Updated Transaction: {
info
  _id: new ObjectId('66dd6249f1c4fe02a3c73e4d'),
info
  tx_number: '104742-1725784649991',
info
  user: new ObjectId('66a39fdec2f733f31e0ec44d'),
info
  recipient: '0x88f852D7DB6fd080c4fA257F755A517e9db0d124',
info
  amount: 1,
info
  fees: 0,
info
  currency: 'USDT',
info
  token: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
info
  method: 'WALLET',
info
  status: 'COMPLETED',
info
  type: 'WITHDRAW',
info
  date: 2024-09-08T08:37:29.991Z,
info
  mpesaPhoneNumber: '0727641393',
info
  merchantRequestID: '',
info
  checkoutRequestID: '',
info
  mpesaReceiptNumber: '',
info
  chainId: '97',
info
  narration: 'Withdrawal from 0x6D948834CC2e2a083934381Db23527E089Cc68Ba to Treasury Wallet: 0x88f852D7DB6fd080c4fA257F755A517e9db0d124 updated status to COMPLETED at: Sun Sep 08 2024 08:37:30 GMT+0000 (Coordinated Universal Time)',
info
  onramping: 'PENDING',
info
  Offramping: 'PENDING',
info
  conversationId: '',
info
  originatorConversationId: '',
info
  responseDescription: '',
info
  hash: '[object Object]',
info
  created_at: 2024-09-08T08:37:29.993Z,
info
  updated_at: 2024-09-08T08:37:30.448Z,
info
  __v: 0
info
}
info
User Balance: {
info
  user: {
info
    _id: new ObjectId('66a60fe32153c414212f17f7'),
info
    phone_number: '0727641393',
info
    eth_address: '0xDf01BB557F2d6be3F7b8840558c1D7475F5C4C00',
info
    chainIDs: [ '97' ],
info
    created_at: 2024-07-28T09:31:15.019Z,
info
    updated_at: 2024-07-28T09:31:15.019Z,
info
    __v: 0
info
  },
info
  tx_number: '',
info
  tx_id: null,
info
  debit: 0,
info
  credit: 0,
info
  balance: 0,
info
  balHistory: [],
info
  currency: 'KES',
info
  method: 'MPESA',
info
  id: new ObjectId('66a60fe32153c414212f17f7'),
info
  _id: new ObjectId('66dd624bf1c4fe02a3c73e55'),
info
  created_at: 2024-09-08T08:37:31.106Z,
info
  updated_at: 2024-09-08T08:37:31.106Z,
info
  __v: 0
info
}
info
UPDATED BALANCE: {
info
  message: 'User has no balance',
info
  balance: {
info
    user: {
info
      _id: new ObjectId('66a60fe32153c414212f17f7'),
info
      phone_number: '0727641393',
info
      eth_address: '0xDf01BB557F2d6be3F7b8840558c1D7475F5C4C00',
info
      chainIDs: [Array],
info
      created_at: 2024-07-28T09:31:15.019Z,
info
      updated_at: 2024-07-28T09:31:15.019Z,
info
      __v: 0
info
    },
info
    tx_number: '',
info
    tx_id: null,
info
    debit: 0,
info
    credit: 0,
info
    balance: 0,
info
    balHistory: [],
info
    currency: 'KES',
info
    method: 'MPESA',
info
    id: new ObjectId('66a60fe32153c414212f17f7'),
info
    _id: new ObjectId('66dd624bf1c4fe02a3c73e55'),
info
    created_at: 2024-09-08T08:37:31.106Z,
info
    updated_at: 2024-09-08T08:37:31.106Z,
info
    __v: 0
info
  }
info
}
info
*********
info
info
Crypto OffRamp Process Completed to Treasury Wallet. Waiting for MPESA OffRamp Transfer to User
info
info
*********
info
Successful OFFRAMPED TO MUSA CRYPTO Wallet: {
info
  transferData: ContractTransactionReceipt {
info
    provider: JsonRpcProvider {},
info
    to: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
info
    from: '0x6D948834CC2e2a083934381Db23527E089Cc68Ba',
info
    contractAddress: null,
info
    hash: '0xd120cee35cca352129aaa5f16a3ccca16530ba4662f20109dc68badc55c81c10',
info
    index: 0,
info
    blockHash: '0xfb88f7fa9b27f7080abd715cb3df0b7b9d641c1d519ef02c5a85c26baa9b5df7',
info
    blockNumber: 43688013,
info
    logsBloom: '0x00000000000001010000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000020000000000000000000000000000000000000000000000000000000000001000000000000000000000000000010020000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000002000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000',
info
    gasUsed: 34662n,
info
    blobGasUsed: null,
info
    cumulativeGasUsed: 34662n,
info
    gasPrice: 200000000000n,
info
    blobGasPrice: null,
info
    type: 0,
info
    status: 1,
info
    root: undefined
info
  },
info
  updatedBal: {
info
    message: 'User has no balance',
info
    balance: {
info
      user: [Object],
info
      tx_number: '',
info
      tx_id: null,
info
      debit: 0,
info
      credit: 0,
info
      balance: 0,
info
      balHistory: [],
info
      currency: 'KES',
info
      method: 'MPESA',
info
      id: new ObjectId('66a60fe32153c414212f17f7'),
info
      _id: new ObjectId('66dd624bf1c4fe02a3c73e55'),
info
      created_at: 2024-09-08T08:37:31.106Z,
info
      updated_at: 2024-09-08T08:37:31.106Z,
info
      __v: 0
info
    }
info
  },
info
  updatedTxn: {
info
    _id: new ObjectId('66dd6249f1c4fe02a3c73e4d'),
info
    tx_number: '104742-1725784649991',
info
    user: new ObjectId('66a39fdec2f733f31e0ec44d'),
info
    recipient: '0x88f852D7DB6fd080c4fA257F755A517e9db0d124',
info
    amount: 1,
info
    fees: 0,
info
    currency: 'USDT',
info
    token: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
info
    method: 'WALLET',
info
    status: 'COMPLETED',
info
    type: 'WITHDRAW',
info
    date: 2024-09-08T08:37:29.991Z,
info
    mpesaPhoneNumber: '0727641393',
info
    merchantRequestID: '',
info
    checkoutRequestID: '',
info
    mpesaReceiptNumber: '',
info
    chainId: '97',
info
    narration: 'Withdrawal from 0x6D948834CC2e2a083934381Db23527E089Cc68Ba to Treasury Wallet: 0x88f852D7DB6fd080c4fA257F755A517e9db0d124 updated status to COMPLETED at: Sun Sep 08 2024 08:37:30 GMT+0000 (Coordinated Universal Time)',
info
    onramping: 'PENDING',
info
    Offramping: 'PENDING',
info
    conversationId: '',
info
    originatorConversationId: '',
info
    responseDescription: '',
info
    hash: '[object Object]',
info
    created_at: 2024-09-08T08:37:29.993Z,
info
    updated_at: 2024-09-08T08:37:30.448Z,
info
    __v: 0
info
  }
info
}

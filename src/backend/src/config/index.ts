import "dotenv/config";

export const config = {
  APP: {
    IS_TESTNET:process.env.IS_TESTNET || true,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    ONRAMPCRON_TIME: process.env.ONRAMPCRON || 5, // 5 minutes
    OFFRAMPCRON_TIME: process.env.OFFRAMPCRON || 3, // 3 minutes
  },
  MPESA:{
    KEY: process.env.CONSUMER_KEY,
    SECRET: process.env.CONSUMER_SECRET,
    AUTH2TOKEN_URL: process.env.AUTH2TOKEN_URL,
    STK_PUSH_URL: process.env.STK_PUSH_URL,
    B2C_URL: process.env.B2C_URL,
    CALLBACK_URL: process.env.CALLBACK_URL,
    BUSINESS_SHORTCODE: process.env.BUSINESS_SHORTCODE,
    SHORTCODE: process.env.SHORTCODE,
    PASSKEY: process.env.PASSKEY,
    QUEUE_TIMEOUT_URL: process.env.QUEUE_TIMEOUT_URL,
    RESULT_URL: process.env.RESULT_URL,
    TXN_STATUS_URL: process.env.TXN_STATUS_URL,
    B2C_PASSWORD: process.env.B2C_PASSWORD,
  },
  TREASURY_WALLET: {
    PRIVATE_KEY: process.env.TREASURY_PRIVATE_KEY,
    PUBLIC_KEY: process.env.TREASURY_PUBLIC_KEY,
    FEE_PERCENTAGE: process.env.FEE_PERCENTAGE,
  },
  UTILS:{
    CMC_KEY: process.env.CMC_API_KEY,
    CURRENCY_IDS:{
      USD:2781,
      KES:3547
    },


    TOKEN_IDS:[1027,1,825,3408,2,1839] // ETH, BTC, USDT, USDC,LTC BNB

    },


  BSC_MAINNET_RPC:[
  'https://bsc-dataseed.bnbchain.org',
  'https://bsc-dataseed.nariox.org',
  'https://bsc-dataseed.defibit.io',
  'https://bsc-dataseed.ninicoin.io',
  'https://bsc.nodereal.io',
  'https://bsc-dataseed-public.bnbchain.org',
  ],

  // "https://eth-mainnet.g.alchemy.com/v2/C2XvP6n2YBz7EuFyTWqOZicmokGHVMYC",
  BSC_TESTNET_RPC:[
  'https://bsc-testnet-dataseed.bnbchain.org',
  'https://bsc-testnet.bnbchain.org',
  'https://bsc-prebsc-dataseed.bnbchain.org',
  ],

  // POLYGON RPC
  POLYGON_AMOY_RPC:["https://polygon-amoy.g.alchemy.com/v2/ptMJ12-cPYKBpbpYYUNkeO2M2_AeQ1ho"],
  POLYGON_MAINNET_RPC:["https://polygon-mainnet.g.alchemy.com/v2/ptMJ12-cPYKBpbpYYUNkeO2M2_AeQ1ho"],

  BSC_SUPPORTED_TOKENS: [
    // TESTNET
    {
    symbol: 'ETH',
    address: "0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378"
    },
    {
    symbol: 'USDT',
    address: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684',
    },

    // MAINNET
  // {
  //   symbol: 'USDT',
  //   address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  // },
  // {
  //   symbol: 'ETH',
  //   address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  // },
  // {
  //   symbol: 'USDC',
  //   address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  // },
]
};

// ERC20 ABI
export const ERC20ABI = [
    {
    "constant": true,
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "internalType": "address", "name": "recipient", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },

  ]

  const ApproveABI =[
    "function approve(address _spender, uint256 _value) public returns (bool success)",
  ]

const supportedChains = [
   {
      name: "Polygon Mumbai Testnet",
      short_name: "polygon",
      chain: "polygon",
      network: "mumbai",
      chain_id: 80001,
      network_id: 80001,
      rpc_url: "https://polygon-mumbai.g.alchemy.com/v2/%API_KEY%",
      native_currency: {
         symbol: "MATIC",
         name: "MATIC",
         decimals: "18",
         contractAddress: "",
         balance: "",
      },
   },
];

export default supportedChains;

import supportedChains from "./chain";
const API_KEY = "I6rDHJ9Varbq7DQLJh8xyBAloSPEPDrZ";

export function getChainData(chainId) {
  if (!chainId) {
    return {
      name: "Error",
    };
  }
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    return {
      name: "Error",
    };
  }

  if (chainData.rpc_url.includes("%API_KEY%") && API_KEY) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export function ellipseAddress(address = "", width = 6) {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}....${address.slice(-width)}`;
}

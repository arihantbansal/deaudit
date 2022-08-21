export function ellipseAddress(address = "", width = 6) {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}....${address.slice(-width)}`;
}

export function pascalCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export const config = "http://localhost:3001";

export const CONTRACT_ADDRESS = "0x9a5f98773A4FeF66161F3e41e337aF9A233e8598";

export const currency = "MATIC";

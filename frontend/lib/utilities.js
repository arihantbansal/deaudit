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

export const CONTRACT_ADDRESS = "0x10Cc4C8D3E0D36DB74c3a408b9F780Fd3a6805eB";

export const currency = "MATIC";

export const conversion = 1e18;

export function ellipseAddress(address = "", width = 6) {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}....${address.slice(-width)}`;
}

export function pascalCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export const config = "http://localhost:3001";

export const CONTRACT_ADDRESS = "0xA6f2DdBd8478801D59c61fc67666A80473dEAbBc";

export const currency = "MATIC";

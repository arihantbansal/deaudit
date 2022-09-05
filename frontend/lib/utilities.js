export function ellipseAddress(address = "", width = 4) {
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

export const config = "https://deaudit.up.railway.app";

export const CONTRACT_ADDRESS = "0x267bCA927A7DF6C5870D366aF324b31A64319e80";

export const currency = "MATIC";

export const conversion = 1e18;

export const questionMark =
  "https://images.pexels.com/photos/5428826/pexels-photo-5428826.jpeg";

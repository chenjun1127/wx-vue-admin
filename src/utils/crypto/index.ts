const CryptoJS = require("crypto-js");

const CryptoSecret = '__CRYPTO_SECRET__';
export const enCrypto = (data: any) => {
  const str = JSON.stringify(data);
  return CryptoJS.AES.encrypt(str, CryptoSecret).toString();
};
export const deCrypto = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, CryptoSecret);
  const str = bytes.toString(CryptoJS.enc.Utf8);
  if (str) return JSON.parse(str);
  return null;
};

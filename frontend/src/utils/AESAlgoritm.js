import cryptoJs from "crypto-js";

const iv = cryptoJs.enc.Base64.parse("#base64IV#");

export function encryptAES(message, key) {
  return cryptoJs.AES.encrypt(message, key, { iv: iv }).toString();
}

export function decryptAES(message, key) {
  console.log(message);
  console.log(key);
  let resp = cryptoJs.AES.decrypt(message, key, { iv: iv }).toString(
    cryptoJs.enc.Utf8
  );
  console.log(resp);
  return resp;
}

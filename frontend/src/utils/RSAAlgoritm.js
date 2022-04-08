import { JSEncrypt } from "jsencrypt";

// export const publicKey = `
// -----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuYCZUFjrUtvEtwYczoE7
// mZ4tPCil5uB/qXfWfKb4CGSAroMlAUA7Ilak0j3D4eWrRD203jw0jqdDOEpjedkF
// pHn45r11rURu71DJ95yJndxzHNZ+ItLwrP6E6JANVIdea8P3XPuwUQAStLLY/bYL
// UGqvuqVGFB5/mPvjZjL0XUwWCZH63GwidyvmsLlRZba1GEq+uZ3EUnePH2Kmxxep
// /D7lbiae2HcCc581eLV2oZC/jBk7O7e7uhcLSfBgb0aV/BJPoTsHhZixhIeiNFC5
// O8XYxpkk6XY6L3MPaPp7gAyH02jfbrABGb3yXchvyzSrKQAvAD5GXuJSEmaKDdz7
// 6QIDAQAB
// -----END PUBLIC KEY-----`;

// const privateKey = `
// -----BEGIN ENCRYPTED PRIVATE KEY-----
// MIIFJTBPBgkqhkiG9w0BBQ0wQjAhBgkrBgEEAdpHBAswFAQIYx9FTEp+z9QCAkAA
// AgEIAgEBMB0GCWCGSAFlAwQBAgQQmy4mZ3oDM478vRFIalUcuQSCBNBf/CDP9D8e
// CfQRHMxmiv6/+icmVqfrtoS+N0aLREVksthrH/DUyrCQ2dK0n7KXuzh7bnjS+FSo
// GSGcZuOQPtx/vJn/F692hPa591xQv0a/p7JcgeV7aryUPegJv0NWzPNHOZkOJGyK
// ACXsA+hnCWihtX+mM/Y9lgB/tViSmfpnQonszWnjxV5s3NbjDG6vRsL2LbfKNC9S
// gvZoj+CoFXomuMfZ6KnA7kAJfC6Mx0AWYA46Uo/7SYS7ZGLy8Mn0Icw8hg+0PPAv
// 5b32SXcsa2PUW93FVSZmLwlUt5MHgvj7TV8EGX6T7n2MxqBJJ8hNN5kh8nJ8Orn2
// +YLh099iBnKur8I7a5PbY1AHJeOm1YNfB3HuM5KKtd5zisP3P516UeerdXbb2zgp
// zZ3IE0BlkWC3ISZ+Kw5/jj/MI7SeswnPuifKdfSUjF/ihdv96k1JkzzFoNNwUiCM
// rhQ78gzIYVdTsqfZ+Gk9ycSWuRGPpFG0wAOq1zmWOya3YVA8zZx0cl+7BAvkEpfw
// EqaJ9Xe2TgnoIlJ5fIEahZ97+SHuPzsvR/+KZptXUj1ZPYbSuoRsnhvE4SdOoIZI
// /3fc9pCtQtCz82rTdafzvJHgDpBrT5lf1XQ8TbMU6QPhKdsYYMRwFGD6D7Wnpx5R
// yI8GexNC40jgAtwMgrKNFloFmbXlXLgQ1+eYKHWeZTiStdXW+gNw7bwf6Lj/uBQG
// +TGzxFK4z7YMs5qH0HQaafclDgECWU6ACiw9izimIuxfsQOOsRkc7rlfc6omEXlj
// QUI9KmZBivbPHePQFHNXSTBZn7SiiW4T+nSzZCjlNISI4C8fO79TBjARdfu4J0ic
// 591HTfgSvfDkbdSCrBIBP0PEjlsMHqWktP4iILC2EPPE6GtVv2ALsmf4BW7YnpLf
// UJ0D+AFCG53hRramDBsubeica4AIsw1AN99rzT38xNk9GpQHj2mPkJleNRIbMktF
// eunKa4NePtxtOVyUyxzNy7SU4wG8HjXnOrVwFK1BbXDKRut3pFoLcHaoybvRnlde
// qNebTFNtbr97+7W4uGrFjP/dxZ4tcMXur5sALNtULrScnIi71fUyBmuJcMn/fuEQ
// lmuqW5c4jRReTLi7cVMvLKWoBJpoHUCNLMBMZi2jSl3UCmcn42J9GxlpFwjjTv8w
// aVSZDVwYafWQFd+E6GC9Lwv8WqfHApJWT8uRFaWR/5rAJ2jt0ogixXMrDtfDwqSG
// jVdxhi4pnPdaBcn3Y2mB3BAqLI279+TNxknzUsK5RAWZN2m/FAhuffrh1fTa8+xc
// AMgCm+YDzqnWx4s+kTo0jythp3c3WwtNzo5A/9GWXuHlDbgqwdUXDT9gVmGIIUaV
// LeOkeUJ91pOWGot9phibtq2Sk5O2IHhgQDdbpibbDT8ME0pt3TIvzTfXPV9BABCX
// Keb+6t4c10HG2yZD9++s9R9ZiFsmH2SKG/j/ohZ+JGsd48CX0eTuheS9/wEz9VAM
// 9dEjVYDY6H3hU2VPWUeX+9NVZ9VJnajkxoFL4k3rj0DVE4+2Quwz0fRMg9dGrY92
// 7zJJldnE0Re2bkgOGaRnJTxTpPIM/6PrNs1M2/j4QrxCIqI6Z63w7F+qKMDapS0f
// R2JklBF2U6EoghThvhcT9nWDTp6wiq7Isw==
// -----END ENCRYPTED PRIVATE KEY-----`;

export const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB
-----END PUBLIC KEY-----`;

// Copied from https://github.com/travist/jsencrypt
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
-----END RSA PRIVATE KEY-----`;

// Assign our encryptor to utilize the public key.
export function encryptRSA(plainText) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  let encrypted = encrypt.encrypt(plainText);
  return encrypted;
}

export function decryptRSA(encrypted) {
  let utf8Encode = new TextEncoder();
  // utf8Encode.encode("abc")
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(utf8Encode.encode(privateKey));
  let uncrypted = decrypt.decrypt(encrypted);
  return uncrypted;
}

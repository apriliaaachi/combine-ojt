const CryptoJS = require("crypto-js");

function decrypt(iv, secret, ciphertext) {
  return new Promise((resolve, reject) => {
    if (iv === undefined || secret === undefined || ciphertext === undefined) {
      reject("iv, secret, and ciphertext must be included.");
    } else if (iv.length !== 16 || secret.length !== 32) {
      reject("iv length must be 16 character, and secret length must be 32 character.");
    } else {
      const output = CryptoJS.AES.decrypt(
        CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
          formatter: CryptoJS.format.OpenSSL,
        }),
        CryptoJS.enc.Utf8.parse(secret),
        { iv: CryptoJS.enc.Utf8.parse(iv) }
      );
      const plaintext = output.toString(CryptoJS.enc.Utf8);
      if (plaintext === "") {
        reject("input length must be multiple of 16 when decrypting with padded cipher.");
      } else {
        resolve(plaintext);
      }
    }
  });
}

module.exports = decrypt;

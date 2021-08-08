const CryptoJS = require("crypto-js");

function decrypt(iv, secret, ciphertext) {
    const output = CryptoJS.AES.decrypt(
        CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
            formatter: CryptoJS.format.OpenSSL,
        }),
        CryptoJS.enc.Utf8.parse(secret), { iv: CryptoJS.enc.Utf8.parse(iv) }
    );
    const plaintext = output.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

module.exports = {
    decrypt
}
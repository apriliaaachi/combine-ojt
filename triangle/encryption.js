const crypto = require("crypto")

function encrypt(password) {
    var iv = crypto.randomBytes(10).toString('base64')
    var key = crypto.randomBytes(22).toString('base64')

    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    var encrypted = cipher.update(password, 'utf8', 'base64')
    encrypted += cipher.final('base64')

    return encrypted
}

module.exports = {
    encrypt
}
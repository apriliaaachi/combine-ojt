var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var encryption = require('./service/encryption')
var decryption = require('./service/decryption')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

/* AES 256 CBC */
router.get('/', function(req, res) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip = ipInfo.clientIp

    var encrypted = encryption.encrypt(req.query.password)
    var decrypted = decryption.decrypt(encrypted.iv, encrypted.key, encrypted.encrypted)

    dataRes = {
        'enc-dec': decrypted
    }
    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router
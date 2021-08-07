var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var encryption = require('./encryption')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

/* Specify type of triangle */
router.post('/', function(req, res) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip = ipInfo.clientIp

    /* Change Data */
    var data = {

    }

    //test your function here
    var encrypted = encryption.encrypt('apriliaaachi25')

    console.log('encrypted: ' + encrypted)
})

module.exports = router
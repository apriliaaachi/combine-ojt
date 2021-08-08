var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var primenumbers = require('./service/prime-number')
var parsingNumber = require('./service/parsing')
var triangleType = require('./service/triangle-type')

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

    /* Regex */
    var regexfornum = new RegExp('^[0-9]+$') //untuk mengecek angka
    var regexforalpa = new RegExp('^[a-zA-z\\s]+$')
    var regexZero = new RegExp('^[0]+$') //untuk mengecek hanya "0" 

    /* Array Data */
    var primeNum = []
    var sideArray = []
    var numbers = []
    var numbersInText = []

    /* Catch Flag */
    var invalid = 0

    /* Change Data */
    var dataReq = {
        sisi1: req.body.sisi1,
        sisi2: req.body.sisi2,
        sisi3: req.body.sisi3
    }

    var newData = Object.values(dataReq)
    for (var i = 0; i < newData.length; i++) {
        var newInput = newData[i].trim()
        console.log("tes " + newInput)

        if (regexfornum.test(newInput) == true && regexZero.test(newInput) == false && newInput.indexOf(0) != '0') {
            numbers.push(newInput)
            numbersInText.push(parsingNumber.NumberToText(newInput))
        } else if (regexforalpa.test(newInput) == true) {
            numbersInText.push(newInput)
            arrKata = newInput.split(' ')
            newInput = parsingNumber.TextToNumber(arrKata)
            numbers.push(newInput)

            if (parsingNumber.isTypo(arrKata) == true) {
                invalid += 1
            }
        } else {
            invalid += 1;
        }

        primeNum.push(primenumbers.test_prime(newInput))
        sideArray.push(newInput)
    }

    if (invalid > 0) {
        var dataRes = {
            'rsp': "997",
            'rspdesc': "Invalid Format"
        }
    } else {
        var dataRes = {
            'rsp': "000",
            'rspdesc': "Success",
            'triangle': {
                'type': triangleType.specifyTriangleType(sideArray),
                'parsing-numbers': {
                    'sisi1': numbers[0] + ' (' + numbersInText[0] + ')',
                    'sisi2': numbers[1] + ' (' + numbersInText[1] + ')',
                    'sisi3': numbers[2] + ' (' + numbersInText[2] + ')'
                },
                'prime-numbers': {
                    'sisi1': primeNum[0],
                    'sisi2': primeNum[1],
                    'sisi3': primeNum[2]
                }
            }
        }
    }

    res.send(dataRes)
})

module.exports = router
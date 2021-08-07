const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const conf = require('./triangle/config.json')

/* router */
const triangle = require('./triangle/app')

/* body parser */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

/* use function */
router.use('/triangle', triangle)

console.log('The Gateway on port:' + conf.port);
router.listen(conf.port, '0.0.0.0');
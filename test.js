'use strict';
require('dotenv').config();
const crypto = require('crypto');
console.log(process.env.Pwd);

let s = encryptData(process.env.Pwd, process.env.Secret);
console.log(s);
let o = decryptData(s, process.env.Secret);
console.log(o);

function encryptData(data, secretKey) {
    var mykey = crypto.createCipher('aes-128-cbc', secretKey);
    var mystr = mykey.update(JSON.stringify(data), 'utf8', 'hex');
    mystr += mykey.final('hex');
    return mystr;
}

function decryptData(data, secretKey) {
    var mykey = crypto.createDecipher('aes-128-cbc', secretKey);
    var mystr = mykey.update(data, 'hex', 'utf8');
    mystr += mykey.final('utf8');
    mystr = JSON.parse(mystr);
    return mystr;
}
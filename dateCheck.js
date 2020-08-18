const date = require('date-and-time');

let d = '20150605';
let t = '12:59'
console.log(date.isValid(d, 'YYYYMMDD'))
let s = date.format(date.parse(d, 'YYYYMMDD'), 'YYYY-MM-DD') + 'T' + date.format(date.parse(t, 'HH:mm'), 'HH:mm:ss');

let a=null;
let b;
let c = (a + ' ' + b).trim();
console.log(c);
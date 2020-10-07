const date = require('date-and-time');
let f = '11:11:11 AM';
f=f.replace('AM','').replace('PM','').replace('am','').replace('pm','').trim();
console.log(f);
let t = date.parse(f, 'hh:mm:ss');
console.log(t)
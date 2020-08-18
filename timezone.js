let moment = require('moment-timezone');
const date = require('date-and-time');
let d = '2019-03-03 21:00:39';
let z = (parseInt(moment().tz("Asia/Kolkata").format("ZZ")) - parseInt(moment().tz("UTC").format("ZZ"))) / 100;
console.log(z);

//var diff = (parseInt(moment().tz("America/New_York").format("ZZ")) - parseInt(moment().tz("America/Chicago").format("ZZ")));
// let dateInUTC = new Date(d);
// let dateStringInFiletimeZone = moment.tz(dateInUTC, 'Europe/Amsterdam').format('YYYY-MM-DD HH:mm:ss');
// let dateInFiletimeZone = new Date(dateStringInFiletimeZone);
// let dateTimeDiff = dateInFiletimeZone - dateInUTC;
// console.log(dateInUTC);
// console.log(dateInFiletimeZone);
// console.log(dateTimeDiff);

// let fileDateString= dateInUTC - dateTimeDiff;
// let fileDate= new Date(fileDateString);
// console.log(fileDate);

// let adjustedDate = moment.tz(transactionDate, 'Europe/Amsterdam').format('YYYY-MM-DD HH:mm:ss');

// let transdate=new Date(adjustedDate);
// console.log(transdate);


// console.log(adjustedDate);

// let adjustedDate1 = moment.tz(transactionDate, 'Asia/Shanghai').format('YYYYMMDD HH:mm:ss');


// console.log(adjustedDate1);


const { Parser } = require('json2csv');
let csv = '';
let lookup = []
let source = [{
    '1': 'SUP ',
    '2': 'NET ',
    '3': 'SUB',
    '4': 'NETWORK NAME                  ',
    '5': ' MLN ',
    '6': 'AGENT    ',
    '7': 'AGENT                         ',
    '8': 'TXN',
    '9': 'MTCN      ',
    '10': 'DATE      ',
    '11': 'TIME ',
    '12': 'PRINCIPAL    ',
    '13': 'TOTAL CHARGES',
    '14': 'TOTAL TAXES  ',
    '15': 'GROSS        ',
    '16': 'PAY ',
    '17': 'SENDER/PAYER                                                     '
},
{
    '1': 'NET ',
    '2': 'ID  ',
    '3': 'NET',
    '4': '                              ',
    '5': 'STORE',
    '6': ' ID      ',
    '7': 'NAME                          ',
    '8': 'TYP',
    '9': '          ',
    '10': '          ',
    '11': '     ',
    '12': 'AMOUNT       ',
    '13': 'AMOUNT       ',
    '14': 'AMOUNT       ',
    '15': 'AMOUNT       ',
    '16': 'METH',
    '17': 'NAME                                                             '
}];


const json2csvParser = new Parser({ delimiter: ',', quote: '', header: false });
let csv1 = '';
let csv2 = '';
if ([source[0]].length > 0) {
    csv1 = json2csvParser.parse(source[0]);
    csv2 = json2csvParser.parse(source[1]);
}
csv1array = csv1.split(',');
csv2array = csv2.split(',');
//console.log(csv1);
//console.log(csv2array);
let header = '';
for (let i = 0; i < 17; i++) {
    csv1array[i] = csv1array[i] + csv2array[i];
}
for (let j = 0; j < 17; j++) {
    header = header + csv1array[j] + ','
}

header = header.replace(/\s/g, '');
header = header.toUpperCase();
//console.log(csv1array);
console.log(header);
// let filePath = source.input[type].filePath;
// console.log(`Data:${filePath}`);
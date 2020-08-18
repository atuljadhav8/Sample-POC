const fs = require('fs');
let data = fs.readFileSync("append.json");

let data1 = parse(data);
let sorted = [];
for (let i = 0; i < data1.length; i++)
    sorted[i] = data1[i].swiftMessage;
sorted.sort(GetSortOrder(":25:", ":28:"));
let k = 0;
// console.log('sorted:\n', sorted[k + 1][':25:']);
// if (sorted[k][':25:'] == sorted[k + 1][':25:'])
//     console.log('DDDDDDDDD:');
// else
//     console.log('EEEEEEEEE:');
let corona = [];
let susp = [];
let dup = [];
let lastStatement;
let lastSequence;
corona.push(sorted[0]);
for (let j = 0; j < sorted.length - 1; j++) {
    if (sorted[j][':25:'] == sorted[j + 1][':25:']) {
        if (sorted[j][':28:'] == sorted[j + 1][':28:']) {
            dup.push(sorted[j + 1])
        }
        else {
            lastStatement = sorted[j][':28:'].split(':28:')[1].split('/')[0];
            lastSequence = sorted[j][':28:'].split(':28:')[1].split('/')[1];
            let currentStatement = sorted[j + 1][':28:'].split(':28:')[1].split('/')[0];
            let currentSequence = sorted[j + 1][':28:'].split(':28:')[1].split('/')[1];
            if (((Number(currentStatement) == Number(lastStatement)) && (Number(currentSequence) == Number(lastSequence) + 1)) ||
                ((Number(currentStatement) == Number(lastStatement) + 1) && (Number(currentSequence) == 1)))
                corona.push(sorted[j + 1]);
            else
                susp.push(sorted[j + 1]);
        }
    }
    else {
        corona.push(sorted[j + 1]);
    }
}
console.log('Corona:\n', corona);
console.log('Corona:\n', corona.length);
console.log('Dup:\n', dup);
console.log('Dup:\n', dup.length);
console.log('susp:\n', susp);
console.log('susp:\n', susp.length);
let coronaData = '';
let susData = '';
let dupData = '';
for (let a = 0; a < corona.length; a++) {
    coronaData += prepareBarcData(corona[a]);
}
for (let a = 0; a < susp.length; a++) {
    susData += prepareSusData(susp[a]);
}
for (let a = 0; a < dup.length; a++) {
    dupData += prepareSusData(dup[a]);
}
fs.writeFileSync("Corona.txt", coronaData, 'UTF-8');
fs.writeFileSync("Suspence.txt", susData, 'UTF-8');
fs.writeFileSync("Duplicate.txt", dupData, 'UTF-8');
function parse(msg) {
    try {
        return JSON.parse(msg);
    }
    catch (ex) {
        return msg;
    }
}

function GetSortOrder(prop, prop2) {
    return function (a, b) {
        if (a[prop] > b[prop])
            return 1;
        else if (a[prop] < b[prop])
            return -1;
        else
            if (a[prop2] > b[prop2])
                return 1;
            else if (a[prop2] < b[prop2])
                return -1;
            else
                return 0;
    }
}

function prepareBarcData(record) {
    try {
        var keys = Object.keys(record);

        let bardRecord = ''
        bardRecord += '\u0001{1:F01XXXXXXXXXXXX0000000000}{2:O9400000000000BARCGB22XXXX00000000000000000000N}{3:}{4:\n'
        for (let b = 0; b < keys.length; b++)
            bardRecord += record[keys[b]] + '\n';

        bardRecord += '-}{5:}\u0003\n';
        return bardRecord;
    } catch (ex) {
        throw ex;
    }
}

function prepareSusData(record) {
    try {
        var keys = Object.keys(record);

        let susRecord = ''
        for (let c = 0; c < keys.length; c++)
            susRecord += record[keys[c]] + '\n';

        susRecord += '\n';
        return susRecord;
    } catch (ex) {
        throw ex;
    }
}
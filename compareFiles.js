const fs = require('fs');
var jsdiff = require('diff');
let differences = '';
for (let j = 0; j < 7; j++) {
    var tmpBuf = fs.readFileSync(`C:/GoAML/UAT Testing/AWS_Processing_Result_MrPay/RITsMrPay/RITsMrPay_${j}.xml`);
    var testBuf = fs.readFileSync(`C:/GoAML/UAT Testing/Talend_Processing_Result/RITsMrPay/RITsMrPay_${j}.xml`);
    var diff = jsdiff.diffTrimmedLines(tmpBuf.toString(), testBuf.toString(), { ignoreWhitespace: true });
    differences = differences + `for File number ${j}\n`
    for (let i = 0; i < diff.length; i++) {
        //console.log(diff[i]);
        if ((diff[i].removed || diff[i].added) && !diff[i].value.startsWith('<submission_date>'))
            differences = differences + diff[i].value;
    }
}
fs.writeFileSync("diff.txt", differences, "UTF-8");
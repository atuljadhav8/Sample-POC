const fs = require('fs');
let colArray = ["recordType",
"customerId",
"recordSequenceNumber",
"customerOrderReference",
"version",
"addressType",
"telephoneNumber",
"companyName",
"departmentName",
"addressLine1",
"addressLine2",
"addressLine3",
"city",
"county",
"postalCode",
"country",
"endOfRecordMarker"];

let finalJson = "";
for (let i = 0; i < colArray.length; i++) {
    let s = '\'' + colArray[i] + '\': {\n' +
        'key: \'' + colArray[i] + '?\',\n' +
        'transform: () => {\nreturn null;\n' +
        '}\n' +
        '},\n';
    finalJson = finalJson + s;
}
// for (let i = 0; i < colArray.length; i++) {
//     let s = '"' + colArray[i] + '": "' + colArray[i] + '?",\n';
//     finalJson = finalJson + s;
// }
//console.log(finalJson);
fs.writeFileSync("append.json", finalJson, "UTF-8");

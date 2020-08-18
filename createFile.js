const fs = require('fs');

let data = fs.readFileSync("append.json");

let data1 = parse(data);
let sorted = [];
let content = '';
for (let i = 0; i < data1.length; i++)
    sorted[i] = data1[i].swiftMessage;

for (let j = 0; j < data1.length; j++) {
    content += sorted[j][':20:'] + '\n';
    content += sorted[j][':25:'] + '\n';
    content += sorted[j][':28:'] + '\n';
    content += sorted[j][':60F:'] + '\n';
    content += sorted[j][':62F:'] + '\n';
    content += sorted[j][':64:'] + '\n';
    content += '\n'
}

fs.writeFileSync("content.txt", content, "UTF-8");
function parse(msg) {
    try {
        return JSON.parse(msg);
    }
    catch (ex) {
        return msg;
    }
}
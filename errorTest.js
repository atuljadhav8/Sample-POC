let AWS = require('aws-sdk');
let s3 = new AWS.S3();

async function copyFile(destinationLocation, sourceLocation, fileKey) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('started copying file using tvx-cloud-storage');
            let params = {
                Bucket: destinationLocation,
                CopySource: sourceLocation,
                Key: fileKey
            };
            console.log(`Params used for copy file data ${JSON.stringify(params)}`);
            resolve(await s3.copyObject(params).promise());

        } catch (exception) {
            console.log(exception);
            throw exception;
        }
    });
}

let source = 'tvx-middleware-dev/interfaces/error/middleware/go-aml/go-aml-mr-pay/17.F02065.xlsx';
let destination = 'tvx-middleware-dev/interfaces/output/middleware/go-aml/go-aml-mr-pay/input-file-error';
let fileKey = '17.F02065.xlsx';
async function main() {
    return await copyFile(destination, source, fileKey);
}
let v = main();
console.log(v);


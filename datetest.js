let AWS = require('aws-sdk');
let s3 = new AWS.S3();



async function main(){
    let fileContent = await getFileContent();
    console.log(`fileContent ${fileContent.toString()}`);
    await writeFile();
    //console.log(`fileContentqq ${ss}`);
}

async function getFileContent() {
    try {
        const params = {
            Bucket: 'tvx-middleware-dev',
            Key: 'interfaces/input/utility/proactis-outbound/proactis-outbound-process/proactis-outbound-batch-0002.csv'
        };
        const fileContent = await s3.getObject(params).promise();
       return fileContent.Body;
    } catch (ex) {
        console.log(`Error while getting file content from S3 ${ex}`);
        throw ex;
        //throw utils.generateException(ex, ExceptionType.ERROR_WHILE_UPLOADING_FILE, ExceptionCategory.S3_ERROR, ex.message);
    }
}

async function writeFile() {
    try {
        let params = {
            Body: new Buffer('body12122121212212', 'utf-8'),
            Bucket: 'tvx-middleware-dev',
            Key: 'interfaces/input_test/coda/proactis-outbound/proactis-test5.csv',
        };
        return await s3.putObject(params);

    } catch (exception) {
        logger.error(`Error while writing object : ${exception}`);
        throw new Error(`Error occured while deleting file from original location: ${exception}`);
    }
}
main();
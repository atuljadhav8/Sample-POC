let AWS = require('aws-sdk');
let s3 = new AWS.S3();

async function emptyS3Directory() {
    const listParams = {
        Bucket: `tvx-middleware-sit`,
        Prefix: 'interfaces/output/middleware/treasury-statement/treasury-statement-middleware/Suspense/'
    };

    const listedObjects = await s3.listObjects(listParams).promise();

    //console.log(listedObjects);

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: `tvx-middleware-sit`,
        Delete: { Objects: [] }
    };

    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });
    console.log(deleteParams.Delete);
    await s3.deleteObjects(deleteParams).promise();

    // if (listedObjects.IsTruncated)
    //     await emptyS3Directory();
    // const listParams = {
    //          Bucket: `tvx-middleware-sit`,
    //          Key: 'interfaces/output/middleware/treasury-statement/treasury-statement-middleware/Suspense/'
    //      };
    //     let r = await s3.deleteObjects(listParams).promise();
    //     console.log(r);

}

async function main(){
    await emptyS3Directory();
}

main();
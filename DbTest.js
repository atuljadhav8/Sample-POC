const jp = require('jsonpath');
const sql = require('mssql');
let AWS = require('aws-sdk');
let s3 = new AWS.S3();
// let connectionConfig = {
//     user: 'jadhavA',// Get this from SSM
//     password: 'ASJtcs@8889jan',  // Get this from SSM
//     server: 'localhost', // This will be passed from Interface Config 
//     database: 'CODA' // This will passed from Interface Config 
//   };

//   let pool = new sql.ConnectionPool(connectionConfig);
//   pool.connect();

async function createConnection(userName, password, host, database) {
  // Do Connection Related code here to get Values from SSM and prepare connection Object 
  return new Promise((resolve, reject) => {
    let connectionConfig = {
      user: userName,// Get this from SSM
      password: password,  // Get this from SSM
      server: host, // This will be passed from Interface Config 
      database: database // This will passed from Interface Config 
    };
    resolve(new sql.ConnectionPool(connectionConfig));
  });

}

async function executeQuery() {
  let pool;
  try {
    pool = await createConnection('talend', 'talend', '10.186.42.31', 'CODA');
    await pool.connect();
    const request = pool.request();
    return await request.query(`update itk_pep_obdControl set Extract_DT = GETDATE() where BatchID='0001'`);
  } catch (error) {
    throw error;
  } finally {
    await pool.close();
  }
}

async function upload(bucket, content, fileName, outputPath) {
  try {
    let params = {
      Bucket: bucket,
      Body: content,
      Key: outputPath + '/' + (fileName)
    };
    //logger.debug(`s3.upload : ${JSON.stringify(params)}`);
    return await s3.upload(params).promise();
  } catch (ex) {
    logger.error(`Error uploading file to S3 ${ex}`);
    throw ex;
    //throw utils.generateException(ex, ExceptionType.ERROR_WHILE_UPLOADING_FILE, ExceptionCategory.S3_ERROR, ex.message);
  }
}
async function main() {

  let batchList = await executeQuery();
  //console.log(`len ${JSON.stringify(batchList.recordset.length)}`);
  console.log(`stgCount ${JSON.stringify(batchList)}`);
  // for (let batchCount = 0; batchCount < batchList.recordset.length; batchCount++) {
  //   let fileContent = '';
  //   let fileName = 'proactis-outbound-batch-' + fileContent + batchList.recordset[batchCount].BatchID + '.csv';
  //   let outputPath = 'interfaces/input_test/coda/proactis-outbound';
  //   let bucketName = 'tvx-middleware-dev';
  //   fileContent = fileContent + batchList.recordset[batchCount].BatchID;
  //   if (batchList.recordset[batchCount].IF01 && batchList.recordset[batchCount].IF01 == 1) {
  //     fileContent = fileContent + ',itk_pep_obdSuppliers'
  //   }
  //   if (batchList.recordset[batchCount].IF02 && batchList.recordset[batchCount].IF02 == 1) {
  //     fileContent = fileContent + ',itk_pep_obdCoA'
  //   }
  //   if (batchList.recordset[batchCount].IF03 && batchList.recordset[batchCount].IF03 == 1) {
  //     fileContent = fileContent + ',itk_pep_obdFXRates'
  //   }
  //   if (batchList.recordset[batchCount].IF05 && batchList.recordset[batchCount].IF05 == 1) {
  //     fileContent = fileContent + ',itk_pep_obdPayment'
  //   }
  //   console.log(`fileContent ${batchList.recordset[batchCount]} ${fileContent}`);
  //   try {
  //     //let uploadFile = await upload(bucketName, fileContent, fileName, outputPath);
  //     //console.log('uploadFile: ' , uploadFile);
  //   }
  //   catch (err) {
  //     // Prepare file for each object and upload in other jobs s3 bucket 
  //     console.log('error is', err);
  //     resolve(`{"status":${this.status.FAILED},"message":"File uploading Failed"}`);
  //   }
  // }
}

main();
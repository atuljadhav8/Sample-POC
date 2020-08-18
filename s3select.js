let AWS = require('aws-sdk');
let s3 = new AWS.S3();
let XLSX = require('xlsx');

const params = {
    Bucket: `tvx-middleware-dev`,
    Key: `interfaces/input_test/coda/20.F00034.xlsx`
};

const schemaParams = {
    Bucket: `tvx-middleware-dev`,
    Key: `interfaces/schemas/coda/voyager-payout/voyager-payout-coda/voyager-payout-schema.json`
};
async function calls3() {

    const schema = await s3.getObject(schemaParams).promise();
    //console.log('schema: ', schema.Body.toString());
    let headers = await getDataHeaders(JSON.parse(schema.Body));
    //console.log('headers: ', headers);
    let excelData = await s3.getObject(params).promise();
    console.log('excelData: ', excelData);
    //s3.copyObject()
    let myData = excelData.Body;
    console.log('myData: ', myData);
    let fileData = await getFileData(myData, headers);
    console.log('fileData: ', fileData);
    console.log('Size: ', fileData.length);
}

async function getDataHeaders(fileSchema) {
    let headers = [];
    let schema = fileSchema.body.fields;
    for (let i = 0; i < schema.length; i++) {
        headers.push(schema[i].name);
    }
    return headers;
}


async function getFileData(s3Object, headers) {
    return new Promise(async (resolve, reject) => {

        try {

            let workBookParams = {
                cellDates: true,
                cellNF: false,
                cellText: false
            };
            let jsondata = [];
            let startTime = new Date();
            let workbook = XLSX.read(s3Object, workBookParams); // works
            //let sheet_name_list = excelConfig.workSheetposition ? excelConfig.workSheetposition : workbook.SheetNames;
            //console.log(workbook);
            const sheetData = async () => {
                let sheetName = workbook.SheetNames[0];
                console.log('Reading sheet ', sheetName);
                let worksheet = workbook.Sheets[sheetName];
                //Getting range 
                if (worksheet['!ref'] != undefined) {
                    let range = XLSX.utils.decode_range(worksheet['!ref']);
                    range.s.r = 0;   // set starting row
                    //range.e.r = 0;
                    let sheetToJsonParams = {
                        header: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73],
                        range: range,
                        raw: false,
                        dateNF: 'mm/dd/yyyy',
                        defval: null
                    };
                    let tempData = XLSX.utils.sheet_to_json(worksheet, sheetToJsonParams);
                    jsondata = [...jsondata, ...tempData];
                }
                else {
                    throw Error('Empty sheet found in excel.');
                }

                console.log('File read done');
            };
            await sheetData();
            resolve(jsondata);

        } catch (err) {
            logger.error('Error while getting content ', err.message);

            reject(util.genericException(err, ExceptionType.ERROR_WHILE_READING_FILE, ExceptionCategory.CLOUD_STORAGE_ERROR, err.message));
        }
    });
}

calls3();

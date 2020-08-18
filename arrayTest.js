var hege = [
    {
        "BatchID": "0001",
        "IF01": 1,
        "IF02": 1,
        "Add_DT": "2016-02-24T16:36:25.737Z",
        "Extract_DT": "2016-03-18T14:21:24.047Z"
    },
    {
        "BatchID": "0002",
        "IF01": 1,
        "IF02": 1,
        "Add_DT": "2016-02-24T16:36:25.737Z",
        "Extract_DT": "2016-03-17T15:58:14.617Z"
    },
    {
        "BatchID": "3000",
        "IF01": 1,
        "IF02": 0,
        "Add_DT": "2016-02-24T16:36:25.737Z",
        "Extract_DT": "2016-03-16T13:53:19.390Z"
    }];
//var children = hege.filter(heg => heg.BatchID == '0002' || heg.BatchID == '0003')
// console.log(hege);
// delete hege[1];
// console.log(hege);
// hege = hege.filter(heg => heg != undefined)
// console.log(hege);
console.log(hege.length);
console.log(`array: ${JSON.stringify(hege)}`);
hege.splice(0, 1);
console.log(hege.length);
console.log(`array: ${JSON.stringify(hege)}`);


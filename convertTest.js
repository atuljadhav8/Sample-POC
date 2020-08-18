const { columns } = require("mssql")

let req = {
    flag: true,
    as: 'Atul'
}

if(req.flag == undefined || req.flag)
    console.log("Hello");
else
    console.log("Bye");
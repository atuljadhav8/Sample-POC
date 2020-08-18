'use strict';
var fs = require('fs');
var path = require('path');
var process = require("process");
const SchemaValidator = require('schema-validator');

var schemaDir = "./schema";

//let data = require('./wu-send-voyager-upload-data.json')
let schema = require('./config/schema-config.json');

fs.readdir(schemaDir, function (err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach(function (file, index) {
        // Make one pass and make the file complete
        //console.log("File is ", file);
        var fromPath = path.join(schemaDir, file);
        let filepath='./'+fromPath;
        console.log("Schema is: ", filepath);
        let data = require(filepath);
        let r = SchemaValidator.validateRawSchema(schema, data);
        console.log("Valid: ", r);
    })
})
//console.log("Schema: ", schema);
//let r = SchemaValidator.validateRawSchema(schema, data);

//console.log("Data: ", r);
//console.log("Data: ", data);
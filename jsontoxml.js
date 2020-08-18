const X2JS = require('x2js');
const fs = require('fs');
var format = require('xml-formatter');

let x2js = new X2JS({ escapeMode: false, stripWhitespaces: false });

//let xmlObject = fs.readFileSync("append.json");
let xc = { "report": { "rentity_id": "18000", "submission_code": "E", "report_code": "'S-GRAVENHAGE", "entity_reference": "20151112_4154_2486137", "submission_date": "2020-07-02T07:04:48", "currency_code_local": "EUR", "location": { "address_type": "TRA", "address": "Primera Roermond", "city": "Roermond", "zip": "6041HB", "country_code": "NL" }, "transaction": { "transactionnumber": "20151112_4154_2486137", "transaction_description": "Namelding Dissemination Notifications  23-01-2020 to 29-01-2020; BEGUNSTIGDE:SNS BANK N.V. TE UTRECHT REKNR NL16SNSB0942169115, BETALINGSKENMERK: NL17SNSB0853599076,,,,", "date_transaction": "2015-11-12T14:34:00", "late_deposit": "false", "transmode_code": "KANT", "amount_local": "450", "involved_parties": { "party": [{ "role": "O", "person": { "first_name": "MARIA Y C", "last_name": "EHRENS", "birthdate": "1963-01-14T00:00:00", "addresses": { "address": { "address_type": "PRV", "address": "RIJKSWEG ZUID 78", "city": "ECHT", "zip": "6102XZ", "country_code": "NL" } }, "identification": { "type": "RIJB", "number": "4787041803", "issue_date": "2011-01-05T00:00:00", "issue_country": "NL" } }, "funds_code": "STR", "country": "NL" }, { "role": "RKN", "account": { "institution_code": "SNSB", "account": "NL17SNSB0853599076", "signatory": { "is_primary": "1", "t_person": { "first_name": "MARIA Y C", "last_name": "EHRENS", "birthdate": "1963-01-14T00:00:00" }, "role": "1" }, "funds_code": "STR", "country": "NL" } }] } }, "report_indicators": { "indicator": "Subjectief01" } } }
//console.log(xmlObject.toString());
let csvData = fs.readFileSync("goaml.csv");
let jsonArray = csvData.toString().split('\r\n');
//console.log(JSON.parse(jsonArray[2]));

let xmlBufferData;
xmlBufferData = '<?xml version="1.0" encoding="ISO-8859-15"?>'
//xmlBufferData=xmlBufferData.replace(/\n/g, '')
xmlBufferData += x2js.js2xml(JSON.parse(jsonArray[2]));
xmlBufferData = unescape(xmlBufferData);
var formattedXml = format(xmlBufferData,
    {
        indentation: '  ',
        collapseContent: true,
        lineSeparator: '\n',
        filter: (node) => node.type !== null
    });
//formattedXml = formattedXml.replace(/^\s+$\n/g, '')
let formattedXml1 = unescape(formattedXml);
fs.writeFileSync("xmlcontent.xml", formattedXml1, 'UTF-8');
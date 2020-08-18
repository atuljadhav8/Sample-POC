const fs = require('fs');
let colArray = ["Werkmij",
"Transactienummer",
"Transactieplaats",
"Transactielocatie",
"TransactieZIP",
"Transactiedatum",
"Transactietijd",
"Transactiestadium",
"Indicator",
"Fundscode",
"Valutacode",
"Transactiebedrag",
"Valutacode_2",
"Valutabedrag_2",
"Foreign_exchange_rate",
"Subjecttype",
"Naam_Subject_1",
"Voornamen_Subject_1",
"Adres_Subject_1",
"Huisnummer",
"Huisnummertoevoeging",
"Postcode_Subject_1",
"Plaats_Subject_1",
"Land_Subject_1",
"Geslacht_Subject_1",
"Geboortedatum_Subject_1",
"Geboorteplaats_Subject_1",
"Nationaliteit_Subject_1",
"Soort_id_Subject_1",
"Id_Nummer_Subjec_1",
"Uitgiftedatum_Subject_1",
"Uitgifteplaats_id_Subject_1",
"Situatiebeschrijving",
"Transaction_Type",
"XML_Naam",
"Travelex_transactionnumber_XML",
"Confirmed_or_Rejected_by_FIU"];

let finalJson = "";
for (let i = 0; i < colArray.length; i++) {
    let s = '\n{\n' +
        '"name": "' + colArray[i] + '",\n' +
        '"title": "' + colArray[i] + '",\n' +
        '"constraints": {\n' +
        '"required": true,\n' +
        '"type": "string",\n' +
        '"nullable":true,\n' +
        '"pattern": "",\n' +
        '"minLength": 0,\n' +
        '"maxLength": 0,\n' +
        '"unique": false\n' +
        '}\n},'
    finalJson = finalJson + s;
}
//console.log(finalJson);
fs.writeFileSync("append.json", finalJson, "UTF-8");

let c = {
    "countries": [{
        "country": "NL",
        "localCurrency": "EUR",
        "interface": "ATMTN",
        "scheme": "LinkSinkHol",
        "fileTime": "Europe/Amsterdam",
        "companyCodeTime": "Europe/Amsterdam",
        "schemeTime": "Europe/Amsterdam",
        "cutoffTime": "21:00:00"
    },
    {
        "country": "NL",
        "localCurrency": "EUR",
        "interface": "ATMTN",
        "scheme": "MCSinkHolq",
        "fileTime": "Europe/Amsterdam",
        "companyCodeTime": "Europe/Amsterdam",
        "schemeTime": "Europe/Amsterdam",
        "cutoffTime": "21:00:00"
    },
    {
        "country": "NL",
        "localCurrency": "AUD",
        "interface": "ATMTN",
        "scheme": "MCSinkHol",
        "fileTime": "Europe/Amsterdam",
        "companyCodeTime": "Europe/Amsterdam",
        "schemeTime": "Europe/Amsterdam",
        "cutoffTime": "21:00:00"
    }]
};

let p = {
    "productCodeId": "971",
    "decimalMultiplier": "0.01",
    "currency": "AFN",
    "country": "NL"
}

let countryCurrency = c.countries.find(countries => countries.localCurrency == 'EUR' && countries.scheme == 'MCSinkHolq')
//console.log(p);
p = p && countryCurrency;
//console.log(p);

let f;
f='EUF';
if (!f)
    console.log('Hii');
else
    console.log('Bye');
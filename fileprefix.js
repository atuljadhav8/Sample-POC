

const SEPARATOR = '_';
const WATCH_LIST_FILTER = 'WLF';
const FILE_EXT = 'txt';

function apply(jobConfig) {
        try {
            let fileName = 'TravelLineFrimley20190814000022.txt';
            let filePrefix = ['CDBCUST_UK', 'CDBBENE_UK', 'ROGUESEND_US', 'ROGUEBENE_US', 'RTS1000', 'RTS2000', 'CDD_ME', 'CDD_NAM', 'CDD_ANZ', 'CDD_MY', 'CDD_TH', 'CDD_UK',
                'CIF_UK', 'CIF_ME', 'CIF_NAM', 'CIF_ANZ', 'CIF_MY', 'CIF_TH', 'IT2', 'TravelLineFrimley', 'TravelLineRussSquare', 'TravelNetFrimley', 'TravelNetRussSquare', 'Pluto', 'FoxAUPEP',
                'FoxNZPEP', 'SALT_AU', 'SALT_NZ', 'Backwashing'];
            let batchProcess = filePrefix.find((filepre) => fileName.startsWith(filepre));
            console.log('batchProcess:',batchProcess);
            // let batchProcess;
            // if (fileName.startsWith('CDBCUST_UK'))
            //     batchProcess = 'CDBCUST_UK';
            // else if (fileName.startsWith('CDBBENE_UK'))
            //     batchProcess = 'CDBBENE_UK';
            // else if (fileName.startsWith('ROGUESEND_US'))
            //     batchProcess = 'ROGUESEND_US';
            // else if (fileName.startsWith('ROGUEBENE_US'))
            //     batchProcess = 'ROGUEBENE_US';
            // else if (fileName.startsWith('RTS1000'))
            //     batchProcess = 'FCP_Batch_RTS1000';
            // else if (fileName.startsWith('RTS2000'))
            //     batchProcess = 'FCP_Batch_RTS2000';
            // else if (fileName.startsWith('CDD_ME'))
            //     batchProcess = 'CDD_ME';
            // else if (fileName.startsWith('CDD_NAM'))
            //     batchProcess = 'CDD_NAM';
            // else if (fileName.startsWith('CDD_ANZ'))
            //     batchProcess = 'CDD_ANZ';
            // else if (fileName.startsWith('CDD_MY'))
            //     batchProcess = 'CDD_MY';
            // else if (fileName.startsWith('CDD_TH'))
            //     batchProcess = 'CDD_TH';
            // else if (fileName.startsWith('CDD_UK'))
            //     batchProcess = 'CDD_UK';
            // else if (fileName.startsWith('CIF_UK'))
            //     batchProcess = 'CIF_UK';
            // else if (fileName.startsWith('CIF_ME'))
            //     batchProcess = 'CIF_ME';
            // else if (fileName.startsWith('CIF_NAM'))
            //     batchProcess = 'CIF_NAM';
            // else if (fileName.startsWith('CIF_ANZ'))
            //     batchProcess = 'CIF_ANZ';
            // else if (fileName.startsWith('CIF_MY'))
            //     batchProcess = 'CIF_MY';
            // else if (fileName.startsWith('CIF_TH'))
            //     batchProcess = 'CIF_TH';
            // else if (fileName.startsWith('IT2'))
            //     batchProcess = 'IT2';
            // else if (fileName.startsWith('TravelLineFrimley'))
            //     batchProcess = 'Travelline_FR';
            // else if (fileName.startsWith('TravelLineRussSquare'))
            //     batchProcess = 'Travelline_RS';
            // else if (fileName.startsWith('TravelNetFrimley'))
            //     batchProcess = 'TravelNet_FR';
            // else if (fileName.startsWith('TravelNetRussSquare'))
            //     batchProcess = 'TravelNet_RS';
            // else if (fileName.startsWith('Pluto'))
            //     batchProcess = 'Pluto';
            // else if (fileName.startsWith('FoxAUPEP'))
            //     batchProcess = 'FoxAUPEP';
            // else if (fileName.startsWith('FoxNZPEP'))
            //     batchProcess = 'FoxNZPEP';
            // else if (fileName.startsWith('SALT_AU'))
            //     batchProcess = 'SALT_AU';
            // else if (fileName.startsWith('SALT_NZ'))
            //     batchProcess = 'SALT_NZ';
            // else if (fileName.startsWith('Backwashing'))
            //     batchProcess = 'Backwashing';

            // logger.debug(`fileName: ${fileName}`);
            // let lookupData = await this.getlookupData(jobConfig);
            // logger.debug(`LookupData: ${lookupData}`);
            // let batchLookup = batchProcess != 'Backwashing' ? jp.query(lookupData, `$[?(@.Batch_Process=='${batchProcess}')]`) : '';
            // let partyKey = batchProcess != 'Backwashing' ? batchLookup[0].PartyKey_Prefix : 'B30';
            // let formattedDate = await this.getFormattedDate();

            // let destinationFileName;
            // if (jobConfig.jobDetails.interfaceName == 'fcp-cdb-san')
            //     destinationFileName = `${WATCH_LIST_FILTER}${SEPARATOR}${partyKey}${SEPARATOR}${formattedDate}${SEPARATOR}${fileName.substr(0, fileName.lastIndexOf('.'))}${SEPARATOR}SAN.${FILE_EXT}`;
            // else if (jobConfig.jobDetails.interfaceName == 'fcp-cdb-pep')
            //     destinationFileName = `${WATCH_LIST_FILTER}${SEPARATOR}${partyKey}${SEPARATOR}${formattedDate}${SEPARATOR}${fileName.substr(0, fileName.lastIndexOf('.'))}${SEPARATOR}PEP.${FILE_EXT}`;
            // else
            //     destinationFileName = `${WATCH_LIST_FILTER}${SEPARATOR}${partyKey}${SEPARATOR}${formattedDate}${SEPARATOR}${fileName.substr(0, fileName.lastIndexOf('.'))}.${FILE_EXT}`;

            // logger.debug(`destination output file name: ${destinationFileName}`);
            // jobConfig.data.outputFileName = destinationFileName;
            //resolve(`{"status":${this.status.SUCCESS},"message":"FileName Generated successfully"}`);
        }
        catch (ex) {
            //reject(`{"status":${this.status.FAILED},"message":"FileName not Generated successfully"}`);
        }
}

apply();
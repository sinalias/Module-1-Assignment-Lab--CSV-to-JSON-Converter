const csvtojson = require('csvtojson');
const fs = require("fs");
const path = require("path");

const parserFromCsvtoJson = (nombreCSV) => {

    //path.join(__dirname, folderName, 'url.txt');
    let jSonObjRet = [];
    if (nombreCSV==null){
        console.error("Error: No file selected");
        return;
    }
        
    const csvFilePath=nombreCSV;

    csvtojson().fromFile(csvFilePath)
    .on('json',(jsonObj)=>{
        // combine csv header row and csv line to a json object
        jSonObjRet.push(jsonObj);
    })
    .on('done',(error)=>{
        console.log('end')
        fs.writeFileSync(path.join(__dirname, 'customer-data.json'), JSON.stringify(jSonObjRet,null,4));

    });

    /* Another way to do it
    csvtojson().fromFile(csvFilePath,(error,jsonObj)=>{
        if(error){
            console.log("An Error Has Occured");
            console.log(err);  
        } 
        
        fs.writeFileSync(path.join(__dirname, 'customer-data.json'), JSON.stringify(jsonObj,null,4));
    });*/

}

parserFromCsvtoJson(process.argv[2]);
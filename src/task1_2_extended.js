const onSuccess = () => {
    console.log("The file was saved!");
}
const onError = error => {
    console.error(error, 'error');
}
// const csvFilePath = './resources/nodejs-hw1-ex1.xlsx';// - issue with encoding
// const csvFilePath = './resources/username.csv';
// const csvFilePath = './resources/file3.csv';
// const csvFilePath = './resources/username_modified.csv';
const csvFilePath = './resources/task_data.csv'; //added data from xlsx into csv file
const csv = require('csvtojson')
const fs = require('fs');
// const request = require('request'); //uncomment for fromStream usage

fs.writeFile('./resources/test.txt', '', err => err && console.log(err));

csv()
    .fromFile(csvFilePath)
    // .fromStream(request.get('http://mywebsite.com/mycsvfile.csv'))
    .subscribe((json, lineNumber) => {
        fs.appendFile('./resources/test.txt', `${JSON.stringify(json)} \n`, err => {
            if (err) console.log(err);
        })
        // let promise = new Promise((resolve, reject) => {
        //     resolve(onSuccess);
        //     reject(onError);
        // });
        //
        // promise
        //     .then(
        //         () => fs.appendFile('./resources/test.txt', `${JSON.stringify(json)} \n`, err  => {
        //             if (err) console.log(err);
        //         }),
        //         error => onError(error)
        //     );
    }, onError, onSuccess)



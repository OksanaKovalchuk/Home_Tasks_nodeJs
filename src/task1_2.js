const onSuccess = () => {
    console.log("The file was saved!");
}
const onError = error => {
    console.error(error, 'error');
}

const csvFilePath = './resources/task_data.csv';
const csv = require('csvtojson')
const fs = require('fs');

fs.writeFile('./resources/test.txt', '', err => err && onError(err));

csv()
    .fromFile(csvFilePath)
    .subscribe((json, lineNumber) => {
        fs.appendFile('./resources/test.txt', `${JSON.stringify(json)} \n`, err => err && onError(err))
    }, onError, onSuccess)



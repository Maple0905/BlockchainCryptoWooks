const testFolder = './img/celebs/';
const fs = require('fs');
const path = require('path');

var fileBase = path.resolve(__dirname, "./img/celebs");
const files = {
  celebs: []
};
function writeToFile(path, data) {
  const json = JSON.stringify(data, null, 2);

  fs.writeFile(path, json, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}

const writeFilesArray = () => {
  writeToFile(__dirname + "/data/celebsFiles.json", files);
  // writeToFile(fileBase + "/data/wooks-counts.json", combined);
};
//


fs.readdirSync(fileBase).forEach(file => {
  files.celebs.push(file);
});
writeFilesArray();

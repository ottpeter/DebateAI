const fs = require('fs');

const Personality = {
  name: "Somebody",
  color: "#000000",
  personality: "Some personality description"
}


function loadPersonalities() {
  fs.readdir('./personalities', function (err, files) {
    if (err) return console.error("There was an error reading the personalities directory: ", err);

    files.forEach((file, index) => {
      const fileContent = fs.readFileSync(`./personalities/${file}`, {});
      const fileObj = JSON.parse(fileContent);

      global.personalities[fileObj.name] = fileObj;
    });
  })
}

module.exports = {
  loadPersonalities
}
const fs = require("fs");
const writetoJson = (data, filename) => {
  try {
    fs.writeFileSync(filename, JSON.stringify(data));
  } catch (e) {
    console.log(e.message);
  }
};
const readFromJson = (filename) => {
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(filename));
    if (!Array.isArray(data)) throw new Error();
  } catch (e) {
    data = [];
  }
  return data;
};
module.exports = { writetoJson, readFromJson };

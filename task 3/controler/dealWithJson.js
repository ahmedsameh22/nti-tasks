const fs = require("fs");
const chalk = require("chalk");
let writeData = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data));
  console.log(chalk.green("DB Updated"));
};
let readData = () => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync("data.json"));
    if (!Array.isArray(data)) throw new Error();
  } catch (e) {
    data = [];
  }
  return data;
};
module.exports = { writeData, readData };

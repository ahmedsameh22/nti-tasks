const dealWithJson = require("./dealWithJson");
const chalk = require("chalk");
let addDataToJson = (userData) => {
  let data = dealWithJson.readData();
  data.push(userData);
  dealWithJson.writeData(data);
};
let getIndex = (userId, data) => {
  let index = -1;
  data.forEach((user, i) => {
    userId === user.id ? (index = i) : {};
  });
  return index;
};
const heads = ["id", "name", "email", "status", "age", "createdAt"];
let adduser = (userData) => {
  addDataToJson(userData);
};

let allUser = () => {
  let data = dealWithJson.readData();
  if (data.length === 0) return console.log(chalk.red("no users "));
  data.forEach((userData) => {
    console.log(chalk.green(JSON.stringify(userData)));
  });
};
let singleUser = (userId) => {
  let data = dealWithJson.readData();
  let single = data.filter((user) => {
    return user.id === userId;
  });
  if (single.length === 0)
    return console.log(chalk.red("no users have this ID "));
  console.log(chalk.green(JSON.stringify(single)));
};

let editUser = (userId, userData) => {
  let data = dealWithJson.readData();
  index = getIndex(userId, data);
  if (index === -1) return console.log(chalk.red("no users have this ID "));
  heads.forEach((h) => {
    if (typeof userData[h] === "undefined") {
      userData[h] = data[index][h];
    }
  });
  data[index] = { id: userId, ...userData };
  dealWithJson.writeData(data);
};

let delUser = (userId) => {
  let data = dealWithJson.readData();
  index = getIndex(userId, data);
  if (index === -1) return console.log(chalk.red("no users have this ID "));
  data.splice(index, 1);
  dealWithJson.writeData(data);
};

module.exports = { adduser, allUser, singleUser, editUser, delUser };

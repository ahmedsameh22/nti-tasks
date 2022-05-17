//const dealWithData = require("../helper/dealWithData.helper");
const dealWithData = require("../helper/dealWithData.helper");
const dealWithِِApi = require("../helper/dealWithApi.helper");

const home = (req, res) => {
  // let data = dealWithData.readFromJson("database/data.json");
  // let show = data.length;
  // res.render("home", { pageTitle: "HOME-User", data, show });
  const apiUrl = "https://jsonplaceholder.typicode.com/albums";
  dealWithِِApi.apiReq(apiUrl, (resData, err) => {
    if (resData) {
      res.render("home", { pageTitle: "HOME-User", resData });
    } else {
      console.log("error " + err.message);
      console.log(err);
    }
  });
};
const add = (req, res) => {
  res.render("add", { pageTitle: "Add-User" });
};
const single = (req, res) => {
  let id = req.params.id;
  // let data = dealWithData.readFromJson("database/data.json");
  // User = data[id];
  // res.render("single", { pageTitle: "Single-User", User });
  const apiUrl = `https://jsonplaceholder.typicode.com/albums/${id}`;
  dealWithِِApi.apiReq(apiUrl, (user, err) => {
    if (user) {
      console.log(user);
      res.render("single", { pageTitle: "Single-User", user });
    } else {
      console.log("error " + err.message);
      console.log(err);
    }
  });
};
module.exports = {
  home,
  add,
  single,
};

//const dealWithData = require("../helper/dealWithData.helper");
const dealWithData = require("../helper/dealWithData.helper");

const home = (req, res) => {
  let data = dealWithData.readFromJson("database/customer.json");
  let show = data.length;
  res.render("home", { pageTitle: "HOME", data, show });
};
const addCustomer = (req, res) => {
  res.render("addCustomer", { pageTitle: "Customer-User" });
};
const addNewCustmer = (req, res) => {
  // const user = req.query
  // user.id=Date.now()
  const user = { id: Date.now(), ...req.query, transction: [] };
  const data = dealWithData.readFromJson("database/customer.json");
  data.push(user);
  dealWithData.writetoJson(data, "database/customer.json");
  res.redirect("/");
};
const findUser = (id) => {
  let data = dealWithData.readFromJson("database/Customer.json");
  let user = data.find((user) => user.id == id);
  return user;
};
const single = (req, res) => {
  let showrtans = 0;
  let id = req.params.id;
  let user = findUser(id);
  if (user) showrtans = user.transction.length;
  res.render("single", { pageTitle: "Single-User", user, showrtans });
};
const addtransction = (req, res) => {
  let id = req.params.id;
  let user = findUser(id);
  res.render("addtransction", { pageTitle: "Single-User", user });
};
const addtransctionPost = (req, res) => {
  let id = req.params.id;
  let teans = { ...req.body };
  let data = dealWithData.readFromJson("database/Customer.json");
  let user = data.find((user) => user.id == id);
  user.transction.push(teans);
  console.log(user);
  dealWithData.writetoJson(data, "database/Customer.json");
  res.redirect("/");
};

module.exports = {
  home,
  addCustomer,
  addNewCustmer,
  single,
  addtransction,
  addtransctionPost,
};

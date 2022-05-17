const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
require("dotenv").config();
app.set("view engine", "hbs");
//const publicDir = path.join(__dirname, "../app/resources/public");
//const layoutDir = path.join(__dirname, "../app/resources/layouts");
//const viesDir = path.join(__dirname, "../app/resources/views");
app.use(express.static(path.join(__dirname, "../app/resources/public")));
app.set("views", path.join(__dirname, "../app/resources/views"));
hbs.registerPartials(path.join(__dirname, "../app/resources/layouts"));
const userRoute = require("../routes/user.route");
app.use(userRoute);
module.exports = app;
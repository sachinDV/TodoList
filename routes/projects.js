var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

var XLSX = require("xlsx");
var workbook = XLSX.readFile("Admin_DB.xlsx");
var sheet_name_list = workbook.SheetNames;

var obj = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);

//console.log("Sheet 2"+JSON.stringify(obj))
var userMatch = "";

router.post("/login", function (req, res) {
  console.log(JSON.stringify(req.body));
  var username = req.body.username;
  var password = req.body.password;
  if (username != "" && password != "") {
    for (var i in obj) {
      userMatch = false;

      if (username != obj[i].User_Name || password != obj[i].Password) {
        console.log("Username " + obj[i].User_Name);
      } else {
        userMatch = true;
        break;
      }
    }
    if (userMatch == true) {
      console.log(username);
      req.session.username = username;
      (req.session.cookie.expires = new Date(Date.now() + 60 * 1000000000)),
        (req.session.cookie.maxAge = 60 * 1000000000);
      console.log("Login success!");
      res.redirect("/projects/about");
    } else {
      res.render("login", {
        error: "Username and password didn't match",
      });
    }
  }
});

router.get("/about", ensureAuthenticated, function (req, res) {
  res.render("about");
});

function ensureAuthenticated(req, res, next) {
  console.log("=================================");
  console.log(JSON.stringify(req.session));
  if (req.session.username) {
    return next();
  } else {
    delete req.session.username;
    res.render("login", {
      error: "Please Login",
    });
  }
}

module.exports = router;

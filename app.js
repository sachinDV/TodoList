const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var routes = require("./routes/login");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());
//app.use(express.static("public"));
//app.use("/public", express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

var sessionMiddleware = session({
  secret: "dfhsdjfhsdjlfhsdhfjhsjfsdfffffffffffffffffffflsakklruosdhfkjhsfnm",
  saveUninitialized: true,
  resave: true,
  // cookie: {
  //   maxAge: 2000000000
  // }
  //cookie: { secure: true }
});

app.use(sessionMiddleware);
app.use("/todoApp", routes);

app.listen(3000, function () {
  console.log("Server started in 3000");
});

app.get("/", function (req, res) {
  console.log("In the route api");
  console.log(JSON.stringify(req.body));
  res.render("login", {
    error: "",
  });
});

var express = require("express");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));


var exhbars = require("express-handlebars");
app.engine("handlebars", exhbars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var routes = require("./controller/controller");
routes(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
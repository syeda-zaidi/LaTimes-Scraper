var express = require("express");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var exhbars = require("express-handlebars");
app.engine("handlebars", exhbars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.get("/", function (req, res) {
  res.render("index")
});

app.get("/scrape", function (req, res) {

  axios.get("https://www.latimes.com").then(function (response) {

    const $ = cheerio.load(response.data);

    $(".PromoSmall-title").each(function (i, element) {
      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      db.Articles.create(result).then(function (dbArticles) {
        console.log(dbArticles);
      }).catch(function (err) {
        console.log(err);
      });
    });

    res.send("scrape complete");
  });
});

app.get("/articles", function (req, res) {

  db.Articles.find({})
  .then(function (dbArticles) {
    res.json(dbArticles);
  }).catch(function (err) {
    res.json(err);
  });
});

app.get("/articles/:id", function(req, res) {
  
  db.Articles.findOne({ _id: req.params.id })

  .populate("Notes")

  .then(function (dbArticles) {
    res.json(dbArticles)
  }).catch(function(err) {
    res.json(err);
  });
});

// creating and saving note associate to article
app.post("/articles/:id", function(req, res) {

  db.Notes.create(req.body)

  .then(function(dbNote) {
    return db.Articles.findOneAndUpdate({ _id: req.params.id}, {Notes: dbNote._id}, {new: true});
  })
  .then(function(dbArticles) {
    res.json(dbArticles); //why are we doing this 
  })
  .catch(function(err) {
    //sends err to the client 
    res.json(err);

  })
})

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
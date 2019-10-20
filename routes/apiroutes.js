const axios = require("axios");
const db = require("../models/index");

module.exports = app => {

    //return json for all saved articles 
    app.get("/articles-json", function (req, res) {

        db.Articles.find({})
            .then(function (dbArticles) {
                res.json(dbArticles);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.get("/articles-json/:id", function (req, res) {
        db.Articles.findOne({ _id: req.params.id })
            .populate("Notes")
            .then(function (dbArticles) {
                res.json(dbArticles)
            }).catch(function (err) {
                res.json(err);
            });
    });

    //updates the article for saving it
    app.put("/saved/:id", function (req, res) {
        ab.Articles.findOneAndUpdate({ _id: req.params.id }, { saved: true }, { new: true })
            .then(function (savedArticle) {
                res.sendStatus(200);
                console.log("article saved : " + savedArticle);

            }).catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    });



}


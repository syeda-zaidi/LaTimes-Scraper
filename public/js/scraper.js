$(document).ready(function () {

    $(".scraperBtn").on("click", function (event) {
        event.preventDefault();

        $.ajax({
            method: "GET",
            url: "/scrape",
        }).then(() => location.href = "/")
            .catch(err => {
                console.log(err);
                res.status(500)
            })
    });

    $(".clearBtn").on("click", function (evt) {
        evt.preventDefault();

        $.ajax({
            method: "GET",
            url: "/clear",
        }).then(() => location.href = "/")
        .catch(err => {
            console.log(err);
            res.status(500)
        })
    });

    $(".saveArticle-btn").on("click", function (evt) {
        evt.preventDefault();
         var dataId = $(this).data("id");
         console.log(dataId);

         $.ajax({
            method: "PUT",
            url: `/saved/${dataId}`, 
            data: {
                saved: true
            }
        }).then(function (data) {
            res.redirect("/");
        }).catch(err => {
            console.log(err);
            res.sendStatus(505);
        })
    });

    $(".deleteFromsaved-btn").on("click", function (evt) {
        evt.preventDefault();
        console.log("checking delete btn ")
         var dataId = $(this).data("id");
        console.log(dataId)
         $.ajax({
            method: "PUT",
            url: `/saved/${dataId}`, 
            data: {
                saved: false
            }
        }).then(function (data) {
            window.location.reload();
        }).catch(err => {
            console.log(err);
            res.sendStatus(505);
        })
    });
    

    $(".delete-note").on("click", function (event) {
        
        var noteId = $(this).data("note-id");
        $.ajax(`/deleteComment/${noteId}`, {
            type: "DELETE"
        }).then(data => window.location.href = window.location.href)
            .catch(err => console.log(err));
    });


})
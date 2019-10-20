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

    

})
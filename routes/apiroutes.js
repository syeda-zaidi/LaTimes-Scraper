//  // saving articles (working)
//  app.put("/articles/save/:articleId", (request, response) => {
//     db.Article.findOneAndUpdate({ _id: request.params.articleId }, { saved: request.body.saved }, { new: true })
//         .then(updatedArticle => {
//             response.send("Save status updated.");
//             response.sendStatus(200);
//             // console.log(updatedArticle)
//         })
//         .catch(err => {
//             console.log(err);
//             response.sendStatus(500);
//         });
// })

// // saving note (working)
// app.post("/notes/submit", (request, response) => {
//     db.Note.create({ body: request.body.note })
//         .then(createdNote => {
//             return db.Article.findOneAndUpdate({ _id: request.body.articleId }, { $push: { note: createdNote._id } }, { new: true })
//                 .then(addedNote => {
//                     console.log("Note added.");
//                     response.sendStatus(200)
//                     // console.log(addedNote)
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     response.sendStatus(500);
//                 });
//         })
// })
// // deleting note (working)
// app.delete("/notes/delete/:noteId", (request, response) => {
//     db.Note.deleteOne({ _id: request.params.noteId })
//         .then(deletedNote => {
//             response.send("Note deleted.");
//             response.sendStatus(200);
//         })
//         .catch(err => {
//             console.log(err);
//             response.sendStatus(500);
//         });
// })
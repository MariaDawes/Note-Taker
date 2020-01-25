const path = require("path");
const router = require("express").Router();
const store = require("../develop/db/store").Router();

//#2 Routing 

module.export = function (app){

}

router.get("/notes", function(req, res) {
     store
    .getNotes()
    .then(then => res.jason(notes))
    .catch(err => res.status(500).jason(err));
});  

router.post("/notes", function(req, res) {
    store
   .addNotes(req.body)
   .then(then => res.jason(notes))
   .catch(err => res.status(500).jason(err));
});   

router.delete("/notes", function(req, res) {
    store
   .deleteNotes()
   .then(then => res.jason(notes))
   .catch(err => res.status(500).jason(err));
});   


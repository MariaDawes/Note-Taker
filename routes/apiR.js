
const router = require("express").Router();
const store = require("../db/store");

//#2 Routing the functionalities of node.html page 

router.get("/notes", function(req, res) {
     store
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});  

router.post("/notes", function(req, res) {
    store
   .addNotes(req.body)
   .then((note) => res.json(note))
   .catch(err => res.status(500).json(err));
});   

router.delete("/notes/:id", function(req, res) {
    store
   .deleteNotes(req.params.id)
   .then(() => res.json({ok: true}))
   .catch(err => res.status(500).json(err));
});   

module.exports = router;
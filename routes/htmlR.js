  //#1. Dependencies
  const path = require("path");
  const router = require("express").Router();
  
  //#2 When in the uRL is default "*" goes to index.htmlm, when is default/notes goes to notes.html page (second page) 
  
  router.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });  

  module.exports = router;
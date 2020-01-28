const express = require('express');
const fs = require('fs');

//Variables for path
const path = require('path');
const db = require('./db/db.json');
let data_path = path.join(__dirname, '/db/db.json');

//Variable for uuid
const uuid = require("uuid/v1");

//Variables for Express app and PORT
const app = express();
const PORT = process.env.PORT || 3030;

//linking public folder to get data from it
app.use(express.static('public'));

//setting up application parsing for my JSON files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Page 1 - set index.html file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Page 2 - set notes.html
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//Getting my API/Notes
app.get('/api/notes', function(req, res) {
    res.json(db);
});

//adding random id to the notes and saving it.
app.post("/api/notes", function(req, res) {
  
  var uniqueId = uuid();
  var newnote = req.body;
  newnote.id = uniqueId;

  db.push(newnote);
  fs.writeFileSync(data_path,JSON.stringify(db),function(err,data){
    if (err) throw err;
  })
  res.json(newnote);
});

//Delete notes 
app.delete("/api/notes/:id" ,function(req,res){

  const deleteId = req.params.id;
  for (i=0;i<db.length;i++){

    if(db[i].id ===deleteId){
      db.splice(i,1);
      break;
    } 
  }
  res.json(db);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
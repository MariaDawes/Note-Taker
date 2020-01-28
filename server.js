const express = require('express');
const fs = require('fs');

//Variables for path
const path = require('path');
const datab = require('./db/db.json');
let dpath = path.join(__dirname, '/db/db.json');

//Variable for uuid
const uuid = require('uuid/v1');

//Variables for Express app and PORT
var app = express();
var PORT = process.env.PORT || 3030;

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
    res.json(datab);
});

//adding random id to the notes and saving it.
app.post("/api/notes", function(req, res) {
  
  var uniqId = uuid();
  var newtask = req.body;
  newtask.id = uniqId;

  datab.push(newtask);
  fs.writeFileSync(dpath,JSON.stringify(datab),function(err,data){
    if (err) throw err;
  })
  res.json(newtask);
});

//Delete notes 
app.delete("/api/notes/:id" ,function(req,res){

  const dId = req.params.id;
  for (i=0;i<datab.length;i++){

    if(datab[i].id ===dId){
      datab.splice(i,1);
      break;
    } 
  }
  res.json(datab);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
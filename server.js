const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require('./db/db.json');
const uuid = require("uuid/v1");//this is needed to generate random id for the notes.
//we need to install npm i uuid

let data_path = path.join(__dirname, '/db/db.json');

//Set up the "Express" app and PORT
const app = express();
const PORT = process.env.PORT || 3030;

//app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Code to data files in directory name public
app.use(express.static('public'));

//Page 1 - index.html. Send file when called
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Page 2 - notes.html - Send file when called 
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//Get new note
app.get('/api/notes', function(req, res) {
  res.json(db);
});

//Save new note on JSON
app.post("/api/notes", function(req, res) {
  
  var uniqueId = uuid();
  var newnote = req.body ;
  newnote.id = uniqueId;
  db.push(newnote);
  fs.writeFileSync(data_path,JSON.stringify(db),function(err,data){
      if (err) throw err;
      })
  res.json(newnote);
});


//Delete notes by id.Here we are passing id to the url.
app.delete("/api/notes/:id" ,function(req,res){

  //we are getting id information from the url.
  const deleteId = req.params.id;
  for (i=0;i<db.length;i++){
    if(db[i].id ===deleteId){
      //
          db.splice(i,1);
          break;
        } 
  }      
  res.json(db);
});


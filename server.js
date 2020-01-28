const express = require("express");
const fs = require("fs");
const path = require("path");
const datab = require('./db/db.json');
const uuid = require("uuid/v1");
let dbpath = path.join(__dirname, '/db/db.json');

//Express app and PORT
const app = express();
const PORT = process.env.PORT || 3030;

//App to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use files in directory name public
app.use(express.static('public'));

//Page 1 - index.html. Send file when called
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

//Page 2 - notes.html - Send file when called 
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//Get new note and save it on JSON
app.get('/api/notes', function(req, res) {
  res.json(datab);
});
app.post("/api/notes", function(req, res) {
  var uniId = uuid();
  var newtask = req.body;
  newtask.id = uniId;
  datab.push(newtask);
  fs.writeFileSync(dbpath,JSON.stringify(datab),function(err,data){
      if (err) throw err;
      })
  res.json(newtask);
});


//Delete note
app.delete("/api/notes/:id", function(req,res){
  const delId = req.params.id;
  for (i=0; i<datab.length; i++){
    if(datab[i].id ===delId){
        datab.splice(i,1);
        break;
    } 
  }      
  res.json(datab);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
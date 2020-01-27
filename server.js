const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require('./db/db.json');
const uuid = require("uuid/v1");//this is needed to generate random id for the notes.
//we need to install npm i uuid

let data_path = path.join(__dirname, '/db/db.json');

//#2. Set up the "Express" app and PORT
const app = express();
const PORT = process.env.PORT || 3030;

//#3 app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//#4 Code to data files in directory name public
app.use(express.static('public'));

//Page 1 - index.html file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


const util = require("util");
const fs = require("fs");

//Creates a promise, which the program will complete before moving on
const readfileAsync = util.promisify(fs.readFile);
const writefileAsync = util.promisify(fs.readFile);


//Store is a specialized parent function. Holds all the children inside 
class Store{

    // identifies the last note in the array      
    constructor(){
        this.lastId = 0;
    }

    //read returns field from db.jason
    read(){
        return readfileAsync("./db/db.json", "utf8");
    }

    //write puts note on a string to be put in the file
    write(note){
        return writefileAsync("./db/db.json", JSON.stringify(note));
    }

    // Read the notes from the server, load the notes array from file
    getNotes(){
        
        return this.read().then(notes =>  { 
            let noteRepo;
            try {
                noteRepo = [].concat(JSON.parse(note));
            }
            catch (err) {
            this.noteRepo = [];
                 }
                 return noteRepo; 
        
        // load(indexData = false) {    
        //         try {
        //         this.notes = JSON.parse(fs.readFileAsync("./db.json", "utf8"));
        //         if (indexData) {
        //             this.notes.forEach((el, index) => (el.id = index + 1));
        //         }
        //         } catch (err) {
        //         this.notes = [];
        //         }
        //         return this.notes;
        })            
    };

    // write the new notes into the file
    addNotes(note){
        //const newNote = newNote(++this.lastId, note);
        this.getNotes();
        note = dbstring.push(note);
        this.write(note);
    }
    
    deleteNotes(id){
       // delete a note with this id from the array
       this.getNotes();
       dbString[id] = "";
       note = dbstring.splice(id, 1);
       this.write(note); 
    }
}

module.exports = new Store();
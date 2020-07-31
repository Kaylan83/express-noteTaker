var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
app.use(express.json());
var dbData=[];

// reading the json file and retreaving the data and save it into dbData array
fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (error,res) => {
    if (error) {
        return console.log(error);
    }
    dbData =JSON.parse(res); 
});

//exporting routes
module.exports = app => {

    // get to route the notes 
    app.get("/api/notes", (req,res)=>{
        return res.json(dbData);
    });
    
    // post the data in the array coming from the json file into the notes route and add an id to it
    app.post("/api/notes", function(req, res) {
        let dbDataLength = dbData.length;
        let id;
        // if there the array length is 0, meaning no notes add an id of 1
        if (dbDataLength === 0) {
          id = 1;
        }
        // if there is notes in the array set 
        else {
           // getting the last id in the notes
          let lastID = parseInt(dbData[parseInt(dbData.length - 1)]["id"]);
          //assiging new id fro the new note
          id = lastID + 1;
          console.log("The new note id is: " + id);
        }
        // receive the new note from the notes route and store it to newNote
        let newNote = req.body;
        //assign an id to the new note
        newNote["id"] = id;
        //push the new note to the dbData array
        dbData.push(newNote);
       // write the new note to the json file
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(dbData, null, 2), (err) => {
          if (err) throw err;
        });
       
        //return new note
        return res.json(newNote);
   
      });
    
      // delete function to delete the notes and remove it from the array and update the json file
      app.delete("/api/notes/:id", function(req,res) {
          // get the note id 
        let deletedNote_id = req.params.id;
       
        // //filter the array according to the id
        let newData = dbData.filter(data => parseInt(data["id"]) !== parseInt(deletedNote_id));
        // get the note need to be deleted
        let deletedNote = dbData.filter(data => parseInt(data["id"]) === parseInt(deletedNote_id));
        // save the new data to the array without the deleted note
        dbData = newData;
      
      
        fs.writeFileSync("./db/db.json", JSON.stringify(newData, null, 2), function (err) {
          if (err) throw err;
        });
        // return the deleted note for deletion 
        return res.json(deletedNote);
      });
    
}
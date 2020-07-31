var fs = require("fs");
var path = require("path");


//exporting html routes
module.exports = app => {
    // get for routing notes.htm file
    app.get("/notes",(req,res)=> {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
       
    });
    // get for routing home page index.htm file
    app.get("/",(req,res)=> {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

}


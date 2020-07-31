var express = require("express");
var fs = require("fs");
var path = require("path");


// aquiring express
var app = express();
//assigning port
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.json());



// require the routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


// app listen 
app.listen(PORT, function() {
    console.log("App listening on port" + PORT);
  });


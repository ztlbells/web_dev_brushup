var express = require("express");
var app = express();

app.set("view engine", "ejs");

// routes
app.get("/", function(req, res){
	res.render("home");
})
app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("Server started!!!"); 
})
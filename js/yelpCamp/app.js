var express  = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("This sentence is for landing page.");
})

// listening port 3000
app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("The ztluo's server started"); 
})
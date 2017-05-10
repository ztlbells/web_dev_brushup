var express  			= require("express"),
	app 				= express(),
	mongoose 			= require("mongoose"),
	bodyParser  		= require("body-parser"),
	passport			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

var User 				= require("./models/user");

mongoose.connect("mongodb://localhost/authdemo");
app.use(bodyParser.urlencoded({extended:true}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//express-session
app.use(require("express-session")({
	//session-key
	secret:"Gakki is the cutest girl in the world"
}))



app.set("view engine", "ejs");

// HOME ROUTE
app.get("/", function(req, res){
	res.render("home");
})

//SECRET ROUTE
app.get("/secret", function(req, res){
	res.render("secret");
})

app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("The ztluo's server started"); 
});
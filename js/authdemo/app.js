var express  			= require("express"),
	app 				= express(),
	mongoose 			= require("mongoose"),
	bodyParser  		= require("body-parser"),
	passport			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

var User 				= require("./models/user");

mongoose.connect("mongodb://localhost/authdemo");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//express-session
app.use(require("express-session")({
	//session-key for encoding & decoding
	secret:"Gakki is the cutest girl in the world",
	resave: false,
	saveUninitialized: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

// these two functions have been plugged into user in user.js
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =============== middleware for checking whether logged in ===============

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
// ==========================================================================
// HOME ROUTE
app.get("/", function(req, res){
	res.render("home");
});

//SECRET ROUTE
app.get("/secret", isLoggedIn, function(req, res){
	res.render("secret");
});

//=================== REGISTER ==============================================
app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	var username 		= req.body.username;
	var password 		= req.body.password;
	
	// pass the username and password seperately 
	// storing plaintext of password is not a good idea?
	User.register(new User({username:username}), password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		} 
		// registered successfully
		console.log(username + "registed successfully.");
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		})
	})
});
//=================== LOGIN ==============================================

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local",{
			// middleware
			successRedirect:"/secret", failureRedirect:"/login"
		}), 
		function(req, res){});

//=================== LOGOUT ==============================================
app.get("/logout", function(req, res){
	req.logout();
	res.render("logout");
})


app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("The ztluo's server started"); 
});
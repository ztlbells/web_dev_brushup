var express  	= require("express"),
	app 		= express();
	mongoose 	= require("mongoose"),
	bodyParser  = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_food");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var yelpfoodSchema = new mongoose.Schema({
	name: String,
	image: String
});

var yelpFood = mongoose.model("yelpFood", yelpfoodSchema);

//	yelpFood.create(
//		{
//			name: "Taco", 
//			image: "https://static.wixstatic.com/media/e4c700_1dbf956321ba77faed6fe54164d3bc97.png/v1/fill/w_483,h_463,al_c,lg_1/e4c700_1dbf956321ba77faed6fe54164d3bc97.png"
//		}, function(err, yelpFood){
//			if(err){
//				console.log("Failed to create new food.");
//			} else{
//				console.log("Create new food successfully.");
//				console.log(yelpFood);
//			}
//		}); //
// --------------------- routes ------------------------
// (1) landing page
app.get("/", function(req, res){
	res.render("landing");
})

// (2) listing info
var menu = [
	{name: "Taco", image: "https://static.wixstatic.com/media/e4c700_1dbf956321ba77faed6fe54164d3bc97.png/v1/fill/w_483,h_463,al_c,lg_1/e4c700_1dbf956321ba77faed6fe54164d3bc97.png"},
	{name: "Fajita", image: "https://static.wixstatic.com/media/e4c700_5783fa0409478fcef4d77630f01feb86.png/v1/fill/w_290,h_158,al_c,lg_1/e4c700_5783fa0409478fcef4d77630f01feb86.png"},
	{name: "Britto", image: "https://static.wixstatic.com/media/e4c700_68e8a78be5cf277944c9dab3161a8b11.png/v1/fill/w_522,h_494,al_c,lg_1/e4c700_68e8a78be5cf277944c9dab3161a8b11.png"}
	];

// (2.1) GET method to show list
app.get("/menu", function(req, res){
	//res.render("menu",{menu:menu});

	//get all foods from db
	yelpFood.find({}, function(err, yelpFood){
		if(err){
			console.log("Failed to search foods.");
		} else{
			res.render("menu",{menu:yelpFood});
		}
	});

});

// (2.2) POST method, where to send request to add sth in
app.post("/menu", function(req, res){
	//res.send("Post route hitted.");
	// get data from forms and add them to the list shown on webpage
	var name = req.body.name;
	var image = req.body.image;
	var newFood = {name:name, image:image};
	menu.push(newFood);
	res.redirect("/menu");
});

// (2.1) GET method to show form
app.get("/menu/form", function(req, res){
	res.render("form");
});

// listening port 3000
app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("The ztluo's server started"); 
});
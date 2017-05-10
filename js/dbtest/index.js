var mongoose = require("mongoose");
// if there is not food_app.db, it would be created
mongoose.Promise = global.Promise;  
mongoose.connect("mongodb://localhost/food_app");

var foodSchema = new mongoose.Schema({
	name: String,
	taste: String,
	price: Number
});

// compile a model, so that we can use commands like Food.remove, etc.
var Food = mongoose.model("Food", foodSchema);

// adding a new food to the db
//--  method 1--
var taco = new Food({
	name: "Taco",
	taste: "Mexican",
	price: 4
});

taco.save(function(err, cat){
	// handle saving result
	if(err){
		console.log("something wrong :(");
	} else{
		console.log("done :)");
		console.log(cat);
	}
})

//-- method 2 --
Food.create({
   name: "Britto",
   taste: "Mexican",
	price: 7
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});



// retrieving all foods fromthe db
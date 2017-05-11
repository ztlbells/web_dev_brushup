var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// take the required package's methods to user schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);


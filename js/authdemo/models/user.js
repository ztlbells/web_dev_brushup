var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var UserSchema = new mongoosSchema({
	username: String,
	password: String
});

module.export = mongoose.model("User", UserSchema);
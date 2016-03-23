/**
 * Created by jason on 16/3/14.
 */

var mongoose = require('mongoose');
var validation = require('./user.validation.js');

var Schema = mongoose.Schema;

var User = new Schema({
    telphone:{type:String,required:true,index:{unique:true,dropDups:true}},
    password:{type:String,required:true}
})

var UserModel = mongoose.model("User",User);

User.path('telphone').validate(function(input){
    //return validation.isAlphaNumericOnly(input) && validation.isLongEnough(input);
    return validation.checkTelphone(input);

}," must be telphone");

User.path('password').validate(function(input){

    return validation.isGoodPassword(input);

},"Invalid password: password length must > 6")





module.exports.UserModel = UserModel;




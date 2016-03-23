/**
 * Created by crystal on 3/17/16.
 */
var mongodb = require('./db');

function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

//store user info
User.prototype.save = function(callback){
    //user document to be saved to the myuser db
    var userDoc = {
        name: this.name,
        password: this.password,
        email: this.email
    };

    //open database
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }

        //read users collection
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //insert user document into users collection
            collection.insert(userDoc, {
                safe: true
            }, function(err, userDoc){
                mongodb.close();
                if(err){
                    return callback(err);//error! return err infomation
                }
                callback(null, userDoc[0]);//success! err is null, and return userDoc
            })
        })
    })
}

//read user info
User.get = function(name, callback){
    //open database
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }

        //read users collection
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //find the document which the username is name
            collection.findOne({
                name: name
            }, function(err, userDoc){
                mongodb.close();
                if(err){
                    return callback(err);//error! return err infomation
                }
                callback(null, userDoc);//success! return the user info which found
            })
        })
    })
}
/**
 * Created by crystal on 3/17/16.
 */
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Collection,
    Server = require('mongodb').Server;

//set db name, db address and db port to create a database to connect instance
module.exports = new Db(settings.db, new Server(settings.host, settings.port),{safe:true});
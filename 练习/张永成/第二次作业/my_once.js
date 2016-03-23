/**
 * Created by asus on 2016/3/17.
 */
var eventEmitter = require('events').EventEmitter;
var event = new eventEmitter();
function myevent(){
    console.log("this is myevent");
    event.removeListener("myevent",myevent);
}

event.on("myevent",myevent);
event.emit('myevent');
event.emit('myevent');
event.emit('myevent');
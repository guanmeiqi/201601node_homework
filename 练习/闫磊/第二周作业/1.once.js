

var EventEmitter = require('./EventEmitter.js');
function fun(){
    console.log(1);
}
function fun2(){
    console.log(2);
}
var e = new EventEmitter();

e.once('test',fun);
e.once('test',fun2);
e.emit('test');
e.emit('test');
e.emit('test');
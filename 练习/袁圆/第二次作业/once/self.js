var EventEmitter = require('./EventEmitter');
var util = require('util');
function Girl(name){
    this.name = name;
    EventEmitter.call(this);
}
util.inherits(Girl,EventEmitter);

var girl = new Girl();
function Boy(name){
    this.name = name;
    this.say = function(thing){
        console.log(thing);
    }
}
var xiaoming = new Boy('小明');
var xiaohua = new Boy('小花');

girl.addListener('看',xiaoming.say);
girl.on('看',xiaohua.say);


girl.removeListener('看',xiaoming.say);

girl.once('吃',xiaoming.say);
girl.emit('吃','苹果');
girl.emit('吃','苹果');
girl.emit('吃','苹果');
girl.emit('吃','苹果');


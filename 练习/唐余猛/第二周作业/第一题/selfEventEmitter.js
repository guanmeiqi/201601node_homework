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

// girl.addLi('看',xiaoming.say);
//girl.addListener('看',xiaoming.say);
girl.addListener('看',xiaoming.say);
//girl.once('看',xiaoming.say);
//girl.once('看',xiaoming.say);
//注册监听 事件 订阅
//girl.on('看',xiaohua.say);
//发射事件 发布
girl.emit('看','钻石');
girl.emit('看','钻石');
//girl.removeListener('看',xiaoming.say);
//girl.removeAllListeners('看');
//girl.emit('看','钻石');
//girl.emit('看','项链');

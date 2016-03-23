var EventEmitter = require('events');
EventEmitter.prototype.once = function (type, listener) {
    function fn() {
        this.removeListener(type, fn);
        listener.apply(this, arguments)
    }

    this.on(type, fn);
};

//以下部分为测试once方法
var util = require('util');
function Girl(name) {
    this.name = name;
    EventEmitter.call(this);
}
util.inherits(Girl, EventEmitter);

var girl = new Girl();
function Boy(name) {
    this.name = name;
    this.say = function (words) {
        console.log(this.name, words);
    }
}
var xiaoming = new Boy('小明');
var xiaohua = new Boy('小花');

girl.once('饿了', xiaoming.say.bind(xiaoming, '吃饭'));
girl.once('饿了', xiaohua.say.bind(xiaohua, '吃饭'));
girl.once('饿了', function () {
    console.log('吃饭');
});

girl.emit('饿了');
girl.emit('饿了');
girl.emit('饿了');

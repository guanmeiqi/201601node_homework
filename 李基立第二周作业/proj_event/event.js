/**
 * Created by lijl on 2016/3/18.
 */
var EventEmitter=require('events');
var util=require('util');
function Girl(){
    EventEmitter.call(this);
}
util.inherits(Girl,EventEmitter);
var girl = new Girl();
function Cat(){
    this.say = function(){
        console.log('miaomiaomiao');
    }
}

function Dog(){
    this.say = function(){
        console.log('wangwangwang');
    }
}
var cat=new Cat();
var dog=new Dog();
girl.on('look',cat.say.bind(cat));
girl.once('touch',dog.say.bind(dog));
girl.emit('look');
girl.emit('touch');
girl.emit('look');
girl.emit('touch');



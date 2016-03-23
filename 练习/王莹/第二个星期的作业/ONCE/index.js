/**
 * Created by Administrator on 2016/3/15.
 */
var EventEmitter = require('./EventEmitter');
var util = require('util');

function boy(_name){
    EventEmitter.call(this);
    this.name=_name;
}

function example(){
    this.say=function(word){
        console.log(word);
    }
}
util.inherits(boy,EventEmitter)

var aa=new boy('leo');
var bb=new example();
//console.log(aa);//=>boy { _events: {}, _eventsCount: 0, name: 'leo' }

var fn=bb.say.bind(aa,'hello');

//aa.addListener('hah',fn)
//console.log(aa);
//
//aa.emit('hah');
//console.log(aa);
//
//aa.removeListener('hah',fn);
//console.log(aa);
console.log(aa);
aa.once('hah',fn);
console.log(aa);
aa.emit('hah');
console.log(aa);


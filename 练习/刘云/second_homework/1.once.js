/**
 * Created by crystal on 3/14/16.
 */
var EventEmitter = require('events');
var util = require('util');

function Girl(name){
    this.name = name;
}

util.inherits(Girl, EventEmitter);

Girl.prototype.once = function(type, listener){
    if(typeof listener !== 'function'){
        throw new TypeError('The listener must be function.');
    }
    function callonce(){
        this.removeListener(type, callonce);
        listener.apply(this, arguments);
    }
    this.on(type, callonce);
}

var girl = new Girl();

var beauty = function(who){
    console.log('everyone love ' + who);
}
girl.once('beauty',beauty);

girl.emit('beauty','Lily');
girl.emit('beauty','HanMeimei');
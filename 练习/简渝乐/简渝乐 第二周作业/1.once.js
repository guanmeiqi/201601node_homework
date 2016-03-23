/**
 * Created by Jian on 2016-03-18.
 */
function EventEmitter(){
    this._dongxi ={};//初始化一个私有的属性
}
EventEmitter.prototype.once = function once(event, fn) {
    var fired = false;
    g.fn = fn;
    this.on(event, g);
    var aa = this;
    function g() {
        aa.removeListener(event, fn);//执行一次就把它干掉，如果还有第二执行，那么数组里已经没有该fn了
        if (!fired) {//只有第一次执行才会走到这里
            fired = true;
            fn.apply(this, arguments);
        }
    }
    return this;
};
EventEmitter.prototype.on = function(event,fn){
    if( this._dongxi[event]!==undefined){
        this._dongxi[event].push(fn);
    }else{
        this._dongxi[event] =[fn];
    }
}

EventEmitter.prototype.removeListener=function(type,listener){
    if(this._dongxi[type]){
        var listeners =  this._dongxi[type];
        for(var i=0;i<listeners.length;i++){
            if(listeners[i] === listener){
                listeners.splice(i,1);
                return;
            }
        }
    }
}
EventEmitter.prototype.emit = function(event){
    if( this._dongxi[event]!==undefined){
        this._dongxi[event].forEach(function(ite){
            ite();
        });
    }
}

var ll = new EventEmitter();
ll.once("吃饭",function(){
    console.log('还没吃饱，再来点');
});
ll.emit('吃饭');
ll.emit('吃饭');

/**
 * Created by lijl on 2016/3/18.
 */
function MyEmitter(){
    this._events = {};//初始化一个私有的属性
}
//type 绑定的事件名
// listen 事件发生后的监听
MyEmitter.prototype.on = MyEmitter.prototype.addListener= function(type,listener){
    if(this._events[type]){
        this._events[type].push(listener);
    }else{
        this._events[type] = [listener];
    }
}
//作业 2 实现once
MyEmitter.prototype.once = function once(type, listener) {

    function g() {
        this.removeListener(type, g);

            listener.apply(this, arguments);
    }

    g.listener = listener;
    this.on(type, g);

    return this;
}

MyEmitter.prototype.emit = function(type){
    if(this._events[type])
        this._events[type].forEach(function(listener){
            listener();
        });
}
MyEmitter.prototype.removeListener=function(type,listener){
    if(this._events[type]){
        var listeners =  this._events[type];
        for(var i=0;i<listeners.length;i++){
            if(listeners[i] === listener){
                listeners.splice(i,1);
                return;
            }
        }
    }

}
module.exports  = MyEmitter;
function EventEmitter(){
    this._events = {};//初始化一个私有的属性
}
//type 绑定的事件名
// listen 事件发生后的监听
EventEmitter.prototype.on = EventEmitter.prototype.addListener= function(type,listener){
    if(this._events[type]){
        this._events[type].push(listener);
    }else{
        this._events[type] = [listener];
    }
}
//作业 2 实现once
EventEmitter.prototype.once = function(type,listener){
    var flag = false;var _this= this;

    function g(){
        _this.removeListener(type,listener);
        if(!flag){
            flag = true;
            listener.apply(this,arguments);
        }
    }

    this.on(type,g);
}
EventEmitter.prototype.emit = function(type,param){
    if(this._events[type])
        this._events[type].forEach(function(listener){
            listener(param);
        });
}
EventEmitter.prototype.removeListener=function(type,listener){
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
module.exports  = EventEmitter;
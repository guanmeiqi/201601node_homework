/**
 * Created by Administrator on 2016/3/15.
 */
function EventEmitter(){
    //用于保存事件对应的监听函数
    //事件是_events的一个属性，对应的监听函数是该属性的数组中的一个
    this._events={

    };
    //事件数
    this._eventsCount=0;
}

//添加事件监听函数
EventEmitter.prototype.on=EventEmitter.prototype.addListener=function(type,Listener){

    if(this._events[type]){
    //如果存在时候就向这个事件中添加监听的函数
        this._events[type].push(Listener);
    }else{
    //如果不存在时候就向添加事件以及监听函数       监听函数保存在一个数组中
        this._events[type]=[Listener];
    }
    //获取_events对象中的属性个数来给事件数赋值
    this._eventsCount=Object.getOwnPropertyNames(this._events).length
};

//执行事件
EventEmitter.prototype.emit=function(type){
    //判断是否存在该事件
    if(this._events[type]){
        //循环该事件对应的监听函数数组，循环执行
        this._events[type].forEach(function(Listener){
            Listener();
        })
    }
}

//取消已经的保存的监听的函数
EventEmitter.prototype.removeListener=function(type,Listener){
    //判断是否存在该事件
    if(this._events[type]){
        var listeners=this._events[type];
        for(var i=0;i<listeners.length;i++){
            //循环找到第一个匹配的监听函数  删除
            if(listeners[i]==Listener){
                listeners.splice(i,1);
                //判断该事件绑定的监听函数数量
                if(listeners.length==0){
                    //如果不存在则删除该属性
                    delete this._events[type];
                    //保存对应的事件数
                    this._eventsCount=Object.getOwnPropertyNames(this._events).length
                }
                return;
            }
        }
    }
}

//添加执行一次就取消的监听函数
EventEmitter.prototype.once=function(type,Listener){
    var obj=this;
    //保存需要添加的监听函数
    var base=Listener;
    Listener=function(){
        //先执行该函数
        base();
        //执行完之后去除该函数的事件监听
        var listeners=obj._events[type];
        for(var i=0;i<listeners.length;i++){
            //循环找到第一个匹配的监听函数  删除
            if(listeners[i]==Listener){
                listeners.splice(i,1);
                //判断该事件绑定的监听函数数量
                if(listeners.length==0){
                    //如果不存在则删除该属性
                    delete obj._events[type];
                    //保存对应的事件数
                    obj._eventsCount=Object.getOwnPropertyNames(obj._events).length
                }
                return;
            }
        }
    }

    if(this._events[type]){
        //如果存在时候就向这个事件中添加监听的函数
        this._events[type].push(Listener);
    }else{
        //如果不存在时候就向添加事件以及监听函数       监听函数保存在一个数组中
        this._events[type]=[Listener];
    }
    //获取_events对象中的属性个数来给事件数赋值
    this._eventsCount=Object.getOwnPropertyNames(this._events).length
}

module.exports=EventEmitter;




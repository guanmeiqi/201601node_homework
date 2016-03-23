
function EventEmitter(){
}
var proto = EventEmitter.prototype;

//判断对象是否存在
function isObjExist(obj){
    if (obj === undefined || obj === null){
        return true;
    }
    return false;
}

proto._getEvents = function _getEvents() {
    if (isObjExist(this._events)){
        this._events = {};
    }
    return this._events;
};


proto.getListeners = function getListeners(evt) {
    var events = this._getEvents();
    var response;
    if (isObjExist(events[evt])){
        events[evt] = [];
    }
    response = events[evt] ;
    return response;
};

//这个方法主要作用是
proto.getListenersAsObject = function getListenersAsObject(evt) {
    var listeners = this.getListeners(evt);
    var response;

    if (listeners instanceof Array) {
        response = {};
        response[evt] = listeners;
    }

    return response || listeners;
};

function indexOfListener(listeners, listener) {
    var i = listeners.length;
    while (i--) {
        if (listeners[i].listener === listener) {
            return i;
        }
    }
    return -1;
}

proto.addListener = function addListener(evt, listener) {
    var listeners = this.getListenersAsObject(evt);
    var listenerIsWrapped = typeof listener === 'object';
    var key;
    for (key in listeners) {
        if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
            listeners[key].push(listenerIsWrapped ? listener : {
                listener: listener,
                once: false
            });
        }
    }
};

proto.once = function addOnceListener(evt, listener) {
    this.addListener(evt, {
        listener: listener,
        once: true
    });
};

proto.removeListener = function removeListener(evt,listener) {
    var listeners = this.getListenersAsObject(evt);
    var key;
    for (key in listeners) {
        if (listeners.hasOwnProperty(key)) {
           var index =  indexOfListener(listeners[key], listener);
            if (index !== -1){
                listeners[key].splice(index,1);
            }
        }
    }
};

proto.removeAllListeners = function removeAllListeners(evt) {
    var events = this._getEvents();
    var type = typeof evt;
    if (type === 'string') {
        delete events[evt];
    }
};


proto.emit = function emitEvent(evt, args) {
    var listenersMap = this.getListenersAsObject(evt);
    var listeners;
    var listener;
    var i;
    var key;
    for (key in listenersMap) {
        if (listenersMap.hasOwnProperty(key)) {
            listeners = listenersMap[key].slice(0);
            i = listeners.length;
            while (i--) {
                listeners = listenersMap[key].slice(0)
                listener = listeners[i];
                if (listener.once === true) {
                    this.removeListener(evt, listener.listener);
                }
                listener.listener.call(this,args);
            }
        }
    }
};

module.exports  = EventEmitter;

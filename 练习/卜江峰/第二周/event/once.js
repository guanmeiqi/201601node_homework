/**
 * Created by BJF on 2016/3/18.
 */

EventEmitter.prototype.once= function (type,listener){
    function g() {
        this.removeListener(type, g);
        listener.apply(this, arguments);
    }
    this.on(type, g);
}
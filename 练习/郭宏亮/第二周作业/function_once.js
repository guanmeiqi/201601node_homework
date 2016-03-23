/**
 * Created by TonyTed on 16/3/16.
 * 模拟 EventEmitter的once方法
 */

EventEmitter.prototype.once = function (name, fn) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    function one(){
        this.removeListener(name, one);
        fn.call(this, arguments);
    }

    this.on(name, one);
};

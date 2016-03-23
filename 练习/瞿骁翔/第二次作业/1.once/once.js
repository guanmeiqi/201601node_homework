EventEmitter.prototype.once = function(type, listener) {
    function g() {
        this.removeListener(type, g);
        listener.apply(this, arguments);
    }
    //触发后立即解除该监听器
    this.on(type, g);
};
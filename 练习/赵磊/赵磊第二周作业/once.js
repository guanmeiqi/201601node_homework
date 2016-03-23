EventEmitter.prototype.once = function(type,listener){
    if(typeof listener !== 'function'){
        console.error('listener must be a function!')
    }
    var flag = false ;
    function g(){
        this.removeListener(type,g);
        if(flag === false){
            listener.apply(this,arguments);
            flag = true;
        }
    }
    this.on(type,g);
    return this;
}
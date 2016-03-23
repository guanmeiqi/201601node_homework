EventEmitter.prototype.once=function(type,listener){
    flag=true;
    if(flag) {
        this.addListener(type, listener)
        this.emit(type);
        this.removeListener(type, listener)
        flag = false;
    }
}
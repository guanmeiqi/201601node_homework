function myEventEmitter(){
    this.obj={};
}
myEventEmitter.prototype.on=myEventEmitter.prototype.addListener=function(type,callback){
    if(this.obj[type]){
        this.obj[type].push(callback);
    }else{
        this.obj[type]=[];
        this.obj[type].push(callback);
    }
}
myEventEmitter.prototype.emit=function(type){
    if(this.obj[type]){
        var ary=this.obj[type];
        for(var i=0;i<ary.length;i++){
            if(ary[i].flag){
                ary[i].apply(this);
                i--;
            }else{
                ary[i].apply(this);
            }
        }
    }
}
myEventEmitter.prototype.removeListener=function(type,callback){
    if(this.obj[type]){
        var temp=this.obj[type];
        for(var i=0;i<temp.length;i++){
            if(temp[i]===callback){
                temp.splice(i,1);
                return;
            }
        }
    }
}
myEventEmitter.prototype.once=function(type,callback){
    function cur(){
       callback.call();
       this.removeListener(type,cur);
    }
    cur.flag=true;
    this.on(type,cur);
}
module.exports=myEventEmitter;

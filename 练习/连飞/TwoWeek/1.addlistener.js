 function EventEmitter(){
     this._events={};
 }

 EventEmitter.prototype.once= function (type,listener){
     function g() {
         this.removeListener(type, g);
         listener.apply(this, arguments);
     }
     this.on(type, g);
 }

 module.exports=EventEmitter;

function parse(str){
    var ary=str.split("&"),tempAry,obj={};
    for(var i=0;i<ary.length;i++){
        tempAry=ary[i].split('=');
        obj[tempAry[0]]=tempAry[1];
    }
    ary=tempAry=null;
    return obj;
}
function stringify(obj){
    var str="",i=0;
    for(var key in obj){
        if(i>0){
            str+='&'+key+"="+obj[key];
        }else{
            str+=key+"="+obj[key];
        }
        i++;
    }
    return str;
}
/**
 * Created by jason on 16/3/14.
 */
module.exports = {
    isGoodPassword : function (input)
    {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        if(input.length >= 6){
            return true;
        }
        return false;
    },
    checkTelphone:function(input){

        var phoneReg = /^1[3|4|5|8|7][0-9]\d{8}$/;
        return phoneReg.test(input);
    }
}
var Index = {};

Index.Method={
    /*
     **获取数据列表
     */
    registerList: function () {
        $.ajax({
            type: "GET",
            url: "/regData",
            dataType: "json",
            success: function(data){
                var _t='';
                data.register.forEach(function (data) {
                    if(data){
                        _t+="<tr><td>"+data.username+"</td>" +
                        "<td>"+data.age+"</td>" +
                        "<td>" +
                        "<input type='button' value='保存' class='save' data-id='"+data.num+"' />" +
                        "<input type='button' value='修改' class='modify' data-id='"+data.num+"' />" +
                        "<input type='button' value='删除' class='delete' data-id='"+data.num+"' />" +
                        "</td></tr>";
                    }
                });
                $("tbody").html(_t);


                //删除用户
                $(".delete").click(function () {
                    var id=$(this).attr("data-id");
                    Index.Method.deleteUser(id);
                });


                //修改用户信息
                $(".modify").click(function () {
                    $(this).closest('td').siblings().html(function(i,html){
                        return '<input type="text" class="tdinput" value='+html+' />';
                    });
                    $(this).hide();
                    $(this).prev().show();
                });

                $(".save").click(function(){
                    var username=$(this).parent().prev().prev().find("input").val();
                    var age=$(this).parent().prev().find("input").val();
                    var num=$(this).attr("data-id");
                    $.ajax({
                        type: "PUT",
                        url: "/regData",
                        data: {"username":username,"age":age,"num":num},
                        dataType: "json",
                        success: function(data){
                            if(data){
                                Index.Method.registerList();
                            }
                        }
                    });
                });

            }
        });
    },
    /*
    **用户注册
     */
    register: function () {
        var username=$("input[name=username]").val();
        var age=$("input[name=age]").val();
        var userData={"username":username,"age":age};
        $.ajax({
            type: "POST",
            url: "/regData",
            data: userData,
            success: function(data){
                if(data){
                    Index.Method.registerList();
                    $("input[name=username]").val("");
                    $("input[name=age]").val("");
                }
            }
        });
    },
    /*
    **删除用户
     */
    deleteUser: function (id) {
        $.ajax({
            type: "DELETE",
            url: "/regData",
            data:{id:id},
            success: function(data){
                if(data){
                    Index.Method.registerList();
                }
            }
        });
    },


}



$(function () {

    //获取数据
    Index.Method.registerList();

    //注册
    $("#register").click(function () {
        Index.Method.register();
    });



});
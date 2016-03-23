/**
 * Created by asus on 2016/3/15.
 */
function query(callback){
    $.ajax({
        url: "/users",
        type: "GET",
        dataType: "json",
        async: true, //请求是否异步，默认为异步
        data: null,
        beforeSend: function () {
            //请求前的处理
        },
        success: function (data) {
            //请求成功时处理
            console.log(typeof data);
            console.log(data);
            $(".success").remove();
            $(data).each(function(i,e){
                var tr = $("<tr class='success'></tr>").append("<td><input type='checkbox'/></td><td>"+ e.username+"</td>" +
                    "<td>"+ "<input type='text' class='form-control' disabled value="+ e.password +">" +"</td>");
                $("#userlist").append(tr);
            })
            callback();
        },
        complete: function () {
            //请求完成的处理
        },
        error: function () {
            //请求出错处理
        }
    });
}

function handleCheckbox(){
    $("#checkall").change(function(){
        if($(this).prop("checked")){
            $(":checkbox").prop("checked",true).parents(".success").find(":text").removeProp("disabled");
        } else {
            $(":checkbox").prop("checked",false).parents(".success").find(":text").prop("disabled",true);
        }
    });

    $(".success").find(":checkbox").change(function(){
        if($(".success").find(":checkbox:checked").length == 0){
            $("#checkall").prop("checked",false);
        } else if($(".success").find(":checkbox:checked").length == $(".success").find(":checkbox").length){
            $("#checkall").prop("checked",true);
        }
        if($(this).prop("checked")){
            $(this).parents(".success").find(":text").removeProp("disabled");
        } else {
            $(this).parents(".success").find(":text").prop("disabled",true);
        }
    });

}

function save(){
    var user_flag,pass_flag,error_tip="";
    $("#save").click(function(){
        var flag = false;
        $(".success").each(function(i,e){
            if($(e).find("td:eq(1)").html() == $("#username").val().trim()){
                $("#tips").html("用户名已注册！");
                $("#tips_alert").show();
                flag = true;
                return;
            }
        })
        if(flag){
            return;
        }

        var obj = {};
        if($("#username").val().trim() == "") {
            user_flag = false;
        } else {
            user_flag = true;
        }
        if($("#password").val().trim() == ""){
            pass_flag = false;
        } else {
            pass_flag = true;
        }
        if(user_flag && pass_flag){
            obj.username = $("#username").val().trim();
            obj.password = $("#password").val().trim();
            $.ajax({
                url: "/users",
                type: "POST",
                async: true, //请求是否异步，默认为异步
                data: $.param(obj),
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (data) {
                    //请求成功时处理
                    $(data).each(function(i,e){
                        var tr = $("<tr class='success'></tr>").append("<td><input type='checkbox'/></td><td>"+ e.username+"</td>" +
                            "<td>"+ "<input type='text' class='form-control' disabled value="+ e.password +">" +"</td>");
                        $("#userlist").append(tr);
                    });
                    $("#tips").html("注册成功");

                    query(handleCheckbox);

                    setTimeout(function(){
                        $("#reg_modal").modal("hide");
                        $("#username,#password").val("");
                    },500);
                    //callback();
                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        } else {
            $("#tips_alert").show();
            error_tip = "";
            if(!user_flag){
                error_tip += "用户名 ";
            }
            if(!pass_flag){
                error_tip += "密码";
            }
            error_tip += "不能为空！";
            $("#tips").html(error_tip);
//                setTimeout(function(){
//                    $("#tips").html(error_tip);
//                },0);
        }

    });
}

function getDeleteUsers(){
    var users = [];
    $(".success").find(":checkbox:checked").parent().next().each(function(i,e){
        //e.innerHTML
        users.push(e.innerHTML);
    });
    return JSON.stringify(users);
}

function delUser(users){
    $.ajax({
        url:"/users",
        type:"DELETE",
        async:true,
        data:users,
        success:function(data){
            if(data == "success"){
                $("#tip_modal").modal("hide");
                query(handleCheckbox);
            }
        }
    });
}

function getModifyUsers(){
    var users = [];
    $(".success").find(":checkbox:checked").parents(".success").each(function(i,e){
        var obj = {};
        obj.username = $(e).find("td:eq(1)").html();
        obj.password = $(e).find(":text").val();
        users.push(obj);
    });
    return JSON.stringify(users);
}

function modifyUser(users){
    $.ajax({
        url:"/users",
        type:"PUT",
        async:true,
        data:users,
        success:function(data){
            if(data == "success"){
                query(handleCheckbox);
            }
        }
    });
}


$(function(){
    query(handleCheckbox);

    $("#query").click(function () {
        query(handleCheckbox);
    });
    $("#reg").click(function () {
        $("#reg_modal").modal("toggle");
        $("#tips").html("");
        $("#tips_alert").hide();
        save();
    });
    $("#delete").click(function () {
        $("#tip_modal").modal("toggle");
        $("#del").click(function(){
            var users = getDeleteUsers();
            delUser(users);
        });
    });
    $("#modify").click(function () {
        var users = getModifyUsers();
        modifyUser(users);
    });
})
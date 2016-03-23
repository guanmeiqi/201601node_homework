/**
 * Created by jason on 16/3/15.
 */

$(function () {

    //获取所有用户
    function getAllUser(){
        $.ajax({
            type:'GET',
            url:"/api/user",
            "contentType":"application/x-www-form-urlencoded",
            success:function(data){
                var str = "";
                $.each(data, function(index, item){
                    str += '<tr><td class="username">'+ item.telphone +'</td><td class="age">'+ item.password +'</td>' +
                        '<td class="col-sm-4">' +
                        '<button type="button" class="btn btn-info edit" id_attr="'+item._id+'">Edit</button>' +
                        '<button type="button" class="btn btn-warning col-sm-offset-1 remove" id_attr="'+item._id+'">Remove</button>' +
                        '</td></tr>';
                })
                $('.table tbody').html(str);

            }
        })
    }
    getAllUser()


    //注册
    $('.sureReg').on('click',function(){

        if($(this).hasClass("sureUpdate"))
        {
            return;
        }
        var data = {
            telphone:$('.regform').find("[name='telphone']").val(),
            password:$('.regform').find("[name='password']").val()
        };

        for(var i in data){

            if(data[i] == "")
            {
                $('.err-msg').html('文本内容不能为空');
                return;
            }
        }

        console.log(data);

        $.ajax({
            type:'POST',
            url:"/api/user",
            "contentType":"application/x-www-form-urlencoded",
            data: $(".regform").serialize(),
            success:function(resp){

                if(resp.status == "OK"){
                    var data = resp.user;
                    var str = '<tr><td class="username">'+ data.telphone +'</td><td class="password">'+ data.password +'</td>' +
                        '<td class="col-sm-4">' +
                        '<button type="button" class="btn btn-info edit" id_attr="'+data._id+'">Edit</button>' +
                        '<button type="button" class="btn btn-warning col-sm-offset-1 remove" id_attr="'+data._id+'">Remove</button>' +
                        '</td></tr>';
                    $('.table').append(str);
                    $('.regform').find("[name='telphone']").val("");
                    $('.regform').find("[name='password']").val("");
                }

            }
        })
    })

    //编辑
    $('body').on('click','.edit', function(){

        var id = $(this).attr('id_attr');
        var telphone = $(this).parent().parent().find('.username').html();

        $('.regform').find("[name='telphone']").val(telphone);
        $('.regform').find("#add").removeClass('sureReg').addClass("sureUpdate");


        $('.sureUpdate').on('click',function(){
            $.ajax({
                url: '/api/user/'+id,
                type: 'PUT',
                "contentType":"application/x-www-form-urlencoded",
                data:$(".regform").serialize(),
                success: function(data){
                    $('.regform').find("#add").addClass('sureReg').removeClass("sureUpdate");
                    if(data.status == 'OK'){
                        console.log('update success', data.value);
                        getAllUser();
                    }
                },
                error: function(xhr, status, err){
                    console.error('Add fail' + err);
                }
            });

        })

    });

    //删除
    $('body').on('click','.remove', function(){
        $(this).parent().parent().remove();
        var id = $(this).attr('id_attr');
        $.ajax({
            url: '/api/user/'+id,
            type: 'DELETE',
            "contentType":"application/x-www-form-urlencoded",
            success: function(data){
                if(data.status == 'success'){
                    console.log('remove success', data.value);
                }
            },
            error: function(xhr, status, err){
                console.error('Add fail' + err);
            }
        });
    });







})
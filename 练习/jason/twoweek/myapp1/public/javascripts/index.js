$(function(){




    $('body').on('click','#add',function(){

        $('.showForm').show();
    })


    $('.cancel').on('click',function(){

        $('.showForm').hide();
        $('.loginform').hide();
        $('.regform').hide();

    })


    $('.sure').on('click',function(){


        var data = {
            username:JSON.parse(localStorage.getItem('login')).username,
            projectName:$("[name='projectName']").val(),
            task:$("[name='task']").val(),
            progress:$("[name='progress']").val(),
            others:$("[name='others']").val()
        };

        console.log(data);

        for(var i in data){

            if(data[i] == "")
            {

                $('.err-msg').html('文本内容不能为空');
                return;
            }
        }

        $('.showForm').hide();

        console.log(data);

        $.ajax({
            type:'POST',
            url:"/weekly",
            // data:data,
            data:JSON.stringify(data),
            // responseType:'json',
            success:function(data){

                localStorage.setItem('weekly', data);

                var temp = JSON.parse(data);
                // console.log(typeof data);
                var str = '<tr><td>'+temp.projectName+'</td><td>'+temp.task+'</td><td>'+temp.progress+'</td></tr>';
                $("tbody").append(str);

            }
        })

        // reg()

    })

    $('.loginBtn').on('click',function(){

        $('.loginform').show();

    })


    $('.regBtn').on('click',function(){

        $('.regform').show();

    })

    $('.sureReg').on('click',function(){

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

        $('.regform').hide();

        console.log(data);

        $.ajax({
            type:'POST',
            url:"/api/user",
            // data:data,
            "contentType":"application/x-www-form-urlencoded",
            //data:JSON.stringify(data),
            data: $("#regform").serialize(),
            // responseType:'json',
            success:function(resp){

                //localStorage.setItem('login', resp);
                $('.loginBtn').parent().html("实施人:"+data.telphone);

                //updateStatus()

            }
        })


    })

    $('.sureLogin').on('click',function(){

        var data = {
            telphone:$("[name='telphone']").val(),
            password:$("[name='password']").val()
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
            type:'get',
            url:"/api/user",
            // data:data,
            "contentType":"application/x-www-form-urlencoded",
            data:$("#loginform").serialize(),
            // responseType:'json',

            success:function(resp){

                var respData = JSON.parse(resp);

                // alert(respData.result == 1);
                if(respData.result == 1){
                    $('.loginform').hide();
                    localStorage.setItem('login', resp);
                    // $('.loginBtn').parent().html("实施人:"+data.username);

                    //updateStatus();
                }
                else{

                    $('.loginform').find('.err-msg').html(respData.errMsg);
                    // localStorage.setItem('login', resp);
                    // $('.loginBtn').parent().html("实施人:"+data.username);
                    // updateStatus()

                }

            }
        })
    })

})
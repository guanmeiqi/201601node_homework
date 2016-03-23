/**
 * Created by yuan on 2016/3/16.
 */
function land(){
    var queryName = $('input[name=queryName]').val();
    $.ajax({
        method: "GET",
        url: "/user/"+queryName,
    }).done(function(data){
        var data = JSON.parse(data);
        if(data.status == 'success'){
            window.location.href="/list";
        }else{
            alert('登录失败，请注册');
        }
    });
}

function reg(){
    event.preventDefault();
    var data = $( "form.reg" ).serialize();
    $.ajax({
        method: "POST",
        url: "/addUsers",
        data: data
    }).done(function(data){
        var data = JSON.parse(data);
        if(data.status == 'success'){
            alert('注册成功，请登录');
            window.location.href="/";
        }else{
            alert('注册失败');
        }
    });
}

$('body').on('click','button.remove',function(i){
    var id = $(this).attr('data');
    var  _this = $(this);
    $.ajax({
        method: "GET",
        url: "/delete/"+id,
    }).done(function(data){
        var data = JSON.parse(data);
        if(data.status == 'success'){
            _this.parents('tr').remove();
        }else{
            alert('删除失败');
        }
    });
});
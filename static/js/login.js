$(document).ready(function(){
    $("input").keypress(function(e){
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13){
            logintest()
        }
      });
    function logintest(){
        if($("#userId").val() != "" && $("#userPassword").val() != ""){
            AJAX();
        }
    }
    $("#backtologin").click(function (e) { 
        $(".loginlist").show()
        $(".forgot-pwdlist").hide()
        
    });
$("#sendforgot").click(function (e) {
    data_5 = {
        userId: $("#forgotId").val(),
        type: "2"
    }
    $.ajax({
        type: "POST",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/SendConfirm",
        data: JSON.stringify(data_5),
        contentType: "application/json",
        datatype: JSON,
        success: function (data_5) {
            $.confirm({
                title: '成功！',
                animation: 'zoom',
                closeAnimation: 'scale',
                content: '請去信箱收信呦！',
                buttons: {
                    確認: {
                        btnClass: 'btn-success',
                        action: function() {
                        }
                    }
                }
            })
        }
    });
    
});
    $(".forgot-pwd").click(function (e) { 
        $(".loginlist").hide()
        $(".forgot-pwdlist").show()
        
    });
    $("#login2").click(function (e) { 
        logintest()
        
    });
    function AJAX(){
    data = {
        userId: $("#userId").val(),
        userPassword: $("#userPassword").val()
    }
    $.ajax({
        type: "POST",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/select",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: JSON,
        success: function(data) {
            code = data.code
            $.each(data.result, function (indexInArray, content) {
                if(code == "001"){
                    var userName = content.userName
                    var userId = content.userId
                    var userPassword = content.userPassword
                    var Id = content.Id
                    var token = content.token
                    $.cookie("qsacw", token, { expires: 7 })
                    $.cookie("Id", Id, { expires: 7 })
                    if($.cookie("type") == "check"){
                        location.href = "/check?id=" + $.cookie("acdid") 
                    }else{
                        location.href="/"
                    }
                }
                if(code == "002"){
                    $(".alert-danger").html("密碼錯誤");
                    $(".alert-danger").show()
                }
                if(code == "003"){
                    $(".alert-danger").html("無此帳號");
                    $(".alert-danger").show()
                }
            });
        },
    });
    }
})
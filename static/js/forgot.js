$(document).ready(function () {
    userId = ''
    url = location.pathname
    token = url.split("/")
    token = token[2]
    $.ajax({
        type: "GET",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/ForgetPassword?token=" + token,
        async:false,
        success: function (data) {
            if(data.code == "009"){
                
            }else{
                userId = data.Id.user_id
            }
        }
    });
    $(document).on("click", "#nextforgot", function () {
        if($("#forgotpassword").val() == $("#forgotpassword-again").val()){
            data_password = {
                userId: userId,
                userPassword:$("#forgotpassword").val()
            }
            $.ajax({
                type: "POST",
                url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/changePassword",
                data: JSON.stringify(data_password),
                contentType: "application/json",
                datatype: JSON,
                async:false,
                success: function (response) {
                    $(".start").hide()
                    $(".finish").css("display", "flex")
                }
            });
        }
    });
    $(document).on('click', "#sendforgot", function () {
        location.href = "http://fiesta.nkust.edu.tw/login"
    });
});
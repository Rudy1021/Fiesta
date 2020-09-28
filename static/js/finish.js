$(document).ready(function () {
    token = location.pathname
    token = token.substr(13)
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Account/ValidateEmail?token=" + token,
        success: function (response) {
            console.log(response)
            if(response.code == "001"){
                $(".success").show()
            }else if(response.code == "009"){
                $(".fail").show()
            }
        }
    });
    $(document).on('click', ".buttonclick", function () {
            location.href = 'http://fiesta.nkust.edu.tw';
    });
});
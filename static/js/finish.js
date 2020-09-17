$(document).ready(function () {
    token = location.pathname
    token = token.substr(13)
    $.ajax({
        type: "POST",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/ValidateEmail?token=" + token,
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
$(document).ready(function () {
    $("#logout").click(function (e) { 
        $.removeCookie('userName');
        $.removeCookie('Id');
        $.removeCookie('qsacw');
        location.href = '/'
    });
});
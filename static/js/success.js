if($.cookie("code") == "001"){
    $(".success").show()
}else if($.cookie("code" == "010")){
    $(".fail").show()
}
$.removeCookie('code', { path: '/' });
setInterval(function(){document.location.href="/"},3000);
$(document).ready(function () {
    if($.cookie("Id") == undefined){
        var url = new URL(location.href);
        id = url.searchParams.get('id');
        $.cookie("type", "check")
        $.cookie("acdid", id)
        location.href = '/login'
    }else{
        var url = new URL(location.href);
        id = url.searchParams.get('id');
        data = {
            act_Id: id,
            authId: $.cookie("Id")
        }
        console.log(id)
        console.log(typeof(id))
        $.ajax({
            type: "POST",
            url: "https://fiesta.nkust.edu.tw/Fiestadb/Ticket/vaild",
            data: JSON.stringify(data),
            async:false,
            contentType: "application/json",
            datatype: JSON,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            success: function (data) {
                console.log(data)
                setInterval(function(){
                    location.href = '/success';
                },1500);
                
            }
        });
    }
});
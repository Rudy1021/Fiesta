$(document).ready(function () {
    actid = []
    data = {
        act_Id: actid
    }
    $.ajax({
        type: "POST",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Activity/getRecommend",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: JSON,
        success: function (data) {
            count = 0
            if(data.code != '013'){
                $.each(data.result, function (indexInArray, content) { 
                    if(content.Useable != "0"){
                        if(count < 4){
                            act = '<span class="card act">' +
                            '<img src=' + content.Photo + ' class="card-img-top" alt="...">' +
                            '<span class="card-body">' +
                            '<div class="card-title">' + content.act_Name + '</div>' + '<span class="id">' + content.Id + '</span>' +
                            '<div class="card-title-2"></div><div class="card-text"></div>' +
                            '<div class="card-date"><small class="text-muted"></small></div>' +
                            '</span></span>'
                            $(".card-deck-area-1").append(act)
                        }else{
                            act = '<span class="card act">' +
                            '<img src=' + content.Photo + ' class="card-img-top" alt="...">' +
                            '<span class="card-body">' +
                            '<div class="card-title">' + content.act_Name + '<span class="id">' + content.Id + '</span></div>' +
                            '<div class="card-title-2"></div><div class="card-text"></div>' +
                            '<div class="card-date"><small class="text-muted"></small></div>' +
                            '</span></span>'
                            $(".card-deck-area-2").append(act)
                        }
                        count++
                    }
                });
                if(count <= 4){
                    $(".control-1").hide()
                }
                $("span.act").click(function (e) {
                    $.cookie("acid", $(this).children(".card-body").children("span.id").html(), { expires: 7 })
                    window.location.href = "/Activity/" + $(this).children(".card-body").children(".card-title").html()
                });
            }else if(data.code == '013'){
                for(i = 0;i < 8;i++){
                    if(i < 4){
                        act = '<span class="card">' +
                        '<img src="../static/img/bg1.jpg" class="card-img-top" alt="...">' +
                        '<span class="card-body"><div class="card-title">尚無活動 <span class="badge badge-pill badge-danger float-right">已售完</span></div>' +
                        '<div class="card-title-2"></div><div class="card-text"></div>' +
                        '<div class="card-date"><small class="text-muted"></small></div></span></span>'
                        $(".card-deck-area-1").append(act)
                    }else{
                        act = '<span class="card">' +
                        '<img src="../static/img/bg1.jpg" class="card-img-top" alt="...">' +
                        '<span class="card-body"><div class="card-title">尚無活動 <span class="badge badge-pill badge-danger float-right">已售完</span></div>' +
                        '<div class="card-title-2"></div><div class="card-text"></div>' +
                        '<div class="card-date"><small class="text-muted"></small></div></span></span>'
                        $(".card-deck-area-2").append(act)
                    }
                }
            }
        }
    });
});
/* 
              <span class="card">
                <img src="{{ url_for('static',filename='img/bg1.jpg') }}" class="card-img-top" alt="...">
                <span class="card-body">
                  <div class="card-title">尚無活動 <span class="badge badge-pill badge-danger float-right">已售完</span></div>
                  <div class="card-title-2"></div>
                  <div class="card-text"></div>
                  <div class="card-date"><small class="text-muted"></small></div>
                </span>
              </span>
*/
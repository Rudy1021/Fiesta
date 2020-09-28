$(document).ready(function () {
    getAct()
    //getAd()
});

function getAd() {
    Ads_id = []
    data_Ads = {
        Ads_Id: Ads_id
    }
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Ads/getRand",
        data: JSON.stringify(data_Ads),
        contentType: "application/json",
        datatype: JSON,
        success: function (data) {
            if(data.code == "001"){
                console.log(data)
                $(".default").remove()
                $.each(data.result, function (indexInArray, content) {
                    if(indexInArray == 0){
                        Ads = '<div class="carousel-item active Ad">' +
                            '<div class="adv-show-img">' +  '<a href="' + content.url + '">' +
                            '<img src="' + content.Photo + '" class="d-block w-100 h-500" alt="..."></a>' +
                            '</div></div>'
                        AdsId = content.Ads_Id
                        $(".Ads").append(Ads)
                    }else if(indexInArray != 0 && AdsId != content.Ads_Id){
                        AdsId = content.Ads_Id
                        Ads = '<div class="carousel-item Ad">' +
                            '<div class="adv-show-img">' + '<a href="' + content.url + '">' +
                            '<img src="' + content.Photo + '" class="d-block w-100 h-500" alt="...">' +
                            '</a></div></div>'
                        $(".Ads").append(Ads)
                    }
                });
                for(i = 0;i < $(".Ad").length;i ++){
                    countAd = '<li data-target="#Adslist" data-slide-to="' + i + '"></li>'
                    $(".carousel-indicators").append(countAd)
                }
            }
        }
    });
}


function getAct() {
    actid = []
    data_Act = {
        act_Id: actid
    }
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Activity/getRecommend",
        data: JSON.stringify(data_Act),
        contentType: "application/json",
        datatype: JSON,
        success: function (data) {
            count = 0
            if(data.code != '013'){
                $.each(data.result, function (indexInArray, content) { 
                    if(content.Useable != "0"){
                        if(count < 4){
                            act = '<span class="card act">' +
                            '<div class="card-img">'+
                            '<img src=' + content.Photo + ' class="card-img-top" alt="...">' +
                            '</div>'+
                            '<span class="card-body">' +
                            '<div class="card-title">' + content.act_Name + '</div>' + '<span class="id">' + content.Id + '</span>' +
                            '<div class="card-title-2"></div><div class="card-text"></div>' +
                            '<div class="card-date"><small class="text-muted"></small></div>' +
                            '</span></span>'
                            $(".card-deck-area-1").append(act)
                        }else{
                            act = '<span class="card act">' +
                            '<div class="card-img">'+
                            '<img src=' + content.Photo + ' class="card-img-top" alt="...">' +
                            '</div>'+
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
                        '<span class="card-body"><div class="card-title">尚無活動</div>' +
                        '<div class="card-title-2"></div><div class="card-text"></div>' +
                        '<div class="card-date"><small class="text-muted"></small></div></span></span>'
                        $(".card-deck-area-1").append(act)
                    }else{
                        act = '<span class="card">' +
                        '<img src="../static/img/bg1.jpg" class="card-img-top" alt="...">' +
                        '<span class="card-body"><div class="card-title">尚無活動</div>' +
                        '<div class="card-title-2"></div><div class="card-text"></div>' +
                        '<div class="card-date"><small class="text-muted"></small></div></span></span>'
                        $(".card-deck-area-2").append(act)
                    }
                }
            }
        }
    });
}
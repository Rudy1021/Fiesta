$(document).ready(function () {
    actid = []
    getRecommend()
    //getAds()
    function getRecommend() {
        data = {
            act_Id: actid
        }
        $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/Activity/getRecommend",
            data: JSON.stringify(data),
            contentType: "application/json",
            datatype: JSON,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            success: function (data) {
                console.log(data)
                if(data.code != '013'){
                $.each(data.result, function (indexInArray, content) {
                    if(content.Useable != "0"){
                        actag = ''
                        tag = content.Tag
                        for(i = 0;i < tag.length;i++){
                            actag = actag + '<div class="act-tag">' + tag[i] + '</div>'
                        }
                        act = '<div class="card justify-content-md-center activity card-outline-Act">' +
                            '<div class="card-body"><span class="id">' + content.Id +
                            '</span><h5 class="card-title all-title activity-title">'+ content.act_Name + 
                            '</h5><p class="card-text"></p><div class="row"><div class="col-lg-5 col-sm-12"><img src="' + content.Photo +
                            '" class="card-img-top"></div><div class="col-lg-7 col-sm-12"><div class="row font-7 mt-2">' +
                            '<div class="col-2 ml-2 mt-1"><i class="far fa-calendar-alt"></i></div><div class="col">' + content.startTime +
                            '</div></div><div class="row font-7 mt-2"><div class="col-2 ml-2 mt-1"><i class="fas fa-users"></i></div>' +
                            '<div class="col-6">' + content.joinedCount + '/' + content.peopleMaxium + '</div></div><div class="row mt-2">' +
                            '<div class="col mt-2 taglist">' + actag + '</div></div></div></div><p></p></div></div>'
                        $(".actlist").append(act)
                    }
                    actid.push(content.Id)
                });
                $("div.card").click(function (e) {
                    $.cookie("acid", $(this).children(".card-body").children("span.id").html(), { expires: 7 })
                    window.location.href = "/Activity/" + $(this).children(".card-body").children(".card-title").html()
                });
                if(data.code == '013'){

                }else{
                    if(data.result.length < 10){

                    }else{
                more = '<div class="text-center btn-area"><br><button type="button" id="more" class="btn btn-secondary">More</button></div>'
                $(".container-fluid.activity-list").append(more)
                $("#more").click(function (e) { 
                    $("#more").remove()
                    getRecommend()
                });
            }
            }
            }
        }
        });
    }
});
function getAds() {
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
                if($(".activity").length >= 3){
                    act = 2
                    $.each(data.result, function (indexInArray, content) {
                        Ads = '<div class="card justify-content-md-center activity card-outline-Act">' +
                        '<div class="card-body"><span class="id">' + content.Ads_Id +
                        '</span><h5 class="card-title all-title activity-title">'+ content.Ads_Name + 
                        '</h5><p class="card-text"></p><div class="row"><div class="col-lg-5 col-sm-12"><img src="' + content.Photo +
                        '" class="card-img-top"></div><div class="col-lg-7 col-sm-12"><div class="row font-7 mt-2">' +
                        '<div class="col-2 ml-2 mt-1"><i class="fas fa-store"></i></div><div class="col">' + content.Source +
                        '</div></div><div class="row font-7 mt-2"><div class="col-2 ml-2 mt-1"><i class="far fa-comment-dots"></i></i></div>' +
                        '<div class="col-6">' + content.Content + '</div></div><div class="row mt-2">' +
                        '<div class="col mt-2 taglist"><div class="act-tag">搖滾</div>' + '</div></div></div></div><p></p></div></div>'
                        $(".activity").eq(act).after(Ads)
                        act += 3
                    })
                }else{
                    $.each(data.result, function (indexInArray, content) {
                        Ads = '<div class="card justify-content-md-center activity card-outline-Act">' +
                        '<div class="card-body"><span class="id">' + content.Ads_Id +
                        '</span><h5 class="card-title all-title activity-title">'+ content.Ads_Name + 
                        '</h5><p class="card-text"></p><div class="row"><div class="col-lg-5 col-sm-12"><img src="' + content.Photo +
                        '" class="card-img-top"></div><div class="col-lg-7 col-sm-12"><div class="row font-7 mt-2">' +
                        '<div class="col-2 ml-2 mt-1"><i class="fas fa-store"></i></div><div class="col">' + content.Source +
                        '</div></div><div class="row font-7 mt-2"><div class="col-2 ml-2 mt-1"><i class="far fa-comment-dots"></i></i></div>' +
                        '<div class="col-6">' + content.Content + '</div></div><div class="row mt-2">' +
                        '<div class="col mt-2 taglist"><div class="act-tag">搖滾</div>' + '</div></div></div></div><p></p></div></div>'
                        $(".activity").append(Ads)
                        return false
                    })
                }
            }
        }
    });
}
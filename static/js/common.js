idlist = []
$(".nav-btn").off("click");
hrefname = location.href.split("/")
if(hrefname[3] != "Activity"){
    $.removeCookie("acid")
}
if(location.pathname != "/dashboard"){
    $.removeCookie("actid")
}
if(location.href == '/'){
    $.removeCookie("acdid")
    $.removeCookie("type")
    $.removeCookie("kind")
}
$(".emailtest").on('click', function () {
    id = $(this).prop("id")
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Account/getReviewStatus",
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            if(data.code == "020"){
                $.confirm({
                    title: '喔不！',
                    animation: 'zoom',
                    closeAnimation: 'scale',
                    content: '此會員尚未進行驗證，現在就去驗證吧！',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                    location.href = '/MyProfile'
                                }
                            }
                        }
                })
            }else{
                if(id == "Create"){
                    location.href = "/CreateEvent"
                }else if(id == "Group"){
                    location.href = "/Group"
                }else if(id == "MyTicket"){
                    location.href = "/MyTicket"
                }else if(id == "dashboard"){
                    data_getCreate = {
                        authId: $.cookie("Id")
                    }
                    $.ajax({
                        type: "POST",
                        url: "http://163.18.42.222:8888/Fiestadb/Account/getCreateAct",
                        data: JSON.stringify(data_getCreate),
                        contentType: "application/json",
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        async:false,
                        datatype: JSON,
                        success: function (data) {
                            $.each(data, function (indexInArray, content) { 
                                idlist.push(content.Id)
                            });
                            if(idlist.length > 0){
                                location.href = "/dashboard"
                            }else{
                                $.confirm({
                                })
                            }
                        }
                    });
                }
            }
        }
    });
});
$('input').keypress(function (e) {
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13){
        e.preventDefault();
    }
});


globalTimeout = null;  
$("#base-Search").keyup(function (e) {
    $("input#base-Search").removeAttr("style");
    $("div.search-area").hide()
    $("div.search-content").children().remove()
    if(globalTimeout != null) {
        clearTimeout(globalTimeout);
    }
    globalTimeout = setTimeout(SearchFunc, 2000);
});


function SearchFunc(){
    globalTimeout = null;
    if($("#base-Search").val() != ""){
        if(!$("#base-Search").val().match(/^\s+/)){
            $("input#base-Search").css('border-radius', '1rem 1rem 0px 0px');
            $("div.search-area").show()
            data = {
                Search: $("#base-Search").val()
            }
            $.ajax({
                type: "POST",
                url: "http://163.18.42.222:8888/Fiestadb/Activity/Search",
                data: JSON.stringify(data),
                contentType: "application/json",
                datatype: JSON,
                success: function (data) {
                        id = ''
                        for (var i = 0, l = data.result.length; i < l; i++) { //這邊的i是指目前算到第幾個json
                            for (var key in data.result[i]) {
                                if(key == 'Id'){
                                    id = data.result[i][key]
                                }
                                if(key == 'act_Name'){
                                   acName =  data.result[i][key]
                                }
                                if(key == 'act_Description'){
                                    acDescription = data.result[i][key]
                                }
                                if(key == 'startTime'){
                                    acST = data.result[i][key]
                                }
                            }
                            search = '<div class="row search-row"><div class="col-4 mb-3 img-parent"><img src="/static/img/sample-2.png"class="search-img">' +
                            '</div><div class="col-8 search-text-parent"><div class="search-text"><div class="title" id="title-' + i + '">' +
                            acName + '</div><div id="location-' + i + '/">100m</div>' +
                            '<div id="content-'+ i +'">' + acDescription + '</div>' +
                            '<div id="ST-' + i + '">' + acST + '</div><span class="actId">' + id + '</span><br>'
                            $("div.search-content").append(search)
                            $("div.search-row").click(function (e) {
                                title = $(this).children(".search-text-parent").children(".search-text").children(".title").html()
                                $.cookie("acid", $(this).children(".search-text-parent").children(".search-text").children(".actId").html(), {path: "/"})
                                location.href = '/Activity/' + title
                            });
                        }
                }
            });
        }
    }
  }
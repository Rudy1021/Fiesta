$(document).ready(function () {
    getAd()
    $.ajax({
        type: "GET",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Tag/select",
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            $.each(data.result, function (indexInArray, content) {
                for(i = 0;i<content.length;i++) {
                    sort = '<div class="tag-box">' + content[i] + '</div>'
                    $("div.tag-list").append(sort)
                    
                }
            });
        }
    });


    $(document).on('click', '.ad-edit', function () {
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() - 180 });
        showAds($(this).prop("id"))
    });

    $(document).on('click', ".tag-box", function () {
        if($("#tag").val() == ""){
            $("#tag").val($(this).text())
        }else if($("#tag").val().split(",").length >= 5){
            $.confirm({
                title: '警告！',
                animation: 'zoom',
                closeAnimation: 'scale',
                content: '標籤最多四個！',
                buttons: {
                    確認: {
                        btnClass: 'btn-warning',
                        action: function() {
                        }
                    }
                }
            })
        }else {
            taglist = $("#tag").val().split(",")
            for(i = 0;i <= taglist.length;i ++){
                if($(this).text() == taglist[i]){
                    $.confirm({
                        title: '警告！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '標籤重複！',
                        buttons: {
                            確認: {
                                btnClass: 'btn-warning',
                                action: function() {
                                }
                            }
                        }
                    })
                    break
                }else if(i == taglist.length){
                    $("#tag").val($("#tag").val() + "," + $(this).text())
                }
            }
        }
    });


    function showAds(id) {
        data_showAds = {
            Ads_Id: id
        }
        $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/Ads/SelectById",
            async:false,
            data: JSON.stringify(data_showAds),
            contentType: "application/json",
            datatype: JSON,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            success: function (data) {
                $.each(data.result, function (indexInArray, content) {
                    $("#Ads_Name").val(content.Ads_Name)
                    $("#Content").val(content.Content)
                    $(".submit").prop("id", content.Id)
                    $(".newimg").css("background-image", "url('" + content.Photo + "')")
                    $("#Price").val(content.Price)
                    $("#Source").val(content.Source)
                    $("#startTime").val(content.startTime)
                    $("#endTime").val(content.endTime)
                    $("#url").val(content.url)
                    tag = content.Tag
                })
                tagval = ''
                for(i = 0;i < tag.length;i ++){
                    if(i == 0){
                        tagval = tag[0]
                    }else{
                        tagval = tagval + ',' + tag[i]
                    }
                }
                $("#tag").val(tagval)
            }
          });
    }


    $(document).on('click', ".delete", function () {
        id = $(this).prop("id")
        $.confirm({
            title: '警告！',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '確定要刪除嗎？',
            buttons: {
                確認: {
                    btnClass: 'btn-warning',
                    action: function() {
                        deleteAds(id)
                    }
                },
                取消: {
                    btnClass: 'btn-success',
                    action: function() {
                    }
                }
            }
        })
    });
    $("#file").change(function (e) { 
        readURL(this)
    });
    function readURL(input) {
        if(input.files && input.files[0]){
            var reader = new FileReader()
            img = $(input).parent().parent()
            reader.onload = function (e) {
                $(img).css("background-image","url(" + e.target.result + ")")
                $(img).css("cursor", "grab")
            }
            reader.readAsDataURL(input.files[0])
        }
    }
    var o={
        timeFormat: 'HH:mm',
        dateFormat: 'yy-mm-dd',
        minDate: "-0d"
    }
    $('.DateTime').datetimepicker(o)


    $(".submit").on('click', function () {
        for(i = 0;i < $(".behoove").length;i++){
            if($(".behoove").eq(i).val() == ""){
                $.confirm({
                    title: '錯誤！',
                    animation: 'zoom',
                    closeAnimation: 'scale',
                    content: '有欄位未填！',
                    buttons: {
                        確認: {
                            btnClass: 'btn-warning',
                            action: function() {
                            }
                        }
                    }
                })
                break
            }
        }
        Now = new Date()
        start = new Date(Date.parse($("#startTime").val()));
        endTime = new Date(Date.parse($("#endTime").val()));
        if(Now > start){
            wrongTime()
        }else if(Now < start){
            if(endTime > start){
                id = submitAd()
            }else if(endTime < start){
                wrongTime()
            }
        }
        if($(".newimg").css("background-image") != 'url("http://127.0.0.1:5000/static/img/bg1.jpg")'){
            uploadimg(id)
        }
    });
});


function deleteAds(id){
    data_deleteAds = {
        Ads_Id: id
    }
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Ads/delete",
        async:false,
        data: JSON.stringify(data_deleteAds),
        contentType: "application/json",
        datatype: JSON,
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            location.reload()
        }
      });
}


function uploadimg(id) {
    var file_data = $('#file').prop('files')[0]
    var form_data = new FormData();
    form_data.append('file', file_data);
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/uploadImage?type=Ads&Id=" + id,
        data: form_data,
        async:false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            location.reload()
        }
      });
}


function submitAd() {
    data_AdsUpload = {
        Ads_Name: $("#Ads_Name").val(),
        Tag: $("#tag").val(),
        Source: $("#Source").val(),
        startTime: $("#startTime").val(),
        endTime: $("#endTime").val(),
        Price: $("#Price").val(),
        Content: $("#Content").val(),
        viewStatus: "true",
        Useable: "true",
        url: $("#url").val()
    }
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Ads/upload",
        data: JSON.stringify(data_AdsUpload),
        contentType: "application/json",
        datatype: JSON,
        async:false,
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            id = data.result[0]
        }
      });
      return id.Ads_Id
}


function wrongTime() {
    $.confirm({
        title: '錯誤！',
        animation: 'zoom',
        closeAnimation: 'scale',
        content: '時間錯誤！',
        buttons: {
            確認: {
                btnClass: 'btn-Warring',
                action: function() {
                }
            }
        }
    })
}

function getAd() {
    data_getAd = {
        Source: "asd"
    }
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Ads/SelectBySource",
        data: JSON.stringify(data_getAd),
        contentType: "application/json",
        datatype: JSON,
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (response) {
            tags = ''
            $.each(response.result, function (indexInArray, content) {
                tags = ''
                for(i = 0;i < content.Tag.length;i ++){
                    tags = tags + '<div class="tag-box">' + content.Tag[i] + '</div>'
                }
                ad = '<div class="row"><div class="col-12"><div class="card shadow mb-4">' +
                '<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">' +
                '<h6 class="m-0 font-weight-bold text-primary">已投放廣告</h6><div class="dropdown no-arrow">' +
                '<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false">' +
                '<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i></a>' +
                '<div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">' +
                '<div class="dropdown-header">選擇動作</div><a class="dropdown-item ad-edit" href="javascript:;" id="' + content.Id + '">編輯</a>' +
                '<a class="dropdown-item delete" href="javascript:;" id="' + content.Id + '">刪除</a></div></div></div>' +
                '<div class="card-body"><div class="row"><div class="col-md-6 col-sm-12 text-center">' +
                '<div class="change-img" style="background-image:url(' + "'" + content.Photo + "'" + ');"></div></div><div class="col-md-6 col-sm-12">' +
                '<div class="row"><div class="col-md-12 adv-title ml-4">' +
                content.Ads_Name + '</div></div><div class="row ml-3"><div class="col-md-12 float-left adv-test">' +
                '<div class="adv-info float-left mr-3">廠商名稱：' + content.Source + '價格：' + content.Price + '元<br>' +
                '開始時間：' + content.startTime + '結束時間：' + content.endTime + tags +
                '</div></div></div><div class="row"><div class="col-md-11 float-left adv-test"><hr>' +
                content.Content + '</div></div></div></div></div></div></div></div>'
                $(".container-fluid").prepend(ad)
            });
        }
    });
}
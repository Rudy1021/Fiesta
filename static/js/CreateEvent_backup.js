$(document).ready(function () {
    //choosedate
    var opt={dateFormat: 'yy-mm-dd',
               timeFormat: 'HH:mm',
               controlType: 'select',
               oneLine: true,
                beforeShow: function () {
                    $("#ui-datepicker-div").css("z-index", 10)
                }
               };
    var o={
        timeOnlyShowDate: true,
        timeFormat: 'HH:mm',
        dateFormat: ''
    }
    $('#datetimepicker1').datetimepicker(opt)
    $('#datetimepicker2').datetimepicker(opt)
    $('.datetimepicker3').timepicker(o)
});
side = ''
modnum = []
$(".tem").hide()
define = $(".define")
groupId = ''
//goto
//first page
$("button#gotem").click(function (e) {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-timeliness").hide()
    $('div#choose-temporarily').show()
    side = 'left'
    $(".first").hide()
    $(".tem").hide()
});



$("button#goselect").click(function (e) {
    data = {authId: $.cookie("Id")}
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Account/getJoinedGroup",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: JSON,
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            $.each(data.result, function (indexInArray, content) {
                groupId = content.groupId
            });
            if(groupId == ''){
                location.href = "/Group"
            }else{
                $('html,body').animate({ scrollTop: 0 }, 'slow');
                $("div#choose-timeliness").hide()
                $('div#choose-first').show()
                side = 'right'
                $(".first").show()
                $("div#event-bar").css("width", "15%")
            }
        }
    });

});


//eventName
$("button#goevent").click(function (e) {
    if($("#temgroupName").val() == ""){
        $(".temerror").html("填完答案才能下一步！")
    }else{
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-temporarily").hide()
    $("div#choose-first").show()
    $("#temtext").val($("#temgroupName").val())
    $(".tem").show()
    $("div#event-bar").css("width", "30%")
    }
});


//sort
$("button#gosort").click(function (e) {
    if($("#EventName").val() == "" || $("#Description").val() == "")
    {
        $("span.firsterror").html("全部填完才能下一步！")
    }else{
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $(this).parent().parent().parent().parent().parent().hide()
    $("div#choose-sort").show()
    }
});


//date
$("button#godate").click(function (e) { 
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-sort").hide()
    $("div#choose-date").show()
});


//location
$("button#goactivity").click(function (e) {
    if($("#datetimepicker1").val() == "" || $("#datetimepicker2").val() == "" || $("#peoplemax").val() == ""){
        $("span.daterror").html("全部填完才能下一步！")
    }else{
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-date").hide()
    $("div#choose-activity").show()
    }
});


//select
$("button#goselectmod").click(function (e) {
    if($("span#gid").html() == ""){
        $("span#locerror").show()
    }else{
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-select").show()
    $("div#choose-activity").hide()
}
});

//mod

//schedule
$("button#goschedule").click(function (e) {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    if($(this).html() == "下一步"){
        $("div#choose-ticket").hide()
        for(k = 0;k < modnum.length;k++){
            if(modnum[k] == "4"){
                $("div#choose-schedule").show()
                break
            }else if(modnum[k] == "6"){
                $("div#choose-lotte").show()
                break
            }
        }
    }else if($(this).html() == "送出"){
        submitData()
        $("div#choose-finish").show()
        $("div#choose-ticket").hide()
    }
});

//lotte
$("button#golotte").click(function (e) { 
    count = 0
    st = $(".schestart")
    for(k = $(".schestart").length;k > 1;k --){
        thistime = $(".schestart").eq(k-1).val()
        thistime = thistime.split(":")
        hr = thistime[0]
        min = thistime[1]
        thattime = $(".schestart").eq(k-2).val().split(":")
        prehr = thattime[0]
        premin = thattime[1]
        if(parseInt(hr) < parseInt(prehr)){
            $(".scherror").show()
            $(".scherror").html("時間錯誤")
        }
        if(parseInt(hr) == parseInt(prehr)){
            if(parseInt(min) < parseInt(premin)){
                $(".scherror").show()
                $(".scherror").html("時間錯誤")
            }
            if(parseInt(min) >= parseInt(premin)){
                count++
            }
        }
        if(parseInt(hr) > parseInt(prehr)){
            count++
        }
    }
    if(count == $(".schestart").length-1){
        $(".scherror").hide()
        $(".scherror").html("")
            $('html,body').animate({ scrollTop: 0 }, 'slow');
            $("div#choose-schedule").hide()
            if($(this).html() == "下一步"){
                $("div#choose-lotte").show()
            }else if($(this).html() == "送出"){
                submitData()
                $("div#choose-finish").show()
            }
    }
});

$("button.justSubmit").click(function (e) { 
    submitData()
    $("#choose-lotte").hide()
    $("#choose-finish").show()
});


//selectmod or submit
$("#modorsubmit").click(function (e) {
    $("div#choose-select").hide()
    $("button#golotte").html("下一步")
    $("button#goschedule").html("下一步")
    $("button.btn-change").html("下一步")
    $("button.btn-change").addClass("btn-primary")
    $("button.btn-change").removeClass("btn-success")
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    if($(this).html() == "下一步"){
        for(k = modnum.length-1;k>=0;k--){
            if(modnum[k] == '6'){
                break
            }else if(modnum[k] == '4'){
                $("button#golotte").html("送出")
                $("button#golotte").removeClass("btn-primary")
                $("button#golotte").addClass("btn-success")
                break
            }else if(modnum[k] == '3'){
                $("button#goschedule").html("送出")
                $("button#goschedule").removeClass("btn-primary")
                $("button#goschedule").addClass("btn-success")
                break
            }
        }
    }
    if(modnum.length == 0 || modnum[0] == '1' || modnum[modnum.length-1] == '8'){
        submitData()
        $("div#choose-finish").show()
        $("div#choose-select").hide()
    }else{
        for(m = 0;m < modnum.length;m++){
            if(modnum[m] == "3"){
                $("div#choose-ticket").show() // gototicket
                break
            }else if(modnum[m] == "4"){
                $("div#choose-schedule").show() // gotoschedule
                break
            }else if(modnum[m] == "6"){
                $("div#choose-lotte").show() // gotolotte
                break
            }
        }
    }
});


//mod

//goto


//backto

//temgroup & eventname
$("button#backtochoose").click(function (e) {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-temporarily").hide()
    $("div#choose-timeliness").show()
    $(".tem").hide()
});


$("button#backside").click(function (e) { 
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    if(side == 'right'){
        //right
        side = ''
        $(".tem").hide()
        $("div#choose-timeliness").show()
        $("div#choose-first").hide()
    }else{
        //left
        side = ''
        $("div#choose-temporarily").show()
        $("div#choose-first").hide()
    }
});


//sort
$("button#backtoEvent").click(function (e) { 
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-first").show()
    $("div#choose-sort").hide()
    
});


//date
$("button#backtosort").click(function (e) { 
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-sort").show()
    $("div#choose-date").hide()
    
});


//location
$("button#backtodate").click(function (e) { 
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    $("div#choose-date").show()
    $("div#choose-activity").hide()
    
});


//selectmod
$("button#backtolocation").click(function (e) { 
    $("div#choose-activity").show()
    $("div#choose-select").hide()
});

//mod
//select
$("button#backtoselect").click(function (e) {
    $("div#choose-select").show()
    $("div#choose-ticket").hide()
});


//schedule
$("button#backtoticket").click(function (e) {
    $("div#choose-schedule").hide()
    for(i = modnum.length - 1;i >= 0;i--){
        if(modnum[i] == "3"){
            $("div#choose-ticket").show()
            break
        }else if(i == 0){
            $("div#choose-select").show()
            break
        }
    }
});

$("button#backtoschedule").click(function (e) {
    $("div#choose-lotte").hide()
    for(i = modnum.length - 1;i >= 0;i--){
        if(modnum[i] == "4"){
            $("div#choose-schedule").show()
            break
        }else if(modnum[i] == "3"){
            $("div#choose-ticket").show()
            break
        }else if(i == 0){
            $("div#choose-select").show()
            break
        }
    }
});



//mod
//backto
    //sort
    $.ajax({
        type: "GET",
        url: "http://163.18.42.222:8888/Fiestadb/Tag/select",
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            $.each(data.result, function (indexInArray, content) {
                for(i = 0;i<content.length;i++) {
                    sort = '<div class="sort-circle options">' + content[i] + '</div>'
                    $("div.choose").append(sort)
                }
            options = $(".options")
            $(".options").click(function (e) {
                if($(this).hasClass("clicked")){
                }else if(define[0].innerHTML == "請選擇<br>類別"){
                    $(this).css("background-color","#c3ddd2");
                    define[0].innerHTML = $(this).text()
                    define[0].setAttribute("class", "define-circle define")
                }else if(define[1].innerHTML == "請選擇<br>類別"){
                    $(this).css("background-color","#c3ddd2");
                    define[1].innerHTML = $(this).text()
                    define[1].setAttribute("class", "define-circle define")
                }else if(define[2].innerHTML == "請選擇<br>類別"){
                    $(this).css("background-color","#c3ddd2");
                    define[2].innerHTML = $(this).text()
                    define[2].setAttribute("class", "define-circle define")
                }else if(define[3].innerHTML == "請選擇<br>類別"){
                    $(this).css("background-color","#c3ddd2");
                    define[3].innerHTML = $(this).text()
                    define[3].setAttribute("class", "define-circle define")
                }else{
                    $.alert({
                        content: "選項滿囉！"
                    })
                }
                $(this).addClass("clicked");
            });
        });
    }
});
    //臨時群組
    $("#temgroupName").change(function (e) { 
        $("div.member-list").children().remove(".createmember")
        if($("#temgroupName").val() != ""){
            if(!$("#temgroupName").val().match(/^\s+/)){
                data = {
                    groupName: $(this).val()
                }
                $.ajax({
                    type: "POST",
                    url: "http://163.18.42.222:8888/Fiestadb/Group/FIndName",
                    data: JSON.stringify(data),
                    beforeSend:function(xhr){
                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                    },
                    contentType: "application/json",
                    datatype: JSON,
                    success: function (data) {
                        if(data.code == "005")
                        $.alert({
                            title: "喔不！",
                            content: "名稱重複了！"
                        })
                    },
                });
            }
                                        $.ajax({
                    type: "POST",
                    url: "http://163.18.42.222:8888/Fiestadb/Account/ValidateLogin",
                    beforeSend:function(xhr){
                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                    },
                    success: function (data) {
                    $.each(data.result, function (indexInArray, content) {
                        $.cookie("qsacw", content.token, { expires: 7 })
                        if(content.Address != "None"){
                        $("#temAddress").val(content.Address)    
                        }
                        if(content.Phone != "None"){
                        $("#temPhone").val(content.Phone)    
                        }
                        if(content.Mail_1 != "None"){
                        $("#temEmail").val(content.Mail_1)    
                        }
                        
                    })
                },
                });
        }
        member = '<hr class="createmember"><div class="row createmember"><div class="col-2"><div class="test"></div></div>' +
        '<div class="col-3"><h6 class="lh-3">' + "你" +'</h6></div>' +
        '</div>'
        $("div.member-list").prepend(member)
    });


    //將成員加入群組
    $(".add-group-member").click(function (e) { 
        if($("input#member").val() != ""){
            if(!$("input#member").val().match(/^\s+/))
            {
                data = {
                    Search: $("input#member").val()
                }
                $.ajax({
                    type: "POST",
                    url: "http://163.18.42.222:8888/Fiestadb/Account/Search",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    beforeSend:function(xhr){
                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                    },
                    datatype: JSON,
                    success: function (data) {
                        if(data.code == "013")
                        {
                        $.alert({
                            title: "喔不！",
                            content: "查無此會員！"
                        })
                        }else {
                            $.each(data.result, function (indexInArray, content) {
                                memberid = content.Id
                            });
                            member = '<div class="row"><div class="col-2"><div class="test"></div></div>' +
                            '<div class="col-3"><h6 class="lh-3">' + $("input#member").val() +'</h6></div>' +
                            '<div class="col-7"><button class="btn btn-danger btn-group add-group-member  del-member m-0 mt-2 p-1 float-right">' +
                            '<i class="fas fa-times"></i></button></div>' + '<span class="member-id">'
                             + memberid + '</span></div>'
                            $("div.member-list").append(member)
                            $("input#member").val("")
                            $("button.del-member").click(function (e) {
                                par = $(this).parent().parent()
                                $.confirm({
                                    title: '警告',
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    content: '確定要刪除嗎？無法恢復',
                                    buttons: {
                                        確認: {
                                            btnClass: 'btn-danger',
                                            action: function() {
                                                par.remove()
                                            }
                                        },
                                        我再想想: function() {
                                        }
                                    }
                                })
                            });
                        }
                    },
                });
            }
        }
    });

//選擇mod
$(".check-mod").change(function (e) {
    modnum = []
    for(i = 0;i < $(".check-mod").length;i++){
        if($(".check-mod").eq(i).prop("checked") == true){
            modnum.push($(".check-mod").eq(i).val())
        }
    }
    check = $(".check-mod")
    if(check.eq(1).prop("checked") == true || check.eq(2).prop("checked") == true || check.eq(4).prop("checked") == true){
        $("button#modorsubmit").html("下一步")
        $("button#modorsubmit").addClass("btn-primary")
        $("button#modorsubmit").removeClass("btn-success")
    }
    if(check.eq(1).prop("checked") == false && check.eq(2).prop("checked") == false && check.eq(4).prop("checked") == false){
        $("button#modorsubmit").html("送出")
        $("button#modorsubmit").removeClass("btn-primary")
        $("button#modorsubmit").addClass("btn-success")
    }
});

$("button.minus-ticket").click(function (e) { 
    $(this).parent().parent().remove()
});

$("button.add-ticket").click(function (e) {
    ticket = '<div class="row mt-2">' +
            '<div class="col-4"><input type="text" class="form-control ticketype" placeholder="票種"></div>'+
            '<div class="col-3"><input type="text" class="form-control ticketquan" placeholder="數量"></div>' +
            '<div class="col-3"><input type="text" class="form-control ticketprice" placeholder="價格"></div>' +
            '<div class="col-1 pl-0"><button class="btn btn-danger btn-radius-2 clear-float minus-ticket">–</button>' +
            '</div></div>'
    $("div#ticket-list").append(ticket)
    $("button.minus-ticket").click(function (e) { 
        $(this).parent().parent().remove()
    });
});
$("#datetimepicker1").click(function (e) { 
    $("#ui-datepicker-div").css("z-index", 10)
    
});

$(".minus-lotte").click(function (e) { 
    $(this).parent().parent().remove()
});

$("button.add-lotte").click(function (e) { 
    lottelist = '<div class="row mt-2 mb-2">' +
                '<div class="col"><input class="form-control lottename" type="text" placeholder="獎項"></div>' +
                '<div class="col-1"><button class="btn btn-danger btn-radius-2 clear-float minus-lotte">–</button></div></div>'
    $("#lottelist").append(lottelist)
    $(".minus-lotte").click(function (e) { 
        $(this).parent().parent().remove()
    });
});

$(".define").click(function (e) {
    name = $(this).html()
    $.each(options, function (index, value) {
        if(name == $(this).html())
        {
            $(this).css("background", "")
            $(this).removeClass("clicked")
        }
    });
    $(this).html("請選擇<br>類別")
    $(this).addClass("sort-circle");
    $(this).removeClass("define-circle");
});
$("button.minus-schedule").click(function (e) { 
    $(this).parent().parent().remove()
});

$("button.add-schedule").click(function (e) { 
    schedulelist = '<div class="row mb-2 rc-2">' +
            '<div class="col-3"><input type="text" class="form-control schetitle" placeholder="時段主題"></div>'+
            '<div class="col-4"><input type="text" class="form-control schedetail" placeholder="說明"></div>'+
            '<div class="col-3 pr-0"><input type="text" class="datetimepicker3 form-control schestart"'+
            'placeholder="開始時間"></div><div class="col-1 mt-2"><button class="btn btn-danger btn-radius-2 clear-float minus-schedule">–</button></div></div>'
    $(".schedulelist").append(schedulelist)
    var o={
        timeOnlyShowDate: true,
        timeFormat: 'HH:mm',
        dateFormat: ''
    }
    $('.datetimepicker3').timepicker(o)
    $("button.minus-schedule").click(function (e) { 
        $(this).parent().parent().remove()
    });
});

function submitData() {
    de = $(".define").eq(0).text()
    for( var i = 1; i < $(".define").length; i++) {
        if($(".define").eq(i).text() != '請選擇類別'){
            de = de + ',' + ($(".define").eq(i).text());
        }
    }

    var startTime = $('#datetimepicker1').datepicker('getDate');
    var endTime = $('#datetimepicker2').datepicker('getDate');


    //startTime
    if(startTime.getHours() < 10){
        b = '0' + startTime.getHours().toString()
    }else{
        b = startTime.getHours()
    }
    if(startTime.getMinutes() < 10){
        c = '0' + startTime.getMinutes().toString()
    }else{
        c = startTime.getMinutes()
    }
    startTime = $.datepicker.formatDate("yy-mm-dd", startTime) + " " + b + ":" + c + ":00"

    //endTime
    if(endTime.getHours() < 10){
        b = '0' + endTime.getHours().toString()
    }else{
        b = endTime.getHours()
    }
    if(endTime.getMinutes() < 10){
        c = '0' + endTime.getMinutes().toString()
    }else{
        c = endTime.getMinutes()
    }
    endTime = $.datepicker.formatDate("yy-mm-dd", endTime) + " " + b + ":" + c + ":00"


    //chooseleft
    if(side == 'left'){
        Id = parseInt($.cookie("Id"))
        data = {
            authId: [Id],
            groupName: $("#temgroupName").val(),
            Address: $("#temAddress").val(),
            Mail: $("#temEmail").val(),
            Phone: $("#temPhone").val(),
            Useable: "true",
            deadline: endTime
        }
        $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/Group/upload",
            data: JSON.stringify(data),
            contentType: "application/json",
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            datatype: JSON,
            success: function (data) {
                console.log(data)
                $.each(data.result, function (indexInArray, content) {
                    temId = content.groupId
                    temmemberid = $('span.member-id').html()
                    if(temmemberid != undefined){
                    for(i = 0;i < temmemberid.length;i++){
                        data = {
                            authId: temmemberid[i],
                            groupId: temId
                        }
                        $.ajax({
                            type: "POST",
                            url: "http://163.18.42.222:8888/Fiestadb/Group/Member/upload",
                            data: JSON.stringify(data),
                            contentType: "application/json",
                            beforeSend:function(xhr){
                                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                            },
                            datatype: JSON,
                            success: function (response) {
                            },
                            error: function(reason) {
                                alert('error: ' + reason);
                            }
                        });
                    }
                    }
                    left(temId, startTime, endTime)
                });
            }
        });
    }
    //ajax
    //right
        //chooseright

    if(side == 'right'){
        b = $("span#gid").html().split(",")
        a = b[0].split("(")
        lat = a[1]
        a = b[1].split(")")
        a = a[0].split(" ")
        long = a[1]
        mod = modnum[0]
        for(i = 1;i < modnum.length;i++){
            mod = mod + ',' + modnum[i]
        }
        for(i=0;i<$("select#groupSelect option").length;i++){
            if($("select#groupSelect option").eq(i).val() == $("#groupSelect").val()){
                Id = $("span.id").eq(i).html()
            }
        }
        data = {
            act_Name: $("#EventName").val(),
            Tag: de,
            groupId: Id,
            startTime: startTime,
            endTime: endTime,
            act_Status: "true",
            Useable: "true",
            act_Description: $("#Description").val(),
            joinedCount: "0",
            peopleMaxium: $("#peoplemax").val(),
            Models: mod,
            Latitude: lat,
            Longitude: long

        }
        $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/Activity/upload",
            data: JSON.stringify(data),
            contentType: "application/json",
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            datatype: JSON,
            success: function (data) {
                    for(z = modnum.length-1;z>=0;z--){
                        if(modnum[z] == "1"){
                            $("h7.finish-title").html("Finish!")
                        }
                    }
                    if(modnum.length == 0){
                        $("h7.finish-title").html("Finish!")
                    }
                    var file_data = $('#file').prop('files')[0]
                    var form_data = new FormData();
                    form_data.append('file', file_data);
                    $.each(data.result, function (indexInArray, content) { 
                        act_Id = content.act_Id
                   });
                    $.ajax({
                        type: "POST",
                        contentType: false,
                        processData: false,
                        async: false,
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        enctype: 'multipart/form-data',
                        url: "http://163.18.42.222:8888//Fiestadb/uploadImage?type=act&Id=" + act_Id,
                        data: form_data,
                        success: function (data) {
                            for(z = modnum.length-1;z>=0;z--){
                                if(modnum[z] == "1"){
                                    $("h7.finish-title").html("Finish!")
                                }
                            }
                            if(modnum.length == 0){
                                $("h7.finish-title").html("Finish!")
                            }
                        }
                    });
                for(i = 0;i < modnum.length;i++){
                    if(modnum[i] == '3'){
                        ticketype = $("input.ticketype")
                        ticketquan = $("input.ticketquan")
                        ticketprice = $("input.ticketprice")
                        for(k = 0;k < ticketype.length;k++){
                            data_3 = {
                                act_Id: act_Id,
                                ticketKinds: ticketype.eq(k).val(),
                                Mounts: parseInt(ticketquan.eq(k).val()),
                                Remainder: parseInt(ticketquan.eq(k).val()),
                                Price: parseInt(ticketprice.eq(k).val()),
                                Useable: "true"
                            }
                                $.ajax({
                                    type: "POST",
                                    async: false,
                                    url: "http://163.18.42.222:8888/Fiestadb/Ticket/upload",
                                    data: JSON.stringify(data_3),
                                    contentType: "application/json",
                                    beforeSend:function(xhr){
                                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                                    },
                                    datatype: JSON,
                                    success: function (data) {
                                        for(z = modnum.length-1;z>=0;z--){
                                            if(modnum[z] == "6" || modnum[z] == "4"){
                                            }else if(modnum[z] == "3"){
                                                $("h7.finish-title").html("Finish!")
                                            }
                                        }
                                    }
                                });
                        }
                    }else if(modnum[i] == '4'){
                        date = startTime.split(" ")
                        schetitle = $(".schetitle")
                        schestart = $(".schestart")
                        schedetail = $(".schedetail")
                        for(k = 0;k < schestart.length;k++){
                            schest = date[0] + schestart.eq(k).val() + ':00'
                            data_4 = {
                                act_Id: act_Id,
                                showTime: schest,
                                Detail: schedetail.eq(k).val(),
                                showStatus: "true",
                                Useable: "true",
                                showName: schetitle.eq(k).val()
                            }
                            $.ajax({
                                type: "POST",
                                url: "http://163.18.42.222:8888/Fiestadb/Show/upload",
                                data: JSON.stringify(data_4),
                                async: false,
                                contentType: "application/json",
                                beforeSend:function(xhr){
                                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                                },
                                datatype: JSON,
                                success: function (data) {
                                        for(z = modnum.length-1;z>=0;z--){
                                            if(modnum[z] == "6"){
                                            }else if(modnum[z] == "4"){
                                                $("h7.finish-title").html("Finish!")
                                            }
                                        }
                                }
                            });
                        }
                    }else if(modnum[i] == '6'){
                        lottename = $(".lottename")
                        lottenum = $(".lottenum")
                        for(k = 0;k < lottename.length;k++){
                            for(l = 0;l < lottenum.val();l++){
                            data_6 = {
                                act_Id: act_Id,
                                Prize: lottename.eq(k).val(),
                                Useable: "true"
                            }
                                $.ajax({
                                    type: "POST",
                                    async: false,
                                    url: "http://163.18.42.222:8888/Fiestadb/Lotte/upload",
                                    data: JSON.stringify(data_6),
                                    contentType: "application/json",
                                    beforeSend:function(xhr){
                                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                                    },
                                    datatype: JSON,
                                    success: function (data) {
                                        $("h7.finish-title").html("Finish!")
                                    }
                                });
                            }
                        }
                    }
                }
            }
        });
}
}


function left(temId, startTime, endTime) {
    act_Id = ''
    countmod = 0
    mod = modnum[0]
    for(i = 1;i < modnum.length;i++){
        mod = mod + ',' + modnum[i]
    }
    de = $(".define").eq(0).text()
    for( var i = 1; i < $(".define").length; i++) {
        if($(".define").eq(i).text() != '請選擇類別'){
            de = de + ',' + ($(".define").eq(i).text());
        }
    }
    b = $("span#gid").html().split(",")
    a = b[0].split("(")
    d = a[1]
    c = b[1].split(")")
    e = c[0].split(" ")
    f = e[1]
    data = {
        act_Name: $("#EventName").val(),
        Tag: de,
        groupId: temId.toString(),
        startTime: startTime,
        endTime: endTime,
        act_Status: "true",
        Useable: "true",
        act_Description: $("#Description").val(),
        joinedCount: 0,
        peopleMaxium: parseInt($("#peoplemax").val()),
        Models: mod,
        Latitude: d,
        Longitude: f,
        viewStatus: "true"

    }
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Activity/upload",
        data: JSON.stringify(data),
        contentType: "application/json",
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        datatype: JSON,
        success: function (data) {
            console.log(data)
            for(z = modnum.length-1;z>=0;z--){
                if(modnum[z] == "6"){
                    }else if(modnum[z] == "4"){
                    }else if(modnum[z] == "3"){
                    }else if(modnum[z] == "1"){
                        $("h7.finish-title").html("Finish!")
                    }
                }
                if(modnum.length == 0){
                    $("h7.finish-title").html("Finish!")
                }
            $.each(data.result, function (indexInArray, content) { 
                 act_Id = content.act_Id
            });
                var file_data = $('#file').prop('files')[0]
                var form_data = new FormData();
                form_data.append('file', file_data);
            $.ajax({
                type: "POST",
                contentType: false,
                processData: false,
                async: false,
                beforeSend:function(xhr){
                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                },
                enctype: 'multipart/form-data',
                url: "http://163.18.42.222:8888//Fiestadb/uploadImage?type=act&Id=" + act_Id,
                data: form_data,
                success: function (data) {
                    for(z = modnum.length-1;z>=0;z--){
                        if(modnum[z] == "6"){
                            countmod++
                        }else if(modnum[z] == "4"){


                        }else if(modnum[z] == "3"){

                        }else if(modnum[z] == "1"){
                            $("h7.finish-title").html("Finish!")
                        }
                    }
                    if(modnum.length == 0){
                        $("h7.finish-title").html("Finish!")
                    }
                }
            });
            for(i = 0;i < modnum.length;i++){
                if(modnum[i] == '3'){
                    ticketype = $("input.ticketype")
                    ticketquan = $("input.ticketquan")
                    ticketprice = $("input.ticketprice")
                    for(k = 0;k < ticketype.length;k++){
                        data_3 = {
                            act_Id: act_Id,
                            ticketKinds: ticketype.eq(k).val(),
                            Mounts: parseInt(ticketquan.eq(k).val()),
                            Remainder: parseInt(ticketquan.eq(k).val()),
                            Price: parseInt(ticketprice.eq(k).val()),
                            Useable: "true"
                        }
                            $.ajax({
                                type: "POST",
                                async: false,
                                url: "http://163.18.42.222:8888/Fiestadb/Ticket/upload",
                                data: JSON.stringify(data_3),
                                contentType: "application/json",
                                beforeSend:function(xhr){
                                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                                },
                                datatype: JSON,
                                success: function (data) {
                                    console.log(data)
                                    for(z = modnum.length-1;z>=0;z--){
                                        if(modnum[z] == "6"){

                                        }else if(modnum[z] == "4"){

                                        }else if(modnum[z] == "3"){
                                            $("h7.finish-title").html("Finish!")
                                        }
                                    }
                                }
                            });
                    }
                }else if(modnum[i] == '4'){
                    date = startTime.split(" ")
                    schetitle = $(".schetitle")
                    schestart = $(".schestart")
                    schedetail = $(".schedetail")
                    for(k = 0;k < schestart.length;k++){
                        schest = date[0] + schestart.eq(k).val() + ':00'
                        data_4 = {
                            act_Id: act_Id,
                            showTime: schest,
                            Detail: schedetail.eq(k).val(),
                            showStatus: "true",
                            Useable: "true",
                            showName: schetitle.eq(k).val()
                        }
                        $.ajax({
                            type: "POST",
                            url: "http://163.18.42.222:8888/Fiestadb/Show/upload",
                            data: JSON.stringify(data_4),
                            async: false,
                            contentType: "application/json",
                            beforeSend:function(xhr){
                                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                            },
                            datatype: JSON,
                            success: function (data) {
                                    for(z = modnum.length-1;z>=0;z--){
                                        if(modnum[z] == "6"){

                                        }else if(modnum[z] == "4"){
                                            $("h7.finish-title").html("Finish!")
                                        }
                                    }
                            }
                        });
                    }
                }else if(modnum[i] == '6'){
                    lottename = $(".lottename")
                    for(k = 0;k < lottename.length;k++){
                        data_6 = {
                            act_Id: act_Id,
                            Prize: lottename.eq(k).val(),
                            Useable: "true"
                        }
                            $.ajax({
                                type: "POST",
                                async: false,
                                url: "http://163.18.42.222:8888/Fiestadb/Lotte/upload",
                                data: JSON.stringify(data_6),
                                contentType: "application/json",
                                beforeSend:function(xhr){
                                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                                },
                                datatype: JSON,
                                success: function (data) {
                                    $("h7.finish-title").html("Finish!")
                                }
                            });
                    }
                }
            }
        }
    });;
}
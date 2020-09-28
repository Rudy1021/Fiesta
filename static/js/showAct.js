$(document).ready(function () {
    a = "一般票"
    console.log(a.charCodeAt())
    console.log(String.fromCharCode(a))
    tickind = ''
    modnum = []
    D = new Date()
    DY = D.getFullYear()
    DM = D.getMonth() + 1
    DD = D.getDate()
    Dh = D.getHours()
    Dm = D.getMinutes()
    five = ''
    eight = ''
    data_Select = {
        Id: $.cookie("acid")
    }
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Activity/select",
        data: JSON.stringify(data_Select),
        async: false,
        contentType: "application/json",
        datatype: JSON,
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            $.each(data.result, function (indexInArray, content) {
                peopleId =  content.joinedAuth
                joinedCount = parseInt(content.joinedCount)
                peopleMaxium = parseInt(content.peopleMaxium)
                tagname = content.Tag
                $("div#act_Description").html(content.act_Description)
                $("h5#title").html(content.act_Name)
                $("h6#startTime").html($("h6#startTime").html() + content.startTime)
                $("h6#endTime").html($("h6#endTime").html() + content.endTime)
                $("#act-img").prop("src", content.Photo)
                mod = content.Models
                mod = mod.split(",")
            });
            if(joinedCount == peopleMaxium){
                $(".btn").prop("disabled", "disabled")
                $(".btn").html("已額滿")
            }
            for(i = 0;i < peopleId.length;i ++){
                if($.cookie("Id") == peopleId[i]){
                $(".btn").prop("disabled", "disabled")
                $(".btn").html("已加入")
                }
            }
            for(j = 0;j < tagname.length;j++){
                tag = '<div class="act-tag"># ' + tagname[j] +'</div>'
                $("#taglist").append(tag)
            }
            for(i = 0;i < mod.length;i++){
                if(mod[i] == '3'){
                    $(".join-btn").hide()
                    data_SelectByAct = {
                        act_Id: $.cookie("acid")
                    }
                    $.ajax({
                        type: "POST",
                        url: "http://163.18.42.222:8888/Fiestadb/Ticket/SelectByAct",
                        data: JSON.stringify(data_SelectByAct),
                        contentType: "application/json",
                        datatype: JSON,
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        success: function (data_Ticket) {
                            for (var i = 0, l = data_Ticket.result.length; i < l; i++) { //這邊的i是指目前算到第幾個json
                                for (var key in data_Ticket.result[i]) {
                                    if(key == "ticketKinds"){
                                        ticketkind = data_Ticket.result[i][key]
                                    }
                                    if(key == "Remainder"){
                                        ticketmount = data_Ticket.result[i][key]
                                    }
                                    if(key == "Price")
                                    {
                                        ticketprice = data_Ticket.result[i][key]
                                    }
                                }
                                ticketlist = '<div class="row"><div class="col lh-3 text-center">' + ticketkind +
                                '</div><div class="col lh-3 text-center" id="ticketprice' + i + '">NT.' + ticketprice + '</div>' +
                                '<div class="col lh-3 text-center" id="ticketquan' + i + '">' + ticketmount + "張" +
                                '</div><div class="col pt-2 text-center"><button class="btn btn-success mt-0 ticketsub testemail" type="button" id="ticketind' + i + 
                                '">購票</button></div></div>'
                                $("#ticketist").append(ticketlist)
                            }
                        }
                    });
                    break
                }else if(mod[i] == '4'){
                    data_Schedule = {
                        act_Id: $.cookie("acid")
                    }
                    $.ajax({
                        type: "POST",
                        url: "http://163.18.42.222:8888/Fiestadb/Show/select",
                        data: JSON.stringify(data_Schedule),
                        contentType: "application/json",
                        datatype: JSON,
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        success: function (data) {
                            console.log(data)
                            for (var i = 0, l = data.result.length; i < l; i++) { //這邊的i是指目前算到第幾個json
                                for (var key in data.result[i]) {
                                    if(key == "showTime"){
                                        time = data.result[i][key]
                                        time = time.split(" ")
                                        time = time[1]
                                    }
                                    if(key == "showName"){
                                        name = data.result[i][key]
                                    }
                                    if(key == "Detail"){
                                        detail = data.result[i][key]
                                    }
                                }
                                list = '<div class="accordion" id="accordionExample"><a data-toggle="collapse" data-target="#collapse' +
                                i + '" aria-expanded="true" aria-controls="collapse' + i + '"><div class="now-time"><span class="ml-3"></span>' +
                                '<span class="ml-3">' +  time + '</span><span class="ml-3">' + name + '</span></div></a>' +
                                '<div id="collapse' + i + '" class="collapse" aria-labelledby="heading' + i + '" data-parent="#accordionExample">' +
                                '<div class="card-body"><span class="p-1 dripicons dripicons-information"></span>' + detail +
                                '</div></div></div>'
                                $(".schelist").append(list)
                            }
                        }
                    });
                    $("#real-time").show()
                    break

                }else if(mod[i] == '5'){
                    start = $("input.startTime").val()
                    if(!$("div#act-question").is(":visible")){
                        if(parseInt(end.substr(0, 4)) - parseInt(start.substr(0, 4)) > parseInt(end.substr(0, 4)) - DY){
                            $("div#actmain").hide()
                            $("div#real-time").show()
                        }else if(parseInt(end.substr(0, 4)) - parseInt(start.substr(0, 4)) == parseInt(end.substr(0, 4)) - DY){
                            if(parseInt(end.substr(5, 2)) - parseInt(start.substr(5, 2)) > parseInt(end.substr(5, 2)) - DM){
                                $("div#actmain").hide()
                                $("div#real-time").show()
                            }else if(parseInt(end.substr(5, 2)) - parseInt(start.substr(5, 2)) == parseInt(end.substr(5, 2)) - DM){
                                if(parseInt(end.substr(8, 2)) - parseInt(start.substr(8, 2)) > parseInt(end.substr(8, 2)) - DD){
                                    $("div#actmain").hide()
                                    $("div#real-time").show()
                                }else if(parseInt(end.substr(8, 2)) - parseInt(start.substr(8, 2)) == parseInt(end.substr(8, 2)) - DD){
                                    if(parseInt(end.substr(11, 2)) - parseInt(start.substr(11, 2)) > parseInt(end.substr(11, 2)) - Dh){
                                        $("div#actmain").hide()
                                        $("div#real-time").show()
                                    }else if(parseInt(end.substr(11, 2)) - parseInt(start.substr(11, 2)) == parseInt(end.substr(11, 2)) - Dh){
                                        if(parseInt(end.substr(14, 2)) - parseInt(start.substr(14, 2)) >= parseInt(end.substr(14, 2)) - Dm){
                                            $("div#actmain").hide()
                                            $("div#real-time").show()
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break
                }else if(mod[i] == '6'){
                    $("#lotte-user").show()
                    break
                }else if(mod[i] == '8'){
                    end = $("input.endTime").val()
                    if(DY > parseInt(end.substr(0, 4))){
                        $("div#actmain").hide()
                        $(".quest").show()
                    }else if(DY == parseInt(end.substr(0, 4))){
                        if(DM > parseInt(end.substr(5, 2))){
                            $("div#actmain").hide()
                            $(".quest").show()
                        }else if(DM == parseInt(end.substr(5, 2))){
                            if(DD > parseInt(end.substr(8, 2))){
                                $("div#actmain").hide()
                                $(".quest").show()
                            }else if(DD == parseInt(end.substr(8, 2))){
                                if(Dh > parseInt(end.substr(11, 2))){
                                    $("div#actmain").hide()
                                    $(".quest").show()
                                }else if(Dh == parseInt(end.substr(11, 2))){
                                    if(Dm >= parseInt(end.substr(14, 2))){
                                        $("div#actmain").hide()
                                        $(".quest").show()
                                    }
                                }
                            }
                        }
                    }
                    break
                }
            }
        }
    });
    $("#QRCODE").click(function (e) {
        data = {
            Input: location.href
        }
        $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/QRcode",
            data: JSON.stringify(data),
            contentType: "application/json",
            datatype: JSON,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            success: function (data) {
                download("qrcode", data)
                function download(filename, text) {
                    var pom = document.createElement('a');
                    pom.setAttribute('href', 'data:image/png;base64,' + text);
                    pom.setAttribute('download', filename);
                    if (document.createEvent) {
                        var event = document.createEvent('MouseEvents');
                        event.initEvent('click', true, true);
                        pom.dispatchEvent(event);
                    }
                    else {
                        pom.click();
                    }
                }
            }
        });
    });
    $("#submitques").click(function (e) {
        var Today=new Date();
        Today =  Today.getFullYear() + "-" + (Today.getMonth()+1) + "-" + Today.getDate()
        for(i = 0;i < 5;i++){
            if($(".All").eq(i).prop("checked")){
                all = $(".All").eq(i).val()
            }
            if($(".Money").eq(i).prop("checked")){
                mon = $(".Money").eq(i).val()
            }
            if($(".Audio").eq(i).prop("checked")){
                aud = $(".Audio").eq(i).val()
            }
            if($(".liu").eq(i).prop("checked")){
                liu = $(".liu").eq(i).val()
            }
            if($(".mood").eq(i).prop("checked")){
                mood = $(".mood").eq(i).val()
            }
            if($(".light").eq(i).prop("checked")){
                light = $(".light").eq(i).val()
            }
            if($(".move").eq(i).prop("checked")){
                move = $(".move").eq(i).val()
            }
            if($(".loc").eq(i).prop("checked")){
                loc = $(".loc").eq(i).val()
            }
            if($(".staff").eq(i).prop("checked")){
                staff = $(".staff").eq(i).val()
            }
        }
        data = {
            act_Id: $.cookie("acid"),
            authId: $.cookie("Id"),
            score_Date: Today,
            Stars: parseInt(all),
            Price: parseInt(mon),
            Music: parseInt(aud),
            Flow: parseInt(move),
            Vibe: parseInt(mood),
            Light: parseInt(light),
            Moveline: 5,
            Site: parseInt(loc),
            Staff: parseInt(staff),
            Useable: "true"
        }
        $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/FeedBack/Score/Act/upload",
            data: JSON.stringify(data),
            async: false,
            contentType: "application/json",
            datatype: JSON,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            success: function (data) {
                $(".showAct2").show()
                $("#act-question").hide()
                $("#real-time").hide()
            }
        });
    });
    $(".tick-sub").click(function (e) {
        if($.cookie('kind')){
            data = {
                act_Id: $.cookie("acid"),
                authId: $.cookie("Id"),
                ticketKinds: $.cookie('kind'),
                Notes: $("#Remark").val()
            }
        }else{
            data = {
                act_Id: $.cookie("acid"),
                authId: $.cookie("Id"),
                Notes: $("#Remark").val()
            }
        }
        $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/Activity/setJoinedList",
            data: JSON.stringify(data),
            contentType: "application/json",
            datatype: JSON,
            async:false,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            success: function (data) {
                if(data.code == "018"){
                    $.confirm({
                        title: '警告',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '已經加入此活動',
                        buttons: {
                            確定: {
                                btnClass: 'btn-success',
                                action: function() {
                                }
                            }
                        }
                    })
                }else if(data.code == "020"){
                    $.confirm({
                        title: '警告',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '尚未驗證此會員',
                        buttons: {
                            確定: {
                                btnClass: 'btn-success',
                                action: function() {
                                    location.href = "/MyProfile"
                                }
                            }
                        }
                    })
                }else if(data.code == "019"){
                    $.confirm({
                        title: '錯誤',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '憑證過期，請重新登入',
                        buttons: {
                            確定: {
                                btnClass: 'btn-success',
                                action: function() {
                                    $("#logout").click()
                                }
                            }
                        }
                    })
                }else if(data.code == "001"){
                    $.confirm({
                        title: '成功',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '報名成功！',
                        buttons: {
                            確定: {
                                btnClass: 'btn-success confirm',
                                action: function() {
                                }
                            }
                        }
                    })
                    $("button.join-btn").html("已加入").prop("disabled", "disabled")
                    $(".ticket").html("已加入").prop("disabled", "disabled")
                }else {
                    $.confirm({
                        title: '失敗',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '未知錯誤！ 請稍後再試！',
                        buttons: {
                            確定: {
                                btnClass: 'btn-success',
                                action: function() {
                                    location.reload()
                                }
                            }
                        }
                    })
                }
            }
        });
        $.removeCookie('kind');
        $(".close-sub").click()
    });
});
$(document).on('click', '.ticketsub', function () {
    $.cookie('kind', $(this).parent().prev().prev().prev().html())
    $(".join-btn").click()
});
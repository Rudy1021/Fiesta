$(document).ready(function () {
    inputarray = []
    var o={
        timeFormat: 'HH:mm',
        dateFormat: ''
    }
    dataSelect = {
        Id: $.cookie("actid")
      }
    $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/Activity/select",
        data: JSON.stringify(dataSelect),
        contentType: "application/json",
        async:false,
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            $.each(data.result, function (indexInArray, content){ 
                mod = content.Models
                startTime = content.startTime
            });
            mod = mod.split(",")
            for(i = 0;i < mod.length;i++){
                for(k = 0;k < $(".check-mod").length;k++){
                    if(mod[i] == $(".check-mod").eq(k).val()){
                        $(".check-mod[value=" + mod[i] + "]").prop("checked", "checked")
                        if(mod[i] == '3'){
                            $(".closeticket").remove()
                            data_SelectByAct = {
                                act_Id: $.cookie("actid")
                            }
                            $.ajax({
                                type: "POST",
                                url: "http://163.18.42.222:8888/Fiestadb/Ticket/SelectByAct",
                                data: JSON.stringify(data_SelectByAct),
                                contentType: "application/json",
                                beforeSend:function(xhr){
                                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                                },
                                datatype: JSON,
                                success: function (data) {
                                    console.log(data)
                                    if(data.code != "013"){
                                        for (var i = 0, l = data.result.length; i < l; i++) {
                                            ticket = '<div class="row"><span class="ticketid"></span><div class="col-5"><input type="text" class="form-control ticketype" placeholder="票券名稱" disabled></div>' +
                                                '<div class="col-3"><input type="text" class="form-control ticketquan" placeholder="數量" disabled></div>' +
                                                '<div class="col-3"><input type="text" class="form-control ticketprice" placeholder="價格" disabled></div>' +
                                                '<div class="col-1"><button class="btn btn-danger btn-up btn-circle btn-sm del-ticket"><i class="fas fa-minus"></i></button></div></div>'
                                            $(".ticketlist").append(ticket)
                                            ticketype = $(".ticketype")
                                            ticketquan = $(".ticketquan")
                                            ticketprice = $(".ticketprice")
                                            ticketid = $(".ticketid")
                                            for (var key in data.result[i]) {
                                                if(key == "ticketKinds"){
                                                    ticketype.eq(i).val(data.result[i][key])
                                                }else if(key == "Remainder"){
                                                    ticketquan.eq(i).val(data.result[i][key])
                                                }else if(key == "Price"){
                                                    ticketprice.eq(i).val(data.result[i][key])
                                                }else if(key == "Id"){
                                                    ticketid.eq(i).html(data.result[i][key])
                                                }
                                            }
                                        }
                                    }else{
                                        ticket = '<div class="row"><div class="col-5"><input type="text" class="form-control ticketype" placeholder="票券名稱"></div>' +
                                        '<div class="col-3"><input type="text" class="form-control ticketquan" placeholder="數量"></div>' +
                                        '<div class="col-3"><input type="text" class="form-control ticketprice" placeholder="價格"></div>' +
                                        '<div class="col-1"><button class="btn btn-danger btn-up btn-circle btn-sm del-ticket"><i class="fas fa-minus"></i></button></div></div>'
                                    $(".ticketlist").append(ticket)
                                    $(".ticketlist").prev().children(".dropdown").children(".dropdown-menu").children(".to-edit").click()
                                    }
                                }
                            });
                        }else if(mod[i] == '4'){
                            $(".closeschedule").remove()
                            data_SelectShow = {
                                act_Id: $.cookie("actid")
                            }
                                $.ajax({
                                    type: "POST",
                                    url: "http://163.18.42.222:8888/Fiestadb/Show/select",
                                    data: JSON.stringify(data_SelectShow),
                                    contentType: "application/json",
                                    beforeSend:function(xhr){
                                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                                    },
                                    datatype: JSON,
                                    success: function (data) {
                                        if(data.code != "013"){
                                            for (var i = 0, l = data.result.length; i < l; i++) {
                                                schedulelist = '<div class="row"><span class="scheduleid"></span><div class="col-3"><input type="text" class="form-control showName" placeholder="時段主題" disabled></div>' +
                                                    '<div class="col"><input type="text" class="form-control Detail" placeholder="說明" disabled></div>' +
                                                    '<div class="col-3"><input type="text" class="form-control datetimepicker3 showTime" placeholder="開始時間" disabled></div>' +
                                                    '<div class="col-1"><button class="btn btn-danger btn-up btn-circle btn-sm del-schedule"><i class="fas fa-minus"></i></button></div></div>'
                                                $(".schedulelist").append(schedulelist)
                                                showName = $(".showName")
                                                Detail = $(".Detail")
                                                scheduleid = $(".scheduleid")
                                                showTime = $(".showTime")
                                                for (var key in data.result[i]) {
                                                    if(key == "showName"){
                                                        showName.eq(i).val(data.result[i][key])
                                                    }
                                                    if(key == "Detail"){
                                                        Detail.eq(i).val(data.result[i][key])
                                                    }
                                                    if(key == "showTime"){
                                                        time = data.result[i][key]
                                                        time = time.split(" ")
                                                        showTime.eq(i).val(time[1])
                                                    }
                                                    if(key == "Id"){
                                                        scheduleid.eq(i).html(data.result[i][key])
                                                    }
                                                }
                                            }
                                        }else{
                                            schedulelist = '<div class="row"><div class="col-3"><input type="text" class="form-control showName" placeholder="時段主題" disabled></div>' +
                                            '<div class="col"><input type="text" class="form-control Detail" placeholder="說明" disabled></div>' +
                                            '<div class="col-3"><input type="text" class="form-control showTime" placeholder="開始時間" disabled></div>' +
                                            '<div class="col-1"><button class="btn btn-danger btn-up btn-circle btn-sm del-schedule"><i class="fas fa-minus"></i></button></div></div>'
                                            $(".schedulelist").append(schedulelist)
                                            $(".schedulelist").prev().children(".dropdown").children(".dropdown-menu").children(".to-edit").click()
                                        }
                                        $('.showTime').timepicker(o)
                                    }
                                });

                        }else if(mod[i] == '6'){
                            $(".closelotte").remove()
                            data_lotte = {
                                act_Id: $.cookie("actid")
                            }
                            $.ajax({
                                type: "POST",
                                url: "http://163.18.42.222:8888/Fiestadb/Lotte/select",
                                data: JSON.stringify(data_lotte),
                                contentType: "application/json",
                                beforeSend:function(xhr){
                                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                                },
                                datatype: JSON,
                                success: function (data_lotte) {
                                    if(data_lotte.code != "013"){
                                        LN = $(".lottename")
                                        Lid = $(".lotteid")
                                        for (var i = 0, l = data_lotte.result.length; i < l; i++) {
                                            lottelist = '<div class="row"><span class="lotteid"></span>' +
                                                '<div class="col"><input type="text" class="form-control lottename" placeholder="獎項" disabled></div>' +
                                                '<div class="col-1"><button class="btn btn-danger btn-up btn-circle btn-sm del-lotte"><i class="fas fa-minus"></i></button></div></div>'
                                            $(".lottelist").append(lottelist)
                                            lottename = $(".lottename")
                                            lotteid = $(".lotteid")
                                            for (var key in data_lotte.result[i]) {
                                                if(key == "Prize"){
                                                    lottename.eq(i).val(data_lotte.result[i][key])
                                                }
                                                if(key == "Id"){
                                                    lotteid.eq(i).html(data_lotte.result[i][key])
                                                }
                                            }
                                        }
                                    }else{
                                            lottelist = '<div class="row">' +
                                            '<div class="col"><input type="text" class="form-control lottename" placeholder="獎項" disabled></div>' +
                                            '<div class="col-1"><button class="btn btn-danger btn-up btn-circle btn-sm del-lotte"><i class="fas fa-minus"></i></button></div></div>'
                                        $(".lottelist").append(lottelist)
                                        $(".lottelist").prev().children(".dropdown").children(".dropdown-menu").children(".to-edit").click()
                                    }
                                }
                            });
                        }
                    }
                }
            }
        }
    });


    $(".to-edit").on('click', function () {
        if($(this).parent().parent().parent().next().hasClass("modlist")){
            $(this).parent().parent().parent().next().children(".row").children().children().children("input").removeAttr("disabled")
            $(this).parent().parent().parent().next().children(".text-center").show()
        }else{
            inputarray.length = 0
            if($(this).parent().parent().parent().next().children("span").length < 1){
                if($(this).parent().parent().parent().next().children(".btn-area").length < 1){
                    $(this).parent().parent().parent().next().children(".row").children().children("input").removeAttr("disabled")
                    allinput = $(this).parent().parent().parent().next().children(".row").children().children("input")
                    $.each(allinput, function () {
                         inputarray.push($(this).val())
                    });
                    $(this).parent().parent().parent().next().append('<div class="text-center mt-2 btn-area"><button class="btn btn-dark cancel-edit">取消</button>　<button class="btn btn-primary btn-main save">儲存</button></div>')
                }
            }
        }
    });
    $(document).on('click', ".cancel-edit", function () {
        $.confirm({
            title: '警告',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '確定取消嗎？',
            buttons: {
                確定: {
                    btnClass: 'btn-danger',
                    action: function() {
                        location.reload()
                    }
                },
                我再想想: function() {
                }
            }
        })
    });


    $(document).on('click', '.save', function () {
        if($(this).parent().parent().hasClass("modlist")){
            modstr = ''
            modlist = $(this).parent().parent().children(".row").children().children().children("input")
            $.each(modlist, function () {
                if($(this).prop("checked")){
                    modstr = modstr  + $(this).val() + ','
                }
            });
            modstr = modstr.substring(modstr, modstr.length-1)
            data_update_mod = {
                act_Id: $.cookie("actid"),
                Models: modstr
            }
            $.ajax({
                type: "POST",
                url: "http://163.18.42.222:8888/Fiestadb/Activity/update",
                data: JSON.stringify(data_update_mod),
                async:false,
                beforeSend:function(xhr){
                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                },
                contentType: "application/json",
                datatype: JSON,
                success: function (response) {
                    console.log(response)
                    location.reload()
                }
            });
        }else if($(this).parent().parent().hasClass("schedulelist")){
            startTime = startTime.split(" ")
            schedulelist =  $(this).parent().parent().children(".row")
            schedulehasid = schedulelist.has("span.scheduleid")
            schedulenotid = schedulelist.not(schedulelist.has("span.scheduleid"))
            input = $(schedulehasid).children().children("input")
            idlist = schedulelist.children("span")
            for(i = 0;i < input.length/3;i++){
                if(input.eq(0 + (3 * i)).val() != "" && input.eq(1 +(3 * i)).val() != "" && input.eq(2 + (3 * i)).val() != ""){
                    data_schedule_update = {
                        showName: input.eq(0 + (3*i)).val(),
                        Detail: input.eq(1 +(3*i)).val(),
                        showTime:startTime[0] + " " + input.eq(2 + (3*i)).val(),
                        showId: idlist.eq(i).html()
                    }
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: "http://163.18.42.222:8888/Fiestadb/Show/update",
                        data: JSON.stringify(data_schedule_update),
                        contentType: "application/json",
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        datatype: JSON,
                        success: function (data) {
                        }
                    });
                }else{
                    $.confirm({
                        title: '喔不！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '有欄位未填！',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                }
                            }
                        }
                    })
                }
            }
            input = $(schedulenotid).children().children("input")
            for(i = 0;i < input.length / 3;i++){
                if(input.eq(0 + (3 * i)).val() != "" && input.eq(1 +(3 * i)).val() != "" && input.eq(2 + (3 * i)).val() != ""){
                    data_schedule_upload = {
                        showName: input.eq(0 + (3*i)).val(),
                        Detail: input.eq(1 +(3*i)).val(),
                        showTime:startTime[0] + " " + input.eq(2 + (3*i)).val(),
                        act_Id: $.cookie("actid"),
                        showStatus: "true",
                        Useable: "true"
                    }
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: "http://163.18.42.222:8888/Fiestadb/Show/upload",
                        data: JSON.stringify(data_schedule_upload),
                        contentType: "application/json",
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        datatype: JSON,
                        success: function (data) {
                            console.log(data)
                        }
                    });
                }else{
                    $.confirm({
                        title: '喔不！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '有欄位未填！',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                }
                            }
                        }
                    })
                }
            }
            //判斷他有沒有span.id 若沒有就upload 有就update
        }else if($(this).parent().parent().hasClass("ticketlist")){
            ticketlist =  $(this).parent().parent().children(".row")
            tickethasid = ticketlist.has("span.ticketid")
            ticketnotid = ticketlist.not(ticketlist.has("span.ticketid"))
            input = $(tickethasid).children().children("input")
            idlist = ticketlist.children("span")
            for(i = 0;i < input.length/3;i++){
                if(input.eq(0 + (3 * i)).val() != "" && input.eq(1 +(3 * i)).val() != "" && input.eq(2 + (3 * i)).val() != ""){
                    data_ticket_update = {
                        ticketKinds: input.eq(0 + (3*i)).val(),
                        Mounts: input.eq(1 +(3*i)).val(),
                        Price: input.eq(2 + (3*i)).val(),
                        ticketId: idlist.eq(i).html()
                    }
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: "http://163.18.42.222:8888/Fiestadb/Ticket/update",
                        data: JSON.stringify(data_ticket_update),
                        contentType: "application/json",
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        datatype: JSON,
                        success: function (data) {
                        }
                    });
                }else{
                    $.confirm({
                        title: '喔不！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '有欄位未填！',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                }
                            }
                        }
                    })
                }
            }
            input = $(ticketnotid).children().children("input")
            for(i = 0;i < input.length / 3;i++){
                if(input.eq(0 + (3 * i)).val() != "" && input.eq(1 +(3 * i)).val() != "" && input.eq(2 + (3 * i)).val() != ""){
                    data_ticket_upload = {
                        ticketKinds: input.eq(0 + (3 * i)).val(),
                        Mounts: parseInt(input.eq(1 +(3 * i)).val()),
                        Price: parseInt(input.eq(2 + (3 * i)).val()),
                        act_Id: $.cookie('actid'),
                        Remainder: parseInt(input.eq(1 +(3 * i)).val()),
                        Useable: "true"
                    }
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: "http://163.18.42.222:8888/Fiestadb/Ticket/upload",
                        data: JSON.stringify(data_ticket_upload),
                        contentType: "application/json",
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        datatype: JSON,
                        success: function (data) {
                            console.log(data)
                        }
                    });
                }else{
                    $.confirm({
                        title: '喔不！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '有欄位未填！',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                }
                            }
                        }
                    })
                }
            }
        }else if($(this).parent().parent().hasClass("lottelist")){
            lottelist =  $(this).parent().parent().children(".row")
            lottehasid = lottelist.has("span.lotteid")
            lottenotid = lottelist.not(lottelist.has("span.lotteid"))
            input = $(lottehasid).children().children("input")
            idlist = lottelist.children("span")
            for(i = 0;i < input.length;i++){
                if(input.eq(i).val() != "" && idlist.eq(i)){
                    data_lotte_update = {
                        lotteId: idlist.eq(i).html(),
                        Prize: input.eq(i).val()
                    }
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: "http://163.18.42.222:8888/Fiestadb/Lotte/update",
                        data: JSON.stringify(data_lotte_update),
                        contentType: "application/json",
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        datatype: JSON,
                        success: function (data) {
                        }
                    });
                }else{
                    $.confirm({
                        title: '喔不！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '有欄位未填！',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                }
                            }
                        }
                    })
                }
            }
            input = $(lottenotid).children().children("input")
            for(i = 0;i < input.length;i++){
                if(input.eq(i).val() != ""){
                    data_lotte_upload = {
                        Prize: input.eq(i).val(),
                        act_Id: $.cookie("actid"),
                        Useable: "true"
                    }
                    $.ajax({
                        type: "POST",
                        async: false,
                        url: "http://163.18.42.222:8888/Fiestadb/Lotte/upload",
                        data: JSON.stringify(data_lotte_upload),
                        contentType: "application/json",
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        datatype: JSON,
                        success: function (data) {
                        }
                    });
                }else{
                    $.confirm({
                        title: '喔不！',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        content: '有欄位未填！',
                        buttons: {
                            確認: {
                                btnClass: 'btn-success',
                                action: function() {
                                }
                            }
                        }
                    })
                }
            }
        }
        location.reload()
    });


    $(document).on('click',".del-lotte" , function () {
        del($(this))
    });
    $(document).on('click', ".del-schedule", function () {
        del($(this))
    });
    $(document).on('click', ".del-ticket", function () {
        del($(this))
    });
    function del(span) {
    id = span.parent().parent().children("span").html()
    if(span.parent().parent().children("span").hasClass('scheduleid')){
        $.confirm({
            title: '警告',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '確定要刪除嗎？無法恢復',
            buttons: {
                確認: {
                    btnClass: 'btn-danger',
                    action: function() {
                        data_showdel = {
                            show_Id: id
                        }
                        $.ajax({
                            type: "POST",
                            url: "http://163.18.42.222:8888/Fiestadb/Show/delete",
                            data: JSON.stringify(data_showdel),
                            contentType: "application/json",
                            beforeSend:function(xhr){
                                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                            },
                            datatype: JSON,
                            success: function (response) {
                                location.reload()
                            }
                        });
                    }
                },
                我再想想: function() {
                }
            }
        })
    }else if(span.parent().parent().children("span").hasClass('ticketid')){
        $.confirm({
            title: '警告',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '確定要刪除嗎？無法恢復',
            buttons: {
                確認: {
                    btnClass: 'btn-danger',
                    action: function() {
                        data_ticketdel = {
                            ticketId: id
                        }
                        $.ajax({
                            type: "POST",
                            url: "http://163.18.42.222:8888/Fiestadb/Ticket/delete",
                            data: JSON.stringify(data_ticketdel),
                            contentType: "application/json",
                            beforeSend:function(xhr){
                                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                            },
                            datatype: JSON,
                            success: function (response) {
                                location.reload()
                            }
                        });
                    }
                },
                我再想想: function() {
                }
            }
        })
    }else if(span.parent().parent().children("span").hasClass('lotteid')){
        $.confirm({
            title: '警告',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '確定要刪除嗎？無法恢復',
            buttons: {
                確認: {
                    btnClass: 'btn-danger',
                    action: function() {
                        data_lottedel = {
                            lotteId: id
                        }
                        $.ajax({
                            type: "POST",
                            url: "http://163.18.42.222:8888/Fiestadb/Lotte/delete",
                            data: JSON.stringify(data_lottedel),
                            contentType: "application/json",
                            beforeSend:function(xhr){
                                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                            },
                            datatype: JSON,
                            success: function (response) {
                                location.reload()
                            }
                        });
                    }
                },
                我再想想: function() {
                }
            }
        })
    }
    }
});

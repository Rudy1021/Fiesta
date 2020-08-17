$(document).ready(function () {
    var opt={dateFormat: 'yy-mm-dd',
        changeYear : true,
        yearRange : "1994:2003",
        controlType: 'select',
        oneLine: true
    };
    $('#Birthday').datepicker(opt)
    $("input.custom-range").change(function (e) { 
        $("span#range-val").html($(this).val())
    });
    $("#Mail_1").change(function (e) {
        sch = $(this).val()
        sch = sch.split("@")
        sch = sch[1]
        sch = sch.split(".")
        for(i = 0;i<sch.length-1;i++){
            if(sch[i] == "edu"){
                sch.splice(i, 1)
            }
            if(sch[i] == "tw"){
                sch.splice(i, 1)
            }
            if(sch[i] == "mail"){
                sch.splice(i, 1)
            }
        }
        sch = sch[0]
        $.ajax({
            type: "GET",
            url: "https://fiesta.nkust.edu.tw/Fiestadb/getSchool",
            success: function (data) {
                for (var i = 0, l = data.result.length; i < l; i++) { //這邊的i是指目前算到第幾個json
                    for (var key in data.result[i]) {
                        if(sch == data.result[i][key]){
                            $("#School").val(data.result[1][key])
                        }
                    }
                }
                if($("#School").val() == ""){
                    SC = ""
                }else{
                    SC = $("#School").val()
                }
            }
        });
    });
    $("button#signup").click(function (e) {
        if($("#userId").val() == "" || $("#userPassword").val() == "" || $("#userName").val() == "" || $("#Mail_1").val() == "" || $("#Phone").val() == ""){

        }else if($("#userId").val() == $("#userPassword").val()){
            $.confirm({
                title: '錯誤！',
                animation: 'zoom',
                closeAnimation: 'scale',
                content: '帳號與密碼不得相同！',
                buttons: {
                    確認: {
                        btnClass: 'btn-success',
                        action: function() {
                            $("#userName").val("")
                            $("#userPassword").val("")
                        }
                    }
                }
            })
        }else if($(".policy").prop("checked") == false){
            $.confirm({
                title: '警告！',
                animation: 'zoom',
                closeAnimation: 'scale',
                content: '請打勾隱私權政策！',
                buttons: {
                    確認: {
                    }
                }
            })
        }else{
            
            if($("#nickName").val() == ""){
                NN = $("#userName").val()
            }else{
                NN = $("#nickName").val()
            }
            data = {
                userId: $("#userId").val(),
                userPassword: $("#userPassword").val(),
                userName: $("#userName").val(),
                nickName: NN,
                Mail_1: $("#Mail_1").val(),
                Phone: $("#Phone").val(),
                Distance: parseInt($("#Distance").val()),
                School: SC,
                Useable: "true"
            }
            $.ajax({
                type: "POST",
                url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/upload",
                data: JSON.stringify(data),
                async: false,
                contentType: "application/json",
                datatype: JSON,
                success: function (data_0) {

                    if(data_0.code == "001"){
                    data_2 = {
                        userId: $("#userId").val(),
                        type: "1"
                    }
                    $.ajax({
                        type: "POST",
                        url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/SendConfirm",
                        data: JSON.stringify(data_2),
                        contentType: "application/json",
                        datatype: JSON,
                        async: false,
                        success: function (data_5) {
                            $.confirm({
                                title: '成功！',
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                content: '請去信箱驗證會員呦！',
                                buttons: {
                                    確認: {
                                        btnClass: 'btn-success',
                                        action: function() {
                                            location.href = "/"
                                        }
                                    }
                                }
                            })
                        }
                    });
                }else if(data_0.code == "005"){
                            $.confirm({
                                title: '錯誤！',
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                content: '該帳號已被註冊！',
                                buttons: {
                                    確認: {
                                        btnClass: 'btn-success',
                                        action: function() {
                                            $("#userName").val("")
                                        }
                                    }
                                }
                            })
                }else if(data_0.code == "008"){
                            $.confirm({
                                title: '錯誤！',
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                content: '學校信箱驗證錯誤！',
                                buttons: {
                                    確認: {
                                        btnClass: 'btn-success',
                                        action: function() {
                                            $("#Mail_1").val("")
                                        }
                                    }
                                }
                            })
                }else if(data_0.code == "0041"){
                                                $.confirm({
                                title: '錯誤！',
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                content: '姓名未填！',
                                buttons: {
                                    確認: {
                                        btnClass: 'btn-success',
                                        action: function() {
                                        }
                                    }
                                }
                            })
                }else if(data_0.code == "0042"){
                            $.confirm({
                                title: '錯誤！',
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                content: '帳號未填！',
                                buttons: {
                                    確認: {
                                        btnClass: 'btn-success',
                                        action: function() {
                                        }
                                    }
                                }
                            })
                }else if(data_0.code == "0043"){
                            $.confirm({
                                title: '錯誤！',
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                content: '密碼未填！',
                                buttons: {
                                    確認: {
                                        btnClass: 'btn-success',
                                        action: function() {
                                        }
                                    }
                                }
                            })
                }else if(data_0.code == "0044"){
                                                $.confirm({
                                title: '錯誤！',
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                content: '學校信箱未填！',
                                buttons: {
                                    確認: {
                                        btnClass: 'btn-success',
                                        action: function() {
                                        }
                                    }
                                }
                            })

                }else{
                            $.confirm({
                                title: '錯誤！',
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                content: '發生未知錯誤，請稍後再試！',
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
            });
        }
        /*
        userId userPassword userName Mail_1 Phone ID_CARD Distance /nickName
        */
    });
});

/*
    $( "input#check" ).checkboxradio();
    $.ajax({
        type: "GET",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Tag/select",
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            $.each(data.result, function (indexInArray, content) { 
                for(i = 0;i < content.length;i++){
                    tagcheck = '<label for="check' + i + '">'+
                    '<input type="checkbox" class="checktag" name="check' + i + '" id="check' + i + '">' +
                    '</label>'
                    $("#tagselect").append(tageheck)
                }
            });
        }
    }); 這只能放setting了
*/
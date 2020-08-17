
$(document).ready(function () {
    $("#groupName").change(function (e) {
        $("div.member-list").children().remove(".createmember")
        if($("#groupName").val() != ""){
            if(!$("#groupName").val().match(/^\s+/)){
                data = {
                    groupName: $(this).val()
                }
                $.ajax({
                    type: "POST",
                    url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/FIndName",
                    data: JSON.stringify(data),
                    beforeSend:function(xhr){
                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                    },
                    contentType: "application/json",
                    datatype: JSON,
                    success: function (data) {
                        if(data.code == "005"){
                            $.alert({
                                title: "喔不！",
                                content: "名稱重複了！"
                            })
                        }
                    },
                });
            }
            $.ajax({
                type: "POST",
                url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/ValidateLogin",
                beforeSend:function(xhr){
                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                },
                success: function (data) {
                    $.each(data.result, function (indexInArray, content) {
                        $.cookie("qsacw", content.token, { expires: 7 })
                        if(content.Address != "None"){
                            $("#groupAddress").val(content.Address)    
                        }
                        if(content.Phone != "None"){
                            $("#groupPhone").val(content.Phone)    
                        }
                        if(content.Mail_1 != "None"){
                        $("#groupEmail").val(content.Mail_1)    
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
    $(".btn-info").on('click', function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        $("p#member-line").hide()
        $(".member-hr").show()
        $("div.member-list").children().remove()
        $("h5.title-group").html("群組資料")
        $("span#gid").html($(this).next().next().next().html())
        data_Group_Select = {
            groupId: $("span#gid").html()
        }
        $.ajax({
            async: false,
            type: "POST",
            url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/select",
            data: JSON.stringify(data_Group_Select),
            contentType: "application/json",
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            datatype: JSON,
            success: function (data) {
                $.each(data.result, function (indexInArray, content) { 
                    $("#groupName").val(content.groupName).prop("disabled", "disabled").prop("readonly", "readonly")
                    $("#groupAddress").val(content.Address).prop('disabled', 'disabled').prop('readonly', 'readonly')
                    $("#groupEmail").val(content.Mail).prop('disabled', 'disabled').prop('readonly', 'readonly')
                    $("#groupPhone").val(content.Phone).prop('disabled', 'disabled').prop('readonly', 'readonly')
                });
            }
        });
        $.ajax({
            type: "POST",
            async: false,
            url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/Member/select",
            data: JSON.stringify(data_Group_Select),
            contentType: "application/json",
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            datatype: JSON,
            success: function (data) {
                for (var i = 0, l = data.result.length; i < l; i++) {
                    authId = ''
                    nickName = ''
                    for (var key in data.result[i]) {
                        if(key == "authId"){
                            authId = data.result[i][key]
                        }else if(key == "nickName"){
                            nickName = data.result[i][key]
                        }
                    }
                    memberlist = '<div class="row"><div class="col-2"><span class="id">' + authId + '</span></div>' +
                        '<div class="col-3"><h6 class="lh-3">' + nickName +'</h6></div></div>'
                    $(".member-list").append(memberlist)
                }
            },
        });
        $("#groupCreate").hide()
        $(".list").hide()
        $(".CreateGroup").show()
        $("#back").show()
    });
    $("button.add-group-member").click(function (e) { 
        if($("input#member").val() != ""){
            if(!$("input#member").val().match(/^\s+/))
            {
                data = {
                    Search: $("input#member").val()
                }
                $.ajax({
                    type: "POST",
                    url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/Search",
                    data: JSON.stringify(data),
                    beforeSend:function(xhr){
                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                    },
                    contentType: "application/json",
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
    $(".del-group").on('click', function () {
        delgroupid = $(this).next().html()
        $.confirm({
            title: '警告',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '確定要刪除嗎？無法恢復',
            buttons: {
                確認: {
                    btnClass: 'btn-danger',
                    action: function() {
                        data = {groupId: delgroupid}
                        $.ajax({
                            type: "POST",
                            url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/delete",
                            data: JSON.stringify(data),
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
    });

    $(".btn-edit").on('click', function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
        $("div.member-list").children().remove()
        $("h5.title-group").html("編輯群組")
        $("#groupCreate").html("更新")
        $("span#gid").html($(this).next().next().html())
        data_Group_Select = {
            groupId: $("span#gid").html()
        }
        $.ajax({
            type: "POST",
            async: false,
            url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/select",
            data: JSON.stringify(data_Group_Select),
            contentType: "application/json",
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            datatype: JSON,
            success: function (data) {
                $.each(data.result, function (indexInArray, content) { 
                    $("#groupName").val(content.groupName).removeAttr("disabled").removeAttr("readonly")
                    $("#groupAddress").val(content.Address).removeAttr("disabled").removeAttr("readonly")
                    $("#groupEmail").val(content.Mail).removeAttr("disabled").removeAttr("readonly")
                    $("#groupPhone").val(content.Phone).removeAttr("disabled").removeAttr("readonly")
                });
            }
        });
        $.ajax({
            type: "POST",
            async: false,
            url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/Member/select",
            data: JSON.stringify(data_Group_Select),
            contentType: "application/json",
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            datatype: JSON,
            success: function (data) {
                for (var i = 0, l = data.result.length; i < l; i++) {
                    authId = ''
                    nickName = ''
                    for (var key in data.result[i]) {
                        if(key == "authId"){
                            authId = data.result[i][key]
                        }else if(key == "nickName"){
                            nickName = data.result[i][key]
                        }
                    }
                    memberlist = '<div class="row"><div class="col-2"><span class="id">' + authId + '</span></div>' +
                    '<div class="col-3"><h6 class="lh-3">' + nickName +'</h6></div>' +
                    '<div class="col-7"><button class="btn btn-danger btn-group del-member m-0 mt-2 p-1 float-right">' +
                    '<i class="fas fa-times"></i></button></div>'
                    $(".member-list").append(memberlist)
                }
            },
        });
        $(".list").hide()
        $("#back").show()
        $("button#Add").show()
        $("#groupCreate").show()
        $("p#member-line").show()
        $("div.member-list").show()
        $(".CreateGroup").show()
    });
    $(".del-member").on('click', function () {
        temp = ''
        par = $(this).parent().parent()
        memberid = $(this).next().html()
        $.confirm({
            title: '警告',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '確定要刪除嗎？無法恢復',
            buttons: {
                確認: {
                    btnClass: 'btn-danger',
                    action: function() {
                        data = {
                            authId: memberid,
                            groupId: $("span#gid").html()
                        }
                        $.ajax({
                            type: "POST",
                            url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/Member/delete",
                            data: JSON.stringify(data),
                            contentType: "application/json",
                            beforeSend:function(xhr){
                                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                            },
                            datatype: JSON,
                            success: function (data) {
                                par.remove()
                            },
                        });
                    }
                },
                我再想想: function() {
                }
            }
        })
    });
    $("#groupCreate").click(function (e) {
        if($("#groupCreate").html() == "創建"){
            if($("#groupName").val() == "")
            {
                $(".grouperrer").html("活動名稱未填!")
                $(".grouperror").show()
            }else{
            Id = parseInt($.cookie("Id"))
            data = {
                authId : [Id],
                groupName : $("#groupName").val(),
                Address : $("#groupAddress").val(),
                Mail : $("#groupEmail").val(),
                Phone : $("#groupPhone").val(),
                Useable : "true"
            }
            $.ajax({
                type: "POST",
                url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/upload",
                data: JSON.stringify(data),
                contentType: "application/json",
                beforeSend:function(xhr){
                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                },
                datatype: JSON,
                success: function (response) {
                    $.alert({
                        title: "建立成功",
                        content: "立刻去建立活動吧！"
                    })
                    $(".CreateGroup").hide()
                    $(".list").show()
                }
            });
        }
        }else {
            if($("#groupName").val() == ""){

            }else{
            data = {
                groupId: $("span#gid").html(),
                groupName : $("#groupName").val(),
                Address : $("#groupAddress").val(),
                Mail : $("#groupEmail").val(),
                Phone : $("#groupPhone").val()
            }
            $.ajax({
                type: "POST",
                url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/update",
                data: JSON.stringify(data),
                contentType: "application/json",
                beforeSend:function(xhr){
                    xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                },
                datatype: JSON,
                success: function (response) {
                    $.alert({
                        content: "更新成功！"
                    })
                },
            });
            groupmemberid = $("span.member-id").html()
            for(i = 0;i < groupmemberid.length;i++){
                data = {
                    groupId: $("span#gid").html(),
                    authId: groupmemberid[i]
                }
                $.ajax({
                    type: "POST",
                    url: "https://fiesta.nkust.edu.tw/Fiestadb/Group/Member/upload",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    beforeSend:function(xhr){
                        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                    },
                    datatype: JSON,
                    success: function (response) {
                    },
                });
            }
        }
    }
    });


    $(".group-create").click(function (e) { 
        $("h5.title-group").html("創建一個永久群組")
        $("div.member-list").children().remove()
        $("p#member-line").show()
        $("div.member-list").show()
        $("#groupName").val("").removeAttr("disabled").removeAttr("readonly")
        $("#groupAddress").val("").removeAttr("disabled").removeAttr("readonly")
        $("#groupEmail").val("").removeAttr("disabled").removeAttr("readonly")
        $("#groupPhone").val("").removeAttr("disabled").removeAttr("readonly")
        $("#groupCreate").html("創建")
        $(".CreateGroup").show()
        $(".list").hide()
        $("#back").show()
        $("#groupCreate").show()
        $("button#Add").show()
    });


    $("#back").click(function (e) {
        $(".CreateGroup").hide()
        $(".list").show()
        $("h6.group-Act").remove()
    });


});

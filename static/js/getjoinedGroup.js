data = {authId: $.cookie("Id")}
groupId = ''
k = 1
$.ajax({
    type: "POST",
    url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/getJoinedGroup",
    data: JSON.stringify(data),
    contentType: "application/json",
    datatype: JSON,
    async:false,
    beforeSend:function(xhr){
        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
    },
    success: function (data) {
        if(data.code == "009" || data.code == "019"){
            $.confirm({
                title: '喔不！',
                animation: 'zoom',
                closeAnimation: 'scale',
                content: '工作階段過期，請重新登入！',
                buttons: {
                    確認: {
                        btnClass: 'btn-success',
                        action: function() {
                            $.removeCookie('Id');
                            $.removeCookie('qsacw');
                            location.href = '/login'
                        }
                    }
                }
            })
        }
        //CreateEvent
        $.each(data.result, function (indexInArray, content) {
            if(location.pathname == "/CreateEvent"){
                Group = '<option>' + content.groupName + '</option>'
                $("#groupSelect").append(Group)
                idgroup = '<span class="id">' + content.groupId + '</span>'
                $("#chooseGroup").append(idgroup)
                //span不能放在select裡 所以只能放他外面
            }else if(location.pathname == "/Group"){
                groupId = content.groupId
                    groupli = '<li class="list-group-item list-group-li"><h6 class="float-left">群組' + k + 
                    '</h6><div class="float-right"><button class="group-btn btn btn-info btn-radius-2 mr-1">' +
                    '<i class="far fa-eye"></i><button class="group-btn btn btn-edit btn-success btn-radius-2 mr-1">' +
                    '<i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="group-btn btn btn-danger del-group btn-radius-2"><i class="fas fa-minus">' +
                    '</i></button><span class="id">' + content.groupId + '</span></div><div class="clear-float"><h7>' +
                    content.groupName + '</h7><br></div></li>'
                    $("#allgroup").append(groupli)
                    k++;
            }
        });
        if(groupId == ''){
            $("#warring").text("您尚未創立群組！")
            $(".danger").show()
            $(".CreateGroup").show()
            $(".list").hide()
        }
    }
});

$(document).ready(function () {
    idlist = []
    data = {
        authId: $.cookie("Id")
    }
    $.ajax({
        type: "POST",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/getCreateAct",
        data: JSON.stringify(data),
        contentType: "application/json",
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        async:false,
        datatype: JSON,
        success: function (data) {
            if(data.code != "013"){
                $.each(data.result, function (indexInArray, content) {
                    idlist.push(content.act_Id)
                    allActTitle = '<li class="nav-item"><a class="nav-link collapsed " href="javascript:;">' +
                        '<i class="fas fa-fw fa-bullhorn"></i>' +
                        '<span class="all-act-title">' + content.act_Name + '</span><span class="id">' + content.act_Id + '</span></a></li>'
                    $("#accordionSidebar").append(allActTitle)
                });
                if($.cookie("acid") == undefined || idlist.includes($.cookie("acid")) == false){
                    if(idlist.length == 0){
                        $.confirm({
                            title: '錯誤！',
                            animation: 'zoom',
                            closeAnimation: 'scale',
                            content: '尚未創建活動！',
                            buttons: {
                                確認: {
                                    btnClass: 'btn-warning',
                                    action: function() {
                                        location.href = "/"
                                    }
                                }
                            }
                        })
                    }else {
                        $.cookie("acid", $("span.id").eq(0).html(), {path: '/' })
                    }
                }
                for(k = 0;k < $(".id").length;k++){
                    if($.cookie("acid") == $(".id").eq(k).html()){
                        $(".id").eq(k).parent().parent().addClass("active")
                        $(".id").eq(k).parent().append('<i class="fas fa-angle-down"></i>')
                        model = '<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionSidebar">' +
                            '<div class="bg-white py-2 collapse-inner rounded">' +
                            '<a class="collapse-item" href="/dashboard/model">設定進階模組</a></div></div>'
                            $(".id").eq(k).parent().parent().append(model)
                            break
                    }
                }
                sidebarDivider = '<hr class="sidebar-divider"><div class="text-center d-none d-md-inline">' +
                    '<button class="rounded-circle border-0" id="sidebarToggle"></button></div>'
                    $("#accordionSidebar").append(sidebarDivider)
                $("#sidebarToggle").on('click', function(e) {
                    $("body").toggleClass("sidebar-toggled");
                    $(".sidebar").toggleClass("toggled");
                    if ($(".sidebar").hasClass("toggled")) {
                        $('.sidebar .collapse').collapse('hide');
                    };
                });

                $(".all-act-title").click(function (e) {
                    $.cookie("acid", $(this).next().html(), {path: '/' })
                    if(location.href != location.hostname + '/dashboard'){
                        location.href = '/dashboard'
                    }else{
                        location.reload()
                    }
                });
            }
        }
    });
});
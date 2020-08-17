$(document).ready(function () {
    data_get_ticket = {
        Id: $.cookie("Id")
    }
    $.ajax({
        type: "POST",
        url: "https://fiesta.nkust.edu.tw/Fiestadb/Account/getUnexpiredAct",
        data: JSON.stringify(data_get_ticket),
        contentType: "application/json",
        datatype: JSON,
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
        },
        success: function (data) {
            if(data.code == "020"){
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
            }else if(data.code != "012"){
                for (var i = 0, l = data.result.length; i < l; i++) { //這邊的i是指目前算到第幾個json
                    for (var key in data.result[i]) {
                        if(key == 'ticketKinds'){
                            ticketKinds = data.result[i][key]
                            if(ticketKinds == "None"){
                                ticketKinds = '普通票'
                            }
                        }else if(key == 'act_Id'){
                            act_Id = data.result[i][key]
                        }else if(key == 'act_Name'){
                            act_Name = data.result[i][key]
                        }else if(key == 'startTime'){
                            startTime = data.result[i][key]
                        }else if(key == 'Photo'){
                            Photo = data.result[i][key]
                        }
                    }
                    ticket = '<div class="ticket-all">' +
                            '<span class="id">' +
                                act_Id +
                            '</span>' +
                                '<div class="img-area">' +
                                    '<img src="' + Photo + '" class="img">' +
                                '</div>' +
                                '<div class="text-area">' +
                                    '<div class="number">' +
                                        'No.' + i +
                                    '</div>' +
                                    '<div class="big clear-float">' +
                                        act_Name +
                                    '</div>' +
                                    '<div class="content">' +
                                        '<div class="type">' +
                                            ticketKinds +
                                        '</div>' +
                                    '<div class="time">' +
                                        startTime +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
                    $(".ticketlist").append(ticket)
                }
            }
        }
    });
    $(document).on('click', $(".ticket-all"), function () {
        data_getQRcode = {
            Input: location.href
        }
          $.ajax({
            type: "POST",
            url: "https://fiesta.nkust.edu.tw/Fiestadb/QRcode",
            data: JSON.stringify(data_getQRcode),
            contentType: "application/json",
            datatype: JSON,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            success: function (data) {
              $(".QRcode").prop("src", "data:image/bmp;base64," + data)
            }
          });
    });
});
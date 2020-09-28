// Call the dataTables jQuery plugin
$(document).ready(function() {
  var o={
    timeFormat: 'HH:mm',
    dateFormat: 'yy-mm-dd'
}
  $('.datetimepicker3').datetimepicker(o)
  if($.cookie("actid") != undefined){
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
      $.each(data.result, function (indexInArray, content) { 
        $(".join-count").html(content.joinedCount + ' / ' + content.peopleMaxium)
        decide = parseInt(content.joinedCount) / parseInt(content.peopleMaxium)
        $(".peoplemax").val(content.peopleMaxium)
        $(".startTime").val(content.startTime)
        $(".endTime").val(content.endTime)
        $(".act_Description").val(content.act_Description)
        decide = decide.toFixed(2)
        decide = decide * 100
        $(".peoplebar").css("width", decide + '%')
        $(".act-title").html(content.act_Name)
        $("title").html('後台-' + content.act_Name)
        Tag = content.Tag
        $(".actImg").prop("src", content.Photo)
        mod = content.Models
        mod = mod.split(',')
      });
      if(mod[0] != "2" || mod[1] != "2"){
        $("th.ticketitle").remove()
      }
      for(i = 0;i < Tag.length;i++){
        tagname = '<div class="tag">' + Tag[i] + '</div>'
        $(".taglist").append(tagname)
      }
    }
  });
  dataList = {
    act_Id: $.cookie("actid")
  }
  $.ajax({
    type: "POST",
    url: "http://163.18.42.222:8888/Fiestadb/Activity/getJoinedList",
    data: JSON.stringify(dataList),
    contentType: "application/json",
    async:false,
    beforeSend:function(xhr){
        xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
    },
    success: function (data) {
      console.log(data)
      $.each(data.result, function (indexInArray, content) {
        if($("th.ticketitle").length > 0){
          if(content.ticketStatus == '0'){
            tables = '<tr><td>' + content.userName + '</td><td>' + content.nickName + '</td>' +
              '<td>' + content.ticketKinds + '</td>' +
              '<td>'+ '未使用' +'</td>' +
              '<td>' + content.Notes + '</td>' +
              '<td class="pt-3"><label class="switch"><span class="authid">' + content.authId + '</span><input type="checkbox" class="checkin"><span class="slider round"></span></label></td>' +
              '<td><button class="btn btn-danger btn-circle del"><i class="fas fa-minus"></i></button></td></tr>'
            $("tbody").append(tables)
          }else{
            tables = '<tr><td>' + content.userName + '</td><td>' + content.nickName + '</td>' +
              '<td>' + content.ticketKinds + '</td>' +
              '<td>'+ '已使用' +'</td>' +
              '<td>' + content.Notes + '</td>' +
              '<td class="pt-3"><label class="switch"><span class="authid">' + content.authId + '</span><input type="checkbox" checked class="checkin"><span class="slider round"></span></label></td>' +
              '<td><button class="btn btn-danger btn-circle"><i class="fas fa-minus"></i></button></td></tr>'
            $("tbody").append(tables)
          }
        }else{
          if(content.ticketStatus == '0'){
            tables = '<tr><td>' + content.userName + '</td><td>' + content.nickName + '</td>' +
              '<td>'+ '未使用' +'</td>' +
              '<td>' + content.Notes + '</td>' +
              '<td class="pt-3"><label class="switch"><span class="authid">' + content.authId + '</span><input type="checkbox" class="checkin"><span class="slider round"></span></label></td>' +
              '<td><button class="btn btn-danger btn-circle del"><i class="fas fa-minus"></i></button></td></tr>'
            $("tbody").append(tables)
          }else{
            tables = '<tr><td>' + content.userName + '</td><td>' + content.nickName + '</td>' +
              '<td>'+ '已使用' +'</td>' +
              '<td>' + content.Notes + '</td>' +
              '<td class="pt-3"><label class="switch"><span class="authid">' + content.authId + '</span><input type="checkbox" checked class="checkin"><span class="slider round"></span></label></td>' +
              '<td><button class="btn btn-danger btn-circle"><i class="fas fa-minus"></i></button></td></tr>'
            $("tbody").append(tables)
          }
        }
      });
      data_getQRcode = {
        Input: location.protocol + "//" + location.hostname + "/check?id=" + $.cookie("actid")
    }
      $.ajax({
        type: "POST",
        url: "http://163.18.42.222:8888/Fiestadb/QRcode",
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
      $(".checkin").change(function (e) {
        if($(this).prop("checked") == true){
          data_change = {
            act_Id: $.cookie("actid"),
            authId: $(this).prev().html()
          }
          $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/Ticket/vaild",
            data: JSON.stringify(data_change),
            contentType: "application/json",
            async:false,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
            success: function (response) {
            }
          });
        }else{
          use = $(this).parent().parent().prev().prev()
          data_regret = {
            act_Id: $.cookie("actid"),
            authId: $(this).prev().html()
          }
          $.confirm({
            title: '警告',
            animation: 'zoom',
            closeAnimation: 'scale',
            content: '確定要取消嗎？',
            buttons: {
                確定: {
                    btnClass: 'btn-success',
                    action: function() {
                      $.ajax({
                        type: "POST",
                        url: "http://163.18.42.222:8888/Fiestadb/Ticket/updateTicketStatusFalse",
                        data: JSON.stringify(data_regret),
                        contentType: "application/json",
                        async:false,
                        beforeSend:function(xhr){
                            xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                        },
                        success: function (data) {
                          use.html("未使用")
                        }
                      });
                    }
                },
                我再想想: function() {
                }
            }
        })

        }
      });


      $(".del").click(function (e) {
        Id = $(this).parent().prev().children(".switch").children(".authid").html()
        $.confirm({
          title: '警告',
          animation: 'zoom',
          closeAnimation: 'scale',
          content: '確定要刪除嗎？無法恢復',
          buttons: {
              確認: {
                  btnClass: 'btn-danger',
                  action: function() {
                    data_del = {
                      act_Id: $.cookie("actid"),
                      authId: Id
                    }
                    $.ajax({
                      type: "POST",
                      url: "http://163.18.42.222:8888/Fiestadb/Activity/deleteJoinedList",
                      data: JSON.stringify(data_del),
                      contentType: "application/json",
                      async:false,
                      beforeSend:function(xhr){
                          xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
                      },
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
    }
  });
  $('#dataTable').DataTable();
  //function
  $(".save-input").on('click', function () {
    data_save = {
      act_Id: $.cookie("actid"),
      startTime: $(".startTime").val(),
      endTime: $(".endTime").val(),
      peopleMaxium: $(".peoplemax").val(),
      act_Description: $(".act_Description").val()
    }
    $.ajax({
      type: "POST",
      url: "http://163.18.42.222:8888/Fiestadb/Activity/update",
      data: JSON.stringify(data_save),
      contentType: "application/json",
      datatype: JSON,
      beforeSend:function(xhr){
          xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
      },
      success: function (data) {
        location.reload()
      }
    });
  });
  $(".to-edit").click(function (e) {
    $(".edit").show()
    $(".editinput").removeAttr("readonly")
    $(".editinput").removeAttr("disabled")
  });
  }
});

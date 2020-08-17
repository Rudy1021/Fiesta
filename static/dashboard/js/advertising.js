$(document).ready(function () {
    var o={
        timeFormat: 'HH:mm',
        dateFormat: 'yy-mm-dd'
    }
      $('.DateTime').datetimepicker(o)
    $(".submit").on('click', function () {
        data_AdsUpload = {
            AdsName: $("#Ads_Name").val(),
            Source: $("#Source").val(),
            startTime: $("#startTime").val(),
            endTime: $("#endTime").val(),
            Price: $("#Price").val(),
            Content: $("#Content").val(),
            viewStatus: "true",
            Useable: "true"
        }
        $.ajax({
            type: "POST",
            url: "http://163.18.42.222:8888/Fiestadb/Ads/upload",
            data: JSON.stringify(data_AdsUpload),
            contentType: "application/json",
            datatype: JSON,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization", "Bearer " + $.cookie("qsacw"))
            },
          });
    });
});
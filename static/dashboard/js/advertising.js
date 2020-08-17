$(document).ready(function () {
    var o={
        timeFormat: 'HH:mm',
        dateFormat: 'yy-mm-dd'
    }
      $('.DateTime').datetimepicker(o)
    $(".submit").on('click', function () {
        submit = true
        for(i = 0;i < $(".behoove").length;i++){
            if($(".behoove").eq(i).val() == ""){
                $.confirm({
                    title: '錯誤！',
                    animation: 'zoom',
                    closeAnimation: 'scale',
                    content: '有欄位未填！',
                    buttons: {
                        確認: {
                            btnClass: 'btn-warring',
                            action: function() {
                            }
                        }
                    }
                })
                submit = false
                break
            }
        }
        if(submit == true){
        data_AdsUpload = {
            Ads_Name: $("#Ads_Name").val(),
            Tag: "搖滾",
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
            success: function (data) {
                console.log(data)
            }
          });
        }
    });
});
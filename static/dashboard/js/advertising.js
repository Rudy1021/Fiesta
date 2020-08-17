$(document).ready(function () {
    var o={
        timeFormat: 'HH:mm',
        dateFormat: 'yy-mm-dd',
        minDate: "-0d"

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
                            btnClass: 'btn-Warring',
                            action: function() {
                            }
                        }
                    }
                })
                submit = false
                break
            }
        }
        Now = new Date()
        startTime = new Date(Date.parse($("#startTime").val()))
        endTime = new Date(Date.parse($("#endTime").val()));
        if(Now.getFullYear() > startTime.getFullYear()){
            submit = false
            wrongTime()
        }else if(Now.getMonth()+1 > startTime.getMonth()+1){
            submit = false
            wrongTime()
        }else if(Now.getDate() > startTime.getDate()){
            submit = false
            wrongTime()
        }else if(Now.getHours() > startTime.getHours()){
            submit = false
            wrongTime()
        }else if(Now.getMinutes() > startTime.getMinutes()){
            submit = false
            wrongTime()
        }else if(startTime.getFullYear() > endTime.getFullYear()){
            submit = false
            wrongTime()
        }else if(startTime.getMonth()+1 > endTime.getMonth()+1){
            submit = false
            wrongTime()
        }else if(startTime.getDate() > endTime.getDate()){
            submit = false
            wrongTime()
        }else if(startTime.getHours() > endTime.getHours()){
            submit = false
            wrongTime()
        }else if(startTime.getMinutes() > endTime.getMinutes()){
            submit = false
            wrongTime()
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
function wrongTime() {
    $.confirm({
        title: '錯誤！',
        animation: 'zoom',
        closeAnimation: 'scale',
        content: '時間錯誤！',
        buttons: {
            確認: {
                btnClass: 'btn-Warring',
                action: function() {
                }
            }
        }
    })
}
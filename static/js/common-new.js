$(document).ready(function() {
  // hrline();
});


$(document).on('click', '#myticket-link', function() {
  profile($(this).prop('id'));
});


$(document).on('click', '#myfavorites-link', function() {
  profile($(this).prop('id'));
});


/**
 * 取得內頁
 * @param {string} id
 */
function profile(id) {
  $('.sidebar-link.active').removeClass('active');
  $('#'+id).addClass('active');
  switch (id) {
    case 'myticket-link':
      $.ajax({
        type: 'GET', // 默认get
        url: '/ticketFile', // 默认当前页
        beforeSend: function() {}, // 请求发送前回调,常用验证
        success: function(response) {
          window.history.pushState(null, null, '/myticket-new');
          $('.main-div').remove();
          $('.main-include').append(response);
        },
      });
      break;
    case 'myfavorites-link':
      $.ajax({
        type: 'GET', // 默认get
        url: '/favoritesFile', // 默认当前页
        beforeSend: function() {}, // 请求发送前回调,常用验证
        success: function(response) {
          window.history.pushState(null, null, '/myfavorites');
          $('.main-div').remove();
          $('.main-include').append(response);
        },
      });
      break;
    default:
      break;
  }
}

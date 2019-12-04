$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="main__chat__info">
                    <div class="main__chat__info--talker">
                      ${message.user_name}
                    </div>
                    <div class="main__chat__info--date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="main__chat__text">
                    <p class="lower-message__content">
                    ${content}
                    </p>
                    ${img}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__chat').append(html);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
      $('#new_message')[0].reset();
    })

    .fail(function(data) {
      alert("メッセージ送信に失敗しました");
    })

    .always(function(data){
      $('.form__new_message__submit').prop('disabled', false);
    })
  })

  function reloadMessages () {
    var last_message_id = $('.message:last').data("message-id");
    var href = 'api/messages'
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: href,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML = buildHTML(message)
          $('.main__chat').append(insertHTML);
          $('.main__chat').animate({scrollTop: $('.main__chat')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        alert("自動更新に失敗しました")
      });
    }
  }
  setInterval(reloadMessages, 7000);
});

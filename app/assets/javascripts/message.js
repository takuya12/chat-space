$(function(){
  
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="main_chat" data-id="${message.id}">
                  <div class="main__chat__info">
                    <p class="main__chat__info--talker">
                      ${message.user_name}
                    </p>
                    <p class="main__chat__info--date">
                      ${message.date}
                    </p>
                  </div>
                  
                    <div>
                    ${content}
                    </div>
                    ${img}
                  
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
      $('#message_content').val('');
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
});

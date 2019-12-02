$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =  `<p>
                    <strong>
                      <a href=/users/${message.user_id}>${message.user_name}</a>
                      ：
                    </strong>
                    ${message.text}
                    ${message.image}
                  </p>`
    } else {
      var html =  `<p>
                    <strong>
                      <a href=/users/${message.user_id}>${message.user_name}</a>
                      ：
                    </strong>
                    ${message.text}
                  </p>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: '/messages/create',
      type: "GET",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.textbox').val('');
      $('.form__submit').prop('disabled', false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});

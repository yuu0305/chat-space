$(function(){
  // 画面に表示する、自分が設定したHTML（検証から取ってくる）
  function buildHTML(message)

  {
    var img_part = ``;
    if(message.image != null){
      img_part =`<img class="lower-message__image" src="${message.image}">`;
    }

    var msg_part = ``;
    if(message.content != null){
      msg_part = `${message.content}`;
    }

    var html = `<div class="chat-main__messages__message__upper">
                  <div class="chat-main__messages__message__upper__user-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-main__messages__message__upper__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="chat-main__messages__message__lower">
                  <div class="chat-main__messages__message__lower__content">`
                    +
                    msg_part
                    +
                    img_part
                    +
                 `</div>
                </div>`
    return html;
  }
   $('.btn').removeAttr('data-disable-with')
   $('#new_message').on('submit', function(e){
    e.preventDefault();  //一度railsの処理を止めて、javascriptに渡す
    var formData = new FormData(this);
    var url = $(this).attr('action')//console.logでurlに入ってる値を確認
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html)
      $('.form').val('');
       //送信後フォームを空に
      // autoScroll();
      $(".chat-main__messages").animate({scrollTop:10000});

      })

    .fail(function(){
      alert('error');//送信できなければエラーのアラート
    })
  })

});




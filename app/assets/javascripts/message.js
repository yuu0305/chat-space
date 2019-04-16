$(function(){
  // 画面に表示する、自分が設定したHTML（検証から取ってくる）
  function buildHTML(message){

    var img_part = ``;
    if(message.image != null){
      img_part =`<img class="lower-message__image" src="${message.image}">`;
    }

    var msg_part = ``;
    if(message.content != null){
      msg_part = `${message.content}`;
    }

    var html = `<div class="chat-main__messages__message" data-id="${message.id}">
                <div class="chat-main__messages__message__upper">
                <div class="chat-main__messages__message__upper__user-name">
                ${message.user_name}
                </div>
                <div class="chat-main__messages__message__upper__date">
                ${message.created_at}
                </div>
                </div>
                <div class="chat-main__messages__message__lower">
                <div class="chat-main__messages__message__lower__content">
                ${msg_part} ${img_part}`;
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
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__messages').append(html)
      $('.new_message')[0].reset();
       //送信後フォームを空に
      $(".chat-main__messages").animate({scrollTop:10000});

      })

    .fail(function(){
      alert('error');//送信できなければエラーのアラート
    });
  });


  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    if ($(".chat-main__messages__message")[0]){
      var last_message_id = $(".chat-main__messages__message").last().data('id');
    }else{
      var last_message_id = 0;
    }
    $.ajax({
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id}     //dataオプションでリクエストに値を含める
    })
    .done(function(data) {
      $.each(data, function(i, data){
        $('.chat-main__messages').append(buildHTML(data));
        $('.chat-main__messages').animate({scrollTop:10000});
      });
    })

    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});




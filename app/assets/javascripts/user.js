$(document).on('turbolinks:load', function(){

  var search_list = $("#user-search-result");//取ってきたユーザーの名前をどこに表示するか

  function appendUser(user) {
    var html = `
      <div class="js-user-seaerch-result">
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
        </div>
      </div>`//検証を参照

      search_list.append(html);
  }  //appendで各要素に引数で指定したコンテンツを追加する。

  function appendErrMsgToHTML(msg) {
    var html = `<div class='chat-group-user clearfix'>該当するユーザーはいません</div>`
    search_list.append(html);
  }


  function buildHTML(id,name){
    var html =`<div class="chat-group-user clearfix" id=chat-group-user-${id}>
                  <input type="hidden" name="group[user_ids][]" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}">削除</a>
                </div>`
            return html;
  }


  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();//フォームに入力した値を取得して代入
    $.ajax({
      url:"/users",
      type:"GET",
      data:{ name: input},
      dataType: 'json',
    })

    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0 && input.length !== 0 ) {
        users.forEach(function(user){
          appendUser(user);

    });
      }else {
        appendErrMsgToHTML()
      }
    })
    .fail(function() {
      alert('検索に失敗しました');
    });
  });

//追加の処理
  $(document).on('click',".user-search-add",function(){
    var id = $(this).data('user-id');//上記のdataで設定してる
    var name = $(this).data('user-name');//同じ
    var insertHTML = buildHTML(id,name);
    $("#chat-group-users").append(insertHTML);//メンバーリストに追加する
    $(this).parent('.chat-group-user').remove();
    $("#user-search-field").val("");//空にする
  })

//削除ボタンで削除
  $(document).on('click',".user-search-remove" ,function(){
    var id = $(this).data('user-id');
    $(`#chat-group-user-${id}`).remove();
  })
});




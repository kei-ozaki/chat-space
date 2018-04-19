$(function(){
  var usResult = $("#user-search-result");

  function appendUser(user){
    var html =  `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>
                `
    usResult.append(html);
  };

  function appendNoUser(user){
    var html =  `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user}</p>
    </div>
                `
    usResult.append(html);
  };

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    if (input.length !== 0) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users){
        usResult.empty();
        if (users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーがいません");
        };
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました")
      })
    }
  });

  function addUser(userId, userName){
    var html = `
    <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${userId}'>
      <p class='chat-group-user__name'>${userName}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>
    `
    $("#chat-group-users").append(html)
  };

  usResult.on('click', '.chat-group-user__btn--add', function(){
    var userId   = $(this).data('user-id')
    var userName = $(this).data('user-name')
    addUser(userId, userName);
    $(this).parent().remove();
  });

  $("#chat-group-users").on('click', '.chat-group-user__btn--remove', function(){
   $(this).parent().remove();
  });
});

$(function(){

  var searchList = $("#user-search-result");

  function appendUser(user){
    var html =  `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>
                `
    // console.log(html);
    searchList.append(html);
  };

  function appendNoUser(user){
    var html =  `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>
                `
    searchList.append(html);
  };

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    // console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      searchList.empty();
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
  });
});

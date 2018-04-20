$(function(){

  function buildHTML(message){
    var html = `
               <div class="message-content" data-message-id="${message.id}">
                 <div class="name-date">
                   <div class="user-name">
                     ${message.name}
                   </div>
                   <div class="date">
                     ${message.date}
                   </div>
                 </div>
                 <div class="message">
                   ${message.text}
                   ${message.image ? '<img src = "'+ message.image +'">' : ""}
                 </div>
               </div>
               `
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.chat').append(html)
      $('.textform').val('')
      $('.hidden').val('')
      $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight})
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  return false;
  });

  var interval = setInterval(function(){
    var messageId = $('.message-content').last().data("messageId");
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: location.href,
        data: {id: messageId},
        dataType: 'json'
      })
      .done(function(data){
        var insertHTML = "";
        data.messages.forEach(function(message){
          insertHTML += buildHTML(message);
        });
        $('.chat').append(insertHTML);
        $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight})
      })
      .fail(function(data){
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }
  }, 5000);
});

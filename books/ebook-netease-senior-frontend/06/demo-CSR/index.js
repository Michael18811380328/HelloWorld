$(function() {
  $('button').click(function() {
    $.ajax({
      type: 'post',
      url: 'http://localhost/login/check.php',
      data: {
        username: $(':text').val(),
        password: $('password').val(),
      },
      dataType: 'json'
    }).then(function(res) {
      if (res.code === 200) {
        $('h1').html('login success');
      } else {
        $('h1').html('login failed');
      }
    }, function(error) {
      $('h1').html('network error');
    });
  });
});

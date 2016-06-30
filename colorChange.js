$(document).ready(function(){
  $("#request").click(function () {
    if ($(this).text() == "Request"){
      $(this).text("Added");
      $(".img1").css({
        'border': "solid 2px red",
        /*'webkit-filter':'grayscale(100%)'*/
      });
      $(".b1").css({
        'background' : '#ececec'
      });
    }
    else{
      $(this).text("Request");
      $(".img1").css({ // class img1
/*
        'webkit-filter': 'blur(3px)',
*/
        'border': "solid 2px white",
/*        'webkit-filter':'grayscale(0%)' */
      });
      $(".b1").css({
        'background' : 'white'
      });
    };
  });
});

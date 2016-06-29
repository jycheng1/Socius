$(document).ready(function(){
  $("#add").click(function(){
    if ($(this).text() == "Add"){
      $(this).text("Added");
      $(".img1").css({
        'border': "solid 2px red",
        'webkit-filter':'grayscale(100%)'
      });
    }
    else{
      $(this).text("Add");
      $(".img1").css({
        'border':"solid 2px white"
      });
    };
  });
});


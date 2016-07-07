$(document).ready(function(){
  $(".add").click(function(){
    if ($(this).text() == "Add"){
      $(this).text("Added");
      /*
      $("#img1").css({
        
        'webkit-filter':'grayscale(100%)'
        'webkit-filter':'blur(5px)'
      });
       */
     var buttonId = "#".concat(this.name)
      $(buttonId).css({
        'border': "solid 2px green",
        '-webkit-box-shadow':'0px 0px 7px #000000',
        '-moz-box-shadow':'0px 0px 7px #000000',
      });

    }
    else{
      $(this).text("Add");
      /*
      $("#img1").css({
        'webkit-filter':'blur(0px)'
      });
       */
      var buttonId = "#".concat(this.name)
      $(buttonId).css({
        'border': "solid 2px white",
        '-webkit-box-shadow': 'none',
        '-moz-box-shadow':'none',
        'box-shadow':'0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
      });
     
    };
  });
});


var chosen = [];

$(document).ready(function(){
  // for csrf error
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');
  function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
  $.ajaxSetup({
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
  });

  // change the front end when item's selected
  var selected = 0;
  $(".add").click(function(){
    if ($(this).text() === "Add"){
      if (selected != 3){
        selected += 1;
        $(this).text("Added"); // change text
        /*
        $("#img1").css({
          
          'webkit-filter':'grayscale(100%)'
          'webkit-filter':'blur(5px)'
        });
         */
        var buttonId = "#".concat(this.name);
        $(buttonId).css({ // change border of card
          'border': "solid 2px green",
          '-webkit-box-shadow':'0px 0px 7px #000000',
          '-moz-box-shadow':'0px 0px 7px #000000',
        });
        chosen.push(parseInt(this.id));
      }
    }
    else{
      $(this).text("Add");
      selected -= 1;
      /*
      $("#img1").css({
        'webkit-filter':'blur(0px)'
      });
       */
      var buttonId = "#".concat(this.name);
      $(buttonId).css({
        'border': "solid 2px white",
        '-webkit-box-shadow': 'none',
        '-moz-box-shadow':'none',
        'box-shadow':'0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
      });

      // removes elem from list
      var index = chosen.indexOf(parseInt(this.id));
      if(index!=-1){
         chosen.splice(index, 1);
      }      
    };    
  }); // end of selecting 'add'

  // when user checks out products

  $("#checkCart").click(function(){
    for (i = 0; i < chosen.length; i++){
      $('#getArr').append('<input type="hidden" name="ab[]" value="' + chosen[i] + '"/>');
    }
    var comments = $('#suggestions').val();
    $('#getArr').append('<input type="hidden" name="suggestions" value="' + comments + '"/>');
  });
});




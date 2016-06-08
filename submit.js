$(document).ready(function(){
  $("#submitReq").click(function(){
      var dataS = $("#request_form").serialize();

      $.ajax({
      type: 'POST',
      url: 'insert.php',
      data: dataS,
      success: function(){
        sortI("requestDate ASC");
      }
      });
      
      return false;
    });
});





/*
$(document).ready(function(){
  $("#submitReq").click(function(){
      var dataS = $("#request_form").serialize();

      $.ajax({
      type: 'POST',
      url: 'http://localhost:8888/CMLH/insert.php',
      data: dataS,
      success: function(){
        sortI("requestDate ASC");
      }
      });
      
      return false;
    });
});
*/

function f1(){
  var dataS = $("#request_form").serialize();
  $.ajax({
      type: 'POST',
      data: dataS,
      url: 'insert.php',
      success: function(data){
        callBack(data);
      }
      });
}

function callBack(data) {
  return true;
}
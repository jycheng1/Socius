$("#submitReq").click(function(){
 
  var organization = $('#organization').val();
  var address = $('#address').val();
  var request = $('#request').val();

  var postData = 'organization='+organization+'&address='+address+'&request='+request;

  $.ajax({
    url: 'insert.php',
    type: "POST",
    data: postData,
    success: function(data)
    {
      // if success, then output the text to div
      sortI("requestDate ASC");
    },
  });
});
/*
$("#submit").click(function(){
 
  var organization = $('#organization').val();
  var address = $('#address').val();
  var request = $('#request').val();

  var postData = 'organization='+organization+'&address='+address+'&request='+request;

  $.ajax({
    url: "insert.php",
    type: "POST",
    data: postData,
    success: function(data,status,xhr)
    {
      // if success, then output the text to div
      $("table").html(data);
      $('#address').val('');
      $('#brand').val('');
    },
    // else
    error: function(jqXHR, status, errorThrown)
  {
    $("table").html("there was an error: "+errorThrown+' with status '+textStatus);
  }
  });
});


$('#request_form').submit(function(){ return false;});
$('#submit').click(function(){
  $.post($('#request_form').attr('action'),
  $('#request_form:input').serializeArray(),
  function(output){ $('#result').html(output);});});
  */


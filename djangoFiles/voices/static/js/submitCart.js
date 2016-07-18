$(document).ready(function(){
    $("#subFin").click(function(){
        $('#idInfo').submit(); // submits identificatin form 
    //$("#subFin").click(function(){
      var ethnicitySel = $("#ethnicity input[type='radio']:checked").val();
      var nickname = $('#nickname').val();
      
      var email = $('#email').val();

      var birthdate = $('#birthdate').val();
      var b = birthdate.toString();


      // ethnicity info
      $('#submitDem').append('<input type="hidden" name="ethnicitySel" value="' + ethnicitySel + '"/>')

      $('#submitDem').append('<input type="hidden" name="nickname" value="' + nickname + '"/>')
      $('#submitDem').append('<input type="hidden" name="bday" value="' + b + '"/>')
      $('#submitDem').append('<input type="hidden" name="email" value="' + email + '"/>')

      
      $('#submitDem').submit();

    });
});
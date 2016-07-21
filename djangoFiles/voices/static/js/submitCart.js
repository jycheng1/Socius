$(document).ready(function(){
    $("#subFin").click(function(){
        $('#idInfo').submit(); // submits identificatin form 
    //$("#subFin").click(function(){
      
      var zipcode = $('#zipcode').val(); 
      var birthdate = $('#birthdate').val();
      var b = birthdate.toString();

      var gender = $("#gender input[type='radio']:checked").val();
      if (gender === "Other"){
        gender = $('#otherGenderExp').val();
      }


      var ethnicitySel = $("#ethnicity input[type='radio']:checked").val();
      if (ethnicitySel === "Other"){
        ethnicitySel = $('#otherEthExp').val();
      }

      var dietRest = $("#dietaryRest input[type='radio']:checked").val();
      if (dietRest === "Other"){
        dietRest = $('#otherDietExp').val();
      }

      var religiousDiet = $("#religion input[type='radio']:checked").val();
      if (religiousDiet === "Other"){
        religiousDiet = $('#otherReligionExp').val();
      }

      $('#submitDem').append('<input type="hidden" name="zipcode" value="' + zipcode + '"/>')
      $('#submitDem').append('<input type="hidden" name="bday" value="' + b + '"/>')
      $('#submitDem').append('<input type="hidden" name="gender" value="' + gender + '"/>')
      $('#submitDem').append('<input type="hidden" name="ethnicitySel" value="' + ethnicitySel + '"/>')
      $('#submitDem').append('<input type="hidden" name="dietRest" value="' + dietRest + '"/>')
      $('#submitDem').append('<input type="hidden" name="religiousDiet" value="' + religiousDiet + '"/>')

      $('#submitDem').submit();

    });
});
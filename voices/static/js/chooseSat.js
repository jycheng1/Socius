$(document).ready(function(){
    $("#satContinue").click(function(){
      var selectedSat = $("#satForm input[type='radio']:checked").val();
      // $('input[name=radioName]:checked', '#satForm').val()
      $('#submitSat').append('<input type="hidden" name="faceChosen" value="' + selectedSat + '"/>')
    });
});

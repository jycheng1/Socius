// is called when the form is submitted
function submitForm(){
  var dataS = $("#request_form").serialize();
  $.ajax({
      type: 'POST',
      data: dataS,
      url: 'insert.php',
      dataType: 'json',
      success: function(data){
        if (!data['isFilled']){
          // there are parts of the form that aren't filled
          document.getElementById('errorMsg').innerHTML=data["message"].replace(/\n/g, "<br />");
        }
        if(data['isFilled']){
          // all text boxes are filled
          document.getElementById('errorMsg').innerHTML="";
          // erases the text in forms after you submit
          $('input[type="text"], textarea').val('');
          $('input[type="text"], text').val('');
        }
        sortI(document.getElementById("sortOp").value); // updates the table
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
      }
      });
}

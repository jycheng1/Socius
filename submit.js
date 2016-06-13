function f1(){
  var dataS = $("#request_form").serialize();
  $.ajax({
      type: 'POST',
      data: dataS,
      url: 'insert.php',
      dataType: 'json',
      success: function(data){
        if (!data['isFilled']){
          document.getElementById('errorMsg').innerHTML=data["message"];
        }
        if(data['isFilled']){
          document.getElementById('errorMsg').innerHTML="";
        }
        sortI(document.getElementById("sortOp").value);
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
      }
      });
}

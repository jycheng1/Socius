$(document).ready(function() {
  // Send delete Ajax request to response.php
  $("body").on("click", ".del_button", function(e) {
    e.preventDefault();
    var clickedReq = this.id.split('-'); //Split req string (Split works as PHP explode)
    var req = clickedReq[1]; 
    var myData = 'recordToDelete='+ req; //build a post data structure
         
    jQuery.ajax({
      type: "POST", 
      url: "donate.php", //Where to make Ajax calls
      dataType:"text", // Data type, HTML, json etc.
      data:myData, //Form variables
      success:function(response){
        sortA(document.getElementById("sortOp").value);
      },
      error:function (xhr, ajaxOptions, thrownError){
          //On error, we alert user
          alert(thrownError);
      }
    });
  });

});

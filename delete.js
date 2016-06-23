$(document).ready(function() {
  // Send delete Ajax request to response.php
  $("body").on("click", "#responds .del_button", function(e) {
    e.preventDefault();
    var clickedReq = this.id.split('-'); //Split req string (Split works as PHP explode)
    var DbNumberReq = clickedReq[1]; 
    var myData = 'recordToDelete='+ DbNumberReq; //build a post data structure
         
    $('#item_'+DbNumberReq).addClass( "sel" ); //change background of this element by adding class
    $(this).hide(); //hide currently clicked delete button
       
      jQuery.ajax({
      type: "POST", 
      url: "delete.php", //Where to make Ajax calls
      dataType:"text", // Data type, HTML, json etc.
      data:myData, //Form variables
      success:function(response){
          //on success, hide  element user wants to delete.
          $('#item_'+DbNumberReq).fadeOut();
      },
      error:function (xhr, ajaxOptions, thrownError){
          //On error, we alert user
          alert(thrownError);
      }
      });
  });

});

$(document).ready(function(){
  function insertI(action,id){
    if(action =="save")
      data = $("#userinfo").serialize()+"&amp;action="+action;
    else if(action == "delete"){
      data = "action="+action+"&amp;item_id="+id;
    }

    $.ajax({
      type: "POST", 
      url: "ajax.php", 
      data : data,
      dataType: "json",
      success: function(response){
        sortI("requestDate ASC");
      },
      error: function(res){
        alert("Unexpected error! Try again.");
      }
    });
  }
});

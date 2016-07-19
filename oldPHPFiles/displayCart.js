// is called when we want to display elements in the cart

function displayCart(){
  var dataC = '<?php echo $_SESSION["cart"]?>';
  $.ajax({
    type: 'POST',
    url: 'cartDisplay.php',
    data: dataC,
    dataType: "text",
    sucess: function(data){
          }
    });
}

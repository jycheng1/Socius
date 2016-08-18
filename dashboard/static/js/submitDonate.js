$(document).ready(function(){
    $("#confDon").click(function(){

        var order_number = $('#order_number').val(); 
        $('#donForm').append('<input type="hidden" name="orderNum" value="' + order_number + '"/>')
      
        $('#donForm').submit();

    });
});
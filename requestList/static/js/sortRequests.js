// function sortR(sortType){
//   $.ajax({
//     type: 'POST',
//     url: "request1",
//     data : { 'sortType': sortType},
//     success : function(json) {
//       $("#demo").html("");
//       console.log(sortType);
//     }
//   });
// }

// $(document).ready(function(){
var options = {
valueNames: [ 'date', 'request1', 'request2', 'request3' ]
};

var userList = new List('users', options);
// });
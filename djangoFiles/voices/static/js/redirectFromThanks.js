$(document).ready(function(){
    setTimeout(function() {
         $.get("{% url 'voices:index' %}") // Do something after 5 seconds
    }, 2000);
})

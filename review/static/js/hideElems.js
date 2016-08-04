function format(value) {
  return '<div class="slider">'+
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            '<tr>'+
                '<td>Full name:</td>'+
                '<td>'+value+'</td>'+
            '</tr>'+
        '</table>' +
        '</div>';
}

$(document).ready(function () {
  var table = $('#reqTable').DataTable({});
  $("#reqTable").dataTable().fnDestroy();

  $(".expand").click(function(event) {
    var tr = $(this).closest('tr');
    var row = table.row( tr );

    if ( row.child.isShown() ) {
        // This row is already open - close it
        $('div.slider', row.child()).slideUp( function () {
            row.child.hide();
            tr.removeClass('shown');
        } );
    }
    else {
        // Open this row
        row.child( format(" alsdkf"), 'no-padding' ).show();
        tr.addClass('shown');

        $('div.slider', row.child()).slideDown();
    }
  });
});

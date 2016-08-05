function format(value) {
      var splitArr = value.split(" - ");
      return '<div class="slider">'+
            '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                '<tr>'+ 
                    '<td>Reason for choosing ' + splitArr[1] + '</td>'+
                    '<td>'+ ': ' + splitArr[4] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Reason for choosing ' + splitArr[2] + '</td>'+
                    '<td>'+ ': ' + splitArr[5] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Reason for choosing ' + splitArr[3] + '</td>'+
                    '<td>'+ ': ' +  splitArr[6] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Satisfaction: ' + '</td>'+
                    '<td>'+ splitArr[7] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Additional requests: ' + '</td>'+
                    '<td>'+ splitArr[8] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Ethnicitiy: ' + '</td>'+
                    '<td>'+ splitArr[9] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Zip Code: ' + '</td>'+
                    '<td>'+ splitArr[10] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Birthday: ' + '</td>'+
                    '<td>'+ splitArr[11] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Gender: ' + '</td>'+
                    '<td>'+ splitArr[12] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Dietary restrictions: ' + '</td>'+
                    '<td>'+ splitArr[13] +'</td>'+
                '</tr>'+
                '<tr>'+ 
                    '<td>Religious restrictions: ' + '</td>'+
                    '<td>'+ splitArr[14] +'</td>'+
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
            row.child(format(tr.data('child-value')), 'no-padding' ).show();
            tr.addClass('shown');

            $('div.slider', row.child()).slideDown();
        }
      });
    });
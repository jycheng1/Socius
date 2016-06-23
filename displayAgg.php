<html>
<body>
<?php
require('../../secureHtdocs/conn.php'); // connect to socius database

$q = (string)($_GET['q']);

// query database


$query = "SELECT requestDate, request, quantity FROM reqAgg ORDER BY ".$q."";

// reqponse from query
$response = @mysqli_query($conn, $query);

// runs if query executes properly
if($response){
echo '<table align="left"
cellspacing="5" cellpadding="8">
<tr><td align="left"><b>Request</b></td>
<td align="left"><b>Quantity</b></td>';

// mysqli_fetch_array returns an array
while($row = mysqli_fetch_array($response))
{
  echo '<li id="item_'.$row["request"].'">'; 
  echo '<tr><td align="left">' .
  $row['request'] . '</td><td align="left">' .
  $row['quantity'] . '</td><td align="left">';
  echo '<div class="del_wrapper"><a href="#" class="del_button" id="del-'.
    $row["request"].'">' . 'donate';
  // echo '<img src="icon_del.gif" border="0" />';
  echo '</a></div>';
  echo '</li>';
  echo '</tr>';
}	 
echo '</table>';
}
 
else{ 
  echo "Couldn't issue database query<br />";
  echo mysqli_error($dbc);
}

mysqli_close($conn);
?>
</body>
</head>

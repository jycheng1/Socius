<html>
<body>
<?php
require('../../secureHtdocs/conn.php'); // connect to socius database

$q = (string)($_GET['q']);

// query database
$query = "SELECT requestDate, request1, request2, 
  request3 FROM resources ORDER BY ".$q."";

// reqponse from query
$response = @mysqli_query($conn, $query);

// runs if query executes properly
if($response){
echo '<table align="left"
cellspacing="5" cellpadding="8">
<tr><td align="left"><b>Request Date</b></td>
<td align="left"><b>Request 1</b></td>
<td align="left"><b>Request 2</b></td>
<td align="left"><b>Request 3</b></td>';

// mysqli_fetch_array returns an array
while($row = mysqli_fetch_array($response)){

echo '<tr><td align="left">' .
$row['requestDate'] . '</td><td align="left">' .
$row['request1'] . '</td><td align="left">' .
$row['request2'] . '</td><td align="left">' .
$row['request3'] . '</td><td align="left">';

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

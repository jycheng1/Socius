<?php
require('../../secureHtdocs/conn.php'); // connect to socius database

// query database
$query = "SELECT requestDate, requestSummary, organization, address, 
	lattitude, longitude FROM resources";
// reqponse from query
$response = @mysqli_query($conn, $query);

// runs if query executes properly
if($response){
echo '<table align="left"
cellspacing="5" cellpadding="8">
<tr><td align="left"><b>Request Date</b></td>
<td align="left"><b>Request Summary</b></td>
<td align="left"><b>Organization</b></td>
<td align="left"><b>Address</b></td>
<td align="left"><b>Lattitude</b></td>
<td align="left"><b>Longitutde</b></td></tr>';

// mysqli_fetch_array returns an array
while($row = mysqli_fetch_array($response)){

echo '<tr><td align="left">' .
$row['requestDate'] . '</td><td align="left">' .
$row['requestSummary'] . '</td><td align="left">' .
$row['organization'] . '</td><td align="left">' .
$row['address'] . '</td><td align="left">' .
$row['lattitude'] . '</td><td align="left">' .
$row['longitude'] . '</td><td align="left">';

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

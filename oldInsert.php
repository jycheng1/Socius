<html>
<body>
<?php

if(isset($_POST['submit'])){
  $data_missing = array();
  if(empty($_POST['request'])){
    // Add request date to array
    $data_missing[] = 'request summary';  
  } else{
    // trim white space
    $r_sum = trim($_POST['request']);
  } 
  if(empty($_POST['organization'])){
    // Add request date to array
    $data_missing[] = 'organization';  
  } else{
    // trim white space
    $org = trim($_POST['organization']);
  }
  if(empty($_POST['address'])){
    // Add request date to array
    $data_missing[] = 'address';  
  } else{
    // trim white space
    $add = trim($_POST['address']);
  }

  if(empty($data_missing)){
    require_once('../../secureHtdocs/conn.php'); // connect to socius database
  
    // insert into sql database
    $query = "INSERT INTO resources(requestDate, requestSummary, organization, 
	    address, lattitude, longitude, priority)  
	    VALUES (NOW(), ?, ?, ?,0,0,1)";
    
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "sss", $r_sum, $org, $add);
    mysqli_stmt_execute($stmt);
    $affected_rows = mysqli_stmt_affected_rows($stmt);
    if($affected_rows == 1){
      echo "<strong>New record created successfully</strong> <br />";
      echo "<br>";
    } else{
      echo 'Error Occured<br />';
      echo mysqli_error();
      mysqli_stmt_close($stmt);
      mysqli_close($conn);
    }
  } else{
      echo '<strong>You need to enter the following data:</strong> <br />';
      foreach($data_missing as $missing){
        echo "<strong>-$missing</strong><br />";
      }
      echo"<br>";
  }
} 

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
<form action="insert.php" method="post">
    organization: <input type = 'text' name='organization' id='organization'/><br><br>
    address: <input type='text'name='address'id='address'/><br><br>
    Request Summary (200 character limit): <br>
    <textarea name = 'request' id='request'maxlength="200"></textarea><br/>
    <input type='submit' name='submit' value='Submit'/>
</form> 
</body>
</html>

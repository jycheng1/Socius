<html>
<body>
<?php
require_once('../../secureHtdocs/conn.php'); // connect to socius database
  
// insert into sql database
$sql = "INSERT INTO resources(requestDate, requestSummary, organization, 
	  address, lattitude, longitude, priority)  VALUES ('$date', 
	  '$_POST[request]','$_POST[organization]', '$_POST[address]',0,0,1)";
  if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }
//mysqli_close($conn);
?>
</body>
</html>

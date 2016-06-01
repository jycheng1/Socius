<html>
<body>
<?php
  require_once('../../secureHtdocs/conn.php');
  $sql = "INSERT INTO resources(requestDate, requestSummary, organization, address, lattitude, longitude, priority)
  VALUES ('$date', '$_POST[request]','$_POST[organization]', '$_POST[address]',0,0,1)";

  if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
  }

?>
</body>
</html>

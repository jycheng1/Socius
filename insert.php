<?php
//if(isset($_POST['submit'])){
  //$data_missing = array();
  //if(empty($_POST['request'])){
    // Add request date to array
  //  $data_missing[] = 'request summary';  
 // } else{
    // trim white space
    $r_sum = trim($_POST['request']);
  //} 
  //if(empty($_POST['organization'])){
    // Add request date to array
  //  $data_missing[] = 'organization';  
  //} else{
    // trim white space
    $org = trim($_POST['organization']);
  //}
 // if(empty($_POST['address'])){
    // Add request date to array
 //   $data_missing[] = 'address';  
 // } else{
    // trim white space
    $add = trim($_POST['address']);
 // }
//  if(empty($data_missing)){
    require_once('../../secureHtdocs/conn.php'); // connect to socius database
  
    // insert into sql database
    $query = "INSERT INTO resources(requestDate, requestSummary, organization, 
            address, lattitude, longitude, priority)  
            VALUES (NOW(), ?, ?, ?,0,0,1)";
    
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "sss", $r_sum, $org, $add);
    mysqli_stmt_execute($stmt);
    $affected_rows = mysqli_stmt_affected_rows($stmt);
    if(!$affected_rows == 1){
      echo 'Error Occured<br />';
      echo mysqli_error();
      mysqli_stmt_close($stmt);
      mysqli_close($conn);
    }
  //} 
    /*
  else{
      echo '<strong>You need to enter the following data:</strong> <br />';
      foreach($data_missing as $missing){
        echo "<strong>-$missing</strong><br />";
      }
      echo"<br>";

  }
  */
//}
echo "HI";
?>

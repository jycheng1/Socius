<?php
include('../../secureHtdocs/conn.php'); // connect to socius database
$data_missing = array();
$isFilled = true;
// deals with request summary box
  if(empty($_POST['request'])){
    // Add request date to array
    $data_missing[] = 'request summary';  
  } else{
    // trim white space
    $r_sum = trim($_POST['request']);
  } 

// deals with org name box
  if(empty($_POST['organization'])){
    // Add request date to array
    $data_missing[] = 'organization';  
  } else{
    // trim white space
    $org = trim($_POST['organization']);
  }

// deals with address box
  if(empty($_POST['address'])){
    // Add request date to array
    $data_missing[] = 'address';  
  } else{
    // trim white space
    $add = trim($_POST['address']);
  }
  $a = array();
  // enters this if no data is missing
  if(empty($data_missing)){
 
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
    mysqli_close($conn);

    $isFilled=true;
    $a = array( 'isFilled' => true,
        'message' => "none");

  }
  // missing data is not empty, so you have missing form elements
  else{
    $isFilled=false;
    $message = "You need to enter the following data: \n";
    foreach($data_missing as $missing){
      $message = $message . $missing . "\n";
    }
    $a = array( 'isFilled' => false,
      'message' => $message);
    mysqli_close($conn);
  }
  echo json_encode($a);
?>

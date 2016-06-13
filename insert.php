<?php
include('../../secureHtdocs/conn.php'); // connect to socius database
$data_missing = array();

// deals with comments
  // trim white space
  $comm = trim($_POST['comments']);

// deals with org name box
  if(empty($_POST['organization'])){
    // Add org name to array
    $data_missing[] = 'organization';  
  } else{
    // trim white space
    $org = trim($_POST['organization']);
  }

// deals with address box
  if(empty($_POST['address'])){
    // Add address to array
    $data_missing[] = 'address';  
  } else{
    // trim white space
    $add = trim($_POST['address']);
  }
// deals with request dropdown
  if($_POST['request'] == "sel"){
    // add request to array
    $data_missing[] = 'request';  
  } else{
    // trim white space
    $req = trim($_POST['request']);
  }

// enters this if no data is missing
  if(empty($data_missing)){
    $a = array();
 
    // insert into sql database
    
    $query = "INSERT INTO resources(requestDate, requestSummary, organization, 
            address, lattitude, longitude, priority)  
            VALUES (NOW(), ?, ?, ?,0,0,1)";

    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "sss", $comm, $org, $add);
    mysqli_stmt_execute($stmt);
    $affected_rows = mysqli_stmt_affected_rows($stmt);

    if(!$affected_rows == 1){
      echo 'Error Occured<br />';
      echo mysqli_error();
      mysqli_stmt_close($stmt);
      mysqli_close($conn);
    }
    mysqli_close($conn);

    $a = array( 'isFilled' => true,
        'message' => "none");

  }
  // missing data is not empty, so you have missing form elements
  else{
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

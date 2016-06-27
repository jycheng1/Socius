<?php
include('../../secureHtdocs/conn.php'); // connect to socius database
$data_missing = array();

// deals with request dropdown
  if($_POST['request1'] == "sel1"){
    // add request to array
    $data_missing[] = 'request1';  
  } else{
    // trim white space
    $req1 = trim($_POST['request1']);
  }

  if($_POST['request2'] == "sel2"){
    // add request to array
    $data_missing[] = 'request2';  
  } else{
    // trim white space
    $req2 = trim($_POST['request2']);
  }

  if($_POST['request3'] == "sel3"){
    // add request to array
    $data_missing[] = 'request3';  
  } else{
    // trim white space
    $req3 = trim($_POST['request3']);
  }

// enters this if no data is missing
  if(empty($data_missing)){
    $a = array();
 
    // insert into sql database
    
    $query = "INSERT INTO resources(requestDate, request1, request2, 
            request3, why, lattitude, longitude)  
            VALUES (NOW(), ?, ?,?,'why1',0,0)";

    $query1 = "UPDATE reqAgg SET quantity = quantity + 1 WHERE request = ?";
    $query2 = "UPDATE reqAgg SET quantity = quantity + 1 WHERE request = ?";
    $query3 = "UPDATE reqAgg SET quantity = quantity + 1 WHERE request = ?";

    $stmt = mysqli_prepare($conn, $query);
    $stmt1 = mysqli_prepare($conn, $query1);
    $stmt2 = mysqli_prepare($conn, $query2);
    $stmt3 = mysqli_prepare($conn, $query3);
    mysqli_stmt_bind_param($stmt, "sss", $req1, $req2, $req3);
    mysqli_stmt_bind_param($stmt1, "s", $req1);
    mysqli_stmt_bind_param($stmt2, "s", $req2);
    mysqli_stmt_bind_param($stmt3, "s", $req3);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_execute($stmt1);
    mysqli_stmt_execute($stmt2);
    mysqli_stmt_execute($stmt3);
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

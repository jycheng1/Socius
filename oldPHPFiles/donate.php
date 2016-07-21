<?php
include("../../secureHtdocs/conn.php"); // connect to socius database
if(isset($_POST['recordToDelete']))
{	//do we have a delete request? $_POST["recordToDelete"]

  $idToDelete = $_POST['recordToDelete']; 
  
  $query1 = "SELECT quantity FROM reqAgg WHERE request='".$idToDelete."'";
  $result = @mysqli_query($conn, $query1);
  if (!$result){
    echo 'Could not run query: '.mysqli_error($conn);
    exit;
  }
  $row1 = mysqli_fetch_row($result);
  $qty = $row1[0];

        // add the donation into the donations table 
        $query = "INSERT INTO donations(request, quantity) VALUES (?, ?)";
        //try deleting record using the record ID we received from POST
        $query1 = "UPDATE reqAgg SET quantity=0 WHERE request=?";

        $stmt = mysqli_prepare($conn, $query);
        $stmt1 = mysqli_prepare($conn, $query1);
        mysqli_stmt_bind_param($stmt, "si", $idToDelete, $qty);
        mysqli_stmt_bind_param($stmt1, "s", $idToDelete);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_execute($stmt1);
        $affected_rows = mysqli_stmt_affected_rows($stmt);

        if(!$affected_rows == 1){
          echo 'Error Occured<br />';
          echo mysqli_error();
          mysqli_stmt_close($stmt);
          mysqli_close($conn);
        }
        mysqli_close($conn); // close the db connection	
}
else
{
	//Output error
    header('HTTP/1.1 500 Error occurred, Could not process request!');
    exit();
}

?>

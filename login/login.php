<?php
session_start();
include_once 'dbconnect.php';

// is true if the user is already logged on
if(isset($_SESSION['user']))
{
  header("Location: home.php");
}
if(isset($_POST['login']))
{
 $email = mysqli_real_escape_string($conn, $_POST['email']);
 $upass = mysqli_real_escape_string($conn, $_POST['pass']);

 $query = "SELECT * FROM users WHERE email='$email'";
 $response=@mysqli_query($conn, $query);

 $row=mysqli_fetch_array($response);
 if($row['password']==md5($upass))
 {
   $_SESSION['user'] = $row['user_id'];
   //header("Location: home.php");
   echo "worked";
 }
 else
 {
   echo "failed";
 } 
}
?>

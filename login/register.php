<?php
session_start();

// is true if a user is already logged in
if(isset($_SESSION['user']))
{
  header("Location: home.php");
  exit;
}
include_once 'dbconnect.php';

// runs if the user presses the sign up button
if(isset($_POST['signup']))
{
 $uname = mysqli_real_escape_string($conn, $_POST['uname']);
 $email = mysqli_real_escape_string($conn, $_POST['email']);
 // hashes the pw
 $upass = md5(mysqli_real_escape_string($conn, $_POST['pass']));

 $query = "INSERT INTO users(username,email,password) 
   VALUES('$uname','$email','$upass')";

 $response = @mysqli_query($conn, $query);
 
 if($response)
 {
   echo 'successfully registered ';
 }
 else
 {
   echo 'error during registration';
 }
}
?>

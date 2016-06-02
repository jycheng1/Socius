<?php
session_start();
include_once 'dbconnect.php';

if(!isset($_SESSION['user']))
{
 header("Location: login.php");
}
$query = "SELECT * FROM users WHERE user_id='$_SESSION['user']'";

$response=mysqli_query($conn, $query);
$userRow=mysqli_fetch_array($response);
?>

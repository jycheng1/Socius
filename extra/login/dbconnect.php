<?php
$db_name = "dbtest";
$usr = "user1";
$pw = "password1";
$server_name = "128.237.183.217";

$conn = mysqli_connect($server_name, $usr, $pw, $db_name);
if (!$conn){
  die("Connection failed: " . mysqli_connect_error() . PHP_EOL);
}

?>


<?php
ini_set("display_errors", true); //set to false when site is live
date_default_timezone_set("America/New_York");
define ("DB_DSN", "mysql:host=localhost;dbname=socius");
define("DB_USERNAME", "root");
define("DB_PASSWORD","horse7mysql");
define("CLASS_PATH", "classes");
define("TEMPLATE_PATH", "TEMPLATES");
define("ADMIN_USERNAME","admin");
define("ADMIN_PASSWORD","mypass");
//require anything that needs requiring 

function handleException($exception){
  echo "Sorry, a problem occured. Please try later.";
  error_log($exception->getMessage());
}

set_exception_handler('handleException');
?>

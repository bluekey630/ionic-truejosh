<?php
include('functions.php');
header("Access-Control-Allow-Origin: *");

//if (!empty($_GET['id']) && !empty($_GET['riderfrom']) && !empty($_GET['riderdest']) && !empty($_GET['phoneno']) && !empty($_GET['picktype'])) {

	$driverid = $_GET['driverid'];
        $customerid = $_GET['customerid'];
        
	

$con = mysqli_connect("localhost","root","","gocar");
$timezonesql = "SET time_zone = '+08:00'";
  mysqli_query($con, $timezonesql);

	$sql= "update trip set bookstatus='DA',acceptedby='$driverid',acceptedtime=now() where id=$customerid and bookstatus = 'new'";
if(mysqli_query($con, $sql)){
                echo "Records updated successfully.";
            } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }

// Close connection
            mysqli_close($con);

?>

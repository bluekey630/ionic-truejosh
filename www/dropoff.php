<?php
include('functions.php');
header("Access-Control-Allow-Origin: *");

//if (!empty($_GET['id']) && !empty($_GET['riderfrom']) && !empty($_GET['riderdest']) && !empty($_GET['phoneno']) && !empty($_GET['picktype'])) {

	$driverid = $_GET['driverid'];
        $customerid = $_GET['customerid'];
        $totalfare = $_GET['totalfare'];
	

$con = mysqli_connect("localhost","root","","gocar");
	$sql= "update trip set bookstatus='completed',paidamount=$totalfare where id=$customerid and acceptedby = '$driverid' and bookstatus='DA'";
if(mysqli_query($con, $sql)){
                echo "Records updated successfully.";
            } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }

// Close connection
            mysqli_close($con);

?>

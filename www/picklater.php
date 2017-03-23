<?php
include('functions.php');
header("Access-Control-Allow-Origin: *");

//if (!empty($_GET['id']) && !empty($_GET['riderfrom']) && !empty($_GET['riderdest']) && !empty($_GET['phoneno']) && !empty($_GET['picktype'])) {

	$traveldate = $_GET['traveldate'];
        $customerid = $_GET['id'];
        print $traveldate;
        
	

$con = mysqli_connect("localhost","root","","gocar");
	$sql= "update trip set booktime='$traveldate' where id=$customerid and bookstatus = 'new'";
if(mysqli_query($con, $sql)){
                echo "Records updated successfully.";
            } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }

// Close connection
            mysqli_close($con);

?>

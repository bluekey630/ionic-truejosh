<?php
include('functions.php');
header("Access-Control-Allow-Origin: *");

//if (!empty($_GET['id']) && !empty($_GET['riderfrom']) && !empty($_GET['riderdest']) && !empty($_GET['phoneno']) && !empty($_GET['picktype'])) {

	$driverid = $_GET['driverid'];
        $customerid = $_GET['customerid'];
        
	

$con = mysqli_connect("localhost","root","","gocar");

$smt = "SELECT bookstatus FROM trip where id=$customerid and bookstatus='new'";
$res = mysqli_query($con, $smt);
$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}
        echo json_encode($result[0]);
	
//if(mysqli_query($con, $sql)){
//                //echo "Records updated successfully.";
//                $result = array("bookstatus" => "DA", "message" => "Records updated successfully.");
//            } else{
//                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
//            }

// Close connection
            mysqli_close($con);
//            header('Content-type:application/json');
//echo json_encode($result);

?>

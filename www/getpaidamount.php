<?php
	
header("Access-Control-Allow-Origin: *");


	$userid = $_POST['userid'];
        $driverid = $_POST['driverid'];
	
$con = mysqli_connect("localhost","root","","gocar");
	//$res= mysqli_query($con,"SELECT id,name, pickup, destination,booktime,phoneno FROM trip where bookstatus='DA' and acceptedby='$userid'");
        $res= mysqli_query($con,"select paidamount from trip where id=$userid and acceptedby='$driverid'");
	$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}	
	echo json_encode($result);
?>

<?php
include('functions.php');	
header("Access-Control-Allow-Origin: *");

$uid = $_POST['id'];
$con = mysqli_connect("localhost","root","","gocar");
	$res= mysqli_query($con,"SELECT pickup, destination,booktime,picktype,paidamount,bookstatus FROM trip where id='$uid' order by booktime desc limit 0,6");
	$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}	
	echo json_encode($result);
?>

<?php
include('functions.php');	
header("Access-Control-Allow-Origin: *");
$uid = $_POST['id'];
$con = mysqli_connect("localhost","root","","gocar");
	//$res= mysqli_query($con,"SELECT id,name, pickup, destination,booktime,phoneno,pymtmethod,picktype FROM trip where bookstatus='new'");
	$res= mysqli_query($con,"SELECT t.id,t.name,t.pickup,t.destination,t.booktime,t.phoneno,t.pymtmethod,t.picktype FROM trip t,driverdetails d where t.bookstatus='new' and t.picktype = d.cartype and d.id='$uid'");
	$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}	
	echo json_encode($result);
?>

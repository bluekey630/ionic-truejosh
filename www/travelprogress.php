<?php
	
header("Access-Control-Allow-Origin: *");


	$userid = $_POST['driverid'];
        $hourflag = $_POST['hourflag'];
        if($hourflag == "N"){
	
$con = mysqli_connect("localhost","root","","gocar");
	$res= mysqli_query($con,"SELECT id,name, pickup, destination,booktime,phoneno,picktype,packagetype,packagefare,pymtmethod,date_format(acceptedtime, '%H:%i:%s') as 'acceptedtime' FROM trip where bookstatus='DA' and acceptedby='$userid'");
	$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}	
	echo json_encode($result);
        }
        else
        {
         $con = mysqli_connect("localhost","root","","gocar");
	$res= mysqli_query($con,"SELECT TIMESTAMPDIFF(hour,starttime,now()) as hour from trip where bookstatus='DA' and acceptedby='$userid'");
	$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}	
	echo json_encode($result);   
        }
?>

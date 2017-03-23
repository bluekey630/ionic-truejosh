<?php
	
header("Access-Control-Allow-Origin: *");


	$userid = $_POST['custid'];
       
  
	
$con = mysqli_connect("localhost","root","","gocar");
	$res= mysqli_query($con,"SELECT cardnumber,expirationdate FROM passcarddetails where id='$userid'");
	$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}	
	echo json_encode($result);
    
        
?>

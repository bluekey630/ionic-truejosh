<?php

   $picktype = $_GET['picktype'];
        $pkgtype = $_GET['pkgtype'];
        
	

$con = mysqli_connect("localhost","root","","gocar");

$smt = "SELECT price FROM rate where packagetype='$pkgtype' and cartype='$picktype'";
$res = mysqli_query($con, $smt);
$result = array();
	while($row=mysqli_fetch_assoc($res)){
		$result[] = $row;
	}
        echo json_encode($result[0]); 

mysqli_close($con);

?>


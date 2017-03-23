<?php
include('functions.php');	
header("Access-Control-Allow-Origin: *");

/*---------- connect to database ------------*/
$connection = mysqli_connect("localhost", "primefie_js", "5{p;[cGRHy~C");
if (mysqli_connect_errno()){
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
mysqli_select_db($connection, 'primefie_jobsearch');
/*---------- END OF connect to database ------------*/


/*-------- initialization ------------*/
$data = array();
$data_personal = array();
$data = array();
$data = array();
$jobid = $_POST['jobid'];
$userid = $_POST['userid'];


/*-------- END OF initialization ------------*/

/*----------- data retrieval -------------*/

// grab data from personal table
$stmt = mysqli_prepare($connection, "SELECT jobseekerid FROM shortlistedjobseeker WHERE jobid = '$jobid' AND jobseekerid ='$userid'" );
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if(mysqli_stmt_num_rows($stmt)){
	mysqli_stmt_bind_result($stmt, $jobseekerid);
	while(mysqli_stmt_fetch($stmt)){
		$data_personal_row = array();
		$data_personal_row['userid'] = $jobseekerid;
		array_push($data_personal, $data_personal_row);
	}
}
$data['shortListed'] = $data_personal;
mysqli_stmt_close($stmt);
/*----------- END OF data retrieval -------------*/

echo json_encode($data);
?>
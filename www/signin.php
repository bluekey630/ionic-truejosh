<?php
header("Access-Control-Allow-Origin: *");
include('functions.php');	
	
	 $uemail = $_POST['email'];
	 
	$upassword = md5($_POST['password']);
			if(checkUser($uemail, $upassword) == true){
		
				$result = signInUser($uemail, $upassword);
		}else{
			
				$result = array("status" => "1", "message" => "User's not defined.");
		}
		
header('Content-type:application/json');
echo json_encode($result);
?>
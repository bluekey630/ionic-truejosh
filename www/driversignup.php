<?php
include('functions.php');
header("Access-Control-Allow-Origin: *");

if (!empty($_GET['id']) && !empty($_GET['email']) && !empty($_GET['password']) && !empty($_GET['cpassword']) && !empty($_GET['type'])) {

	$uid = $_GET['id'];
	$uemail = $_GET['email'];
	$utype = $_GET['type'];
   $upassword = md5($_GET['password']);
	$ucpassword = md5($_GET['cpassword']);
	if($upassword == $ucpassword){
		$uconfirmpassword = $upassword;

		if(checkEmail($uemail) == true){

			$result = array("status" => "1", "message" => "Email is used. Please choose a new Email.");

		}

		else{
				$adduser = newUser($uid, $uconfirmpassword, $uemail, $utype);

				if($adduser == true){

					$result = array("status" => "0", "id" =>$uid, "message" => "Sign up success.");
                                        

				}

				else{

					$result = array("status" => "1", "message" => "Sign up fail.");	

				}

			

			

		}

		

	}

	else{

		$result = array("status" => "2", "message" => "Password Wrong.");

	}


        
} else 
{

$result = array("status" => "Error");
}

header('Content-type:application/json');
echo json_encode($result);

?>
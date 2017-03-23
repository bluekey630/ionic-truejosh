<?php
include('functions.php');	
header("Access-Control-Allow-Origin: *");

//if (!empty($_GET['id']) && !empty($_GET['riderfrom']) && !empty($_GET['riderdest']) && !empty($_GET['phoneno']) && !empty($_GET['picktype'])) {

        $uid = $_GET['id'];
	$ucardnumber = $_GET['cardnumber'];
	$uexpirationdate = $_GET['expirationdate'];
	$ucvv = $_GET['cvv'];
        
        $link = mysqli_connect("localhost", "root", "", "gocar");
             
            // Check connection
            if($link === false){
                die("ERROR: Could not connect. " . mysqli_connect_error());
            }
			$res= "SELECT * FROM passcarddetails where id='$uid'";
			$result1=mysqli_query($link,$res);
			$row_cnt=mysqli_num_rows($result1);
             if($row_cnt >0){
				 $sql= "update passcarddetails set cardnumber='$ucardnumber',expirationdate='$uexpirationdate',cvv='$ucvv' where id='$uid'";
				 mysqli_query($link, $sql);
			 }
			 else{
				 
			// Attempt insert query execution
            //$sql = "INSERT INTO trip (id, pickup, drop, phoneno, picktype) VALUES ('1','tt','gg','55','st');";
            
            $sql = "INSERT INTO passcarddetails(id, cardnumber,expirationdate,cvv) VALUES ('$uid','$ucardnumber','$uexpirationdate','$ucvv');";
            if(mysqli_query($link, $sql)){
                echo "Records added successfully.";
            } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }
             }
            // Close connection
            mysqli_close($link);
    
      


?>


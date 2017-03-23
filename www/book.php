<?php
include('functions.php');	
header("Access-Control-Allow-Origin: *");

//if (!empty($_GET['id']) && !empty($_GET['riderfrom']) && !empty($_GET['riderdest']) && !empty($_GET['phoneno']) && !empty($_GET['picktype'])) {

	$uid = $_GET['id'];
	$uriderfrom = $_GET['riderfrom'];
	$uriderdest = $_GET['riderdest'];
        $uphoneno = $_GET['phoneno'];
        $upicktype = $_GET['picktype'];
        $uname = $_GET['name'];
        $upack = $_GET['pack'];
        $ufare = $_GET['fare'];
        $upymttype= $_GET['pymttype'];
        $link = mysqli_connect("localhost", "root", "", "gocar");
             
            // Check connection
            if($link === false){
                die("ERROR: Could not connect. " . mysqli_connect_error());
            }
             
            // Attempt insert query execution
            //$sql = "INSERT INTO trip (id, pickup, drop, phoneno, picktype) VALUES ('1','tt','gg','55','st');";
            $timezonesql = "SET time_zone = '+08:00'";
            mysqli_query($link, $timezonesql);
            $sql = "INSERT INTO trip(id, pickup,phoneno,picktype,destination,name,bookstatus,packagetype,packagefare,booktime,pymtmethod) VALUES ('$uid','$uriderfrom','$uphoneno','$upicktype','$uriderdest','$uname','new','$upack','$ufare',now(),'$upymttype');";
            if(mysqli_query($link, $sql)){
                echo "Records added successfully.";
            } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }
             
            // Close connection
            mysqli_close($link);
    
      


?>


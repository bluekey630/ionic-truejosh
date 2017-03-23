<?php
require("PHPMailer_5.2.0/class.PHPMailer.php");
include('functions.php');	
header("Access-Control-Allow-Origin: *");

//if (!empty($_GET['id']) && !empty($_GET['riderfrom']) && !empty($_GET['riderdest']) && !empty($_GET['phoneno']) && !empty($_GET['picktype'])) {

	$uid = $_GET['id'];
	$uname = $_GET['name'];
	$ucarmodel = $_GET['carmodel'];
        $ucartype = $_GET['cartype'];
        $ucarnumber = $_GET['carnumber'];
        $umobilenumber = $_GET['mobilenumber'];
        $link = mysqli_connect("localhost", "root", "", "gocar");
             
            // Check connection
            if($link === false){
                die("ERROR: Could not connect. " . mysqli_connect_error());
            }
             
            // Attempt insert query execution
            //$sql = "INSERT INTO trip (id, pickup, drop, phoneno, picktype) VALUES ('1','tt','gg','55','st');";
            
            $sql = "INSERT INTO driverdetails(id, name,carmodel,cartype,carnumber,mobilenumber) VALUES ('$uid','$uname','$ucarmodel','$ucartype','$ucarnumber','$umobilenumber');";
            if(mysqli_query($link, $sql)){
                echo "Records added successfully.";
                
                $mail = new PHPMailer;

//Enable SMTP debugging. 
$mail->SMTPDebug = 3;                               
//Set PHPMailer to use SMTP.
$mail->isSMTP();            
//Set SMTP host name                          
$mail->Host = "smtp.gmail.com";
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;                          
//Provide username and password     
$mail->Username = "gocarglobal@gmail.com";                 
$mail->Password = "gocarglobal45";                           
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";                           
//Set TCP port to connect to 
$mail->Port = 587;                                   

//$mail->From = "hildontravel@gmail.com";
$mail->FromName = $uname;

//To Address
$mail->addAddress("abdulrashidsidin@gmail.com", "Admin");
$mail->addAddress("indolimo@gmail.com", "Admin");


$mail->isHTML(true);

$mail->Subject = "New Driver Signup";
$mail->Body = "<i>Interested In True JOSH</i> <br/><br/>Name: $uname <br/><br/>Car Model :$ucarmodel <br/><br/> Car Type : $ucartype <br/><br/>Car Number: $ucarnumber <br/><br/>Mobile Number: $umobilenumber ";
//$mail->AltBody = "This is the plain text version of the email content";

if(!$mail->send()) 
{
    echo "Mailer Error: " . $mail->ErrorInfo;
} 
else 
{
    echo "Message has been sent successfully";
}
            } else{
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }
             
            // Close connection
            mysqli_close($link);
    
      


?>


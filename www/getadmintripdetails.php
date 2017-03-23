<?php
require("PHPMailer_5.2.0/class.PHPMailer.php");
header("Access-Control-Allow-Origin: *");
$fh = fopen($_SERVER['DOCUMENT_ROOT'].'/trips.csv', 'w');

$con = mysqli_connect("localhost","root","","gocar");
	$res= mysqli_query($con,"SELECT id,name,pickup,destination,picktype,paidamount,packagefare,bookstatus,booktime,acceptedtime FROM trip order by booktime DESC");
	$output = "ID\tName\tPickup\tDestination\tPickType\tPaidamount\tPackageFare\tPymtMethod\tBookTime\tAcceptedTime\n";
         fwrite($fh,$output);
	while($row=mysqli_fetch_assoc($res)){

    $last = end($row);
   
    foreach ($row as $item) {
        fwrite($fh, $item);
        if ($item != $last)
            fwrite($fh, "\t");
    }
    fwrite($fh, "\n");
}
fclose($fh);

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
$mail->FromName = "TrueJOSHAdmin";

//To Address
//$mail->addAddress("jesuben.sg@gmail.com", "Admin");
$mail->addAddress("mark.yong@primefieldgroup.com", "Admin");
$mail->addAddress("markyongty@yahoo.com", "Admin");
//$mail->addAddress("indolimo@gmail.com", "Admin");


$mail->isHTML(true);

$mail->Subject = "Admin Report";
$mail->Body = "<i>Admin Report</i> <br/><br/>";
$mail->AddAttachment($_SERVER['DOCUMENT_ROOT'].'/trips.csv');
//$mail->AltBody = "This is the plain text version of the email content";

if(!$mail->send()) 
{
    echo "Mailer Error: " . $mail->ErrorInfo;
} 
else 
{
    echo "Message has been sent successfully";
}
            
    
      
?>
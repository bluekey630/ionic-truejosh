<?php

require("PHPMailer_5.2.0/class.PHPMailer.php");

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
$mail->FromName = "test@gmail.com";

//To Address
$mail->addAddress("saguhildon.sg@gmail.com", "Recepient Name");

$mail->isHTML(true);

$mail->Subject = "New Driver Signup";
$mail->Body = "<i>Interested In True JOSH</i>";
//$mail->AltBody = "This is the plain text version of the email content";

if(!$mail->send()) 
{
    echo "Mailer Error: " . $mail->ErrorInfo;
} 
else 
{
    echo "Message has been sent successfully";
}
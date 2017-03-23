<?php
require_once '_environment.php';
 
function braintree_text_field($label, $name, $result) {
    echo('<div>' . $label . '</div>');
    $fieldValue = isset($result) ? $result->valueForHtmlField($name) : '';
    echo('<div><input type="text" name="' . $name .'" value="' . $fieldValue . '" /></div>');
    $errors = isset($result) ? $result->errors->onHtmlField($name) : array();
    foreach($errors as $error) {
        echo('<div style="color: red;">' . $error->message . '</div>');
    }
    echo("\n");
}
?>

 
<html>
    <head>
        <title>Braintree Transparent Redirect</title>
        
    </head>
    <body>
        <?php
        if (isset($_GET["id"])) {
            $result = Braintree_TransparentRedirect::confirm($_SERVER['QUERY_STRING']);
        }
        if (isset($result) && $result->success) { ?>
      
        
            <h1>Braintree Transparent Redirect Response</h1>
            <?php $transaction = $result->transaction; ?>
            <table>
                <tr><td>transaction id</td><td><?php echo htmlentities($transaction->id); ?></td></tr>
                <tr><td>transaction status</td><td><?php echo htmlentities($transaction->status); ?></td></tr>
                <tr><td>transaction amount</td><td><?php echo htmlentities($transaction->amount); ?></td></tr>
                <tr><td>customer first name</td><td><?php echo htmlentities($transaction->customerDetails->firstName); ?></td></tr>
                <tr><td>customer last name</td><td><?php echo htmlentities($transaction->customerDetails->lastName); ?></td></tr>
                <tr><td>customer email</td><td><?php echo htmlentities($transaction->customerDetails->email); ?></td></tr>
                <tr><td>credit card number</td><td><?php echo htmlentities($transaction->creditCardDetails->maskedNumber); ?></td></tr>
                <tr><td>expiration date</td><td><?php echo htmlentities($transaction->creditCardDetails->expirationDate); ?></td></tr>
                              
            </table>
        <?php
        } else {
            if (!isset($result)) { $result = null; } ?>
            <h1>Braintree Transparent Redirect Example</h1>
            <?php if (isset($result)) { ?>
                <div style="color: red;"><?php echo $result->errors->deepSize(); ?> error(s)</div>
            <?php } ?>
            <form method="POST" action="<?php echo Braintree_TransparentRedirect::url() ?>" autocomplete="off">
                <fieldset>
                    <legend>Customer</legend>
                    <?php braintree_text_field('First Name', 'transaction[customer][first_name]', $result); ?>
                    <?php braintree_text_field('Last Name', 'transaction[customer][last_name]', $result); ?>
                    <?php braintree_text_field('Email', 'transaction[customer][email]', $result); ?>
                </fieldset>
            
                <fieldset id="payinfo">
                    <legend>Payment Information</legend>
                    
                    <?php 
                    

                if (isset($_GET['amt'])&& isset($_GET['passid'])&& isset($_GET['driverid']) ) { 
                    $amount= $_GET['amt']; 
                    $passid= $_GET['passid'];
                    $driverid=$_GET['driverid'];
                  
    
                    } else { 
                    echo 'foo not set'; 
                    } 
                    
                    ?>
                    <?php
                    $con = mysqli_connect("localhost","root","","gocar");
                    $res= mysqli_query($con,"SELECT cardnumber FROM passcarddetails where id='$passid'");
                    $result1 = array();
                    while($row=mysqli_fetch_assoc($res)){
                        $result1["cardnumber"] = $row["cardnumber"];
                    }	
                    //echo json_encode($result1["cardnumber"]);
                     $cardnumber = $result1["cardnumber"];
                    //print $cardnumber;
               
                     ?>
                    <?php
                    $link = mysqli_connect("localhost","root","","gocar");
                    $resexp= mysqli_query($link,"SELECT expirationdate FROM passcarddetails where id='$passid'");
                    $resultexp = array();
                    while($rowexp=mysqli_fetch_assoc($resexp)){
                    $resultexp["expirationdate"] = $rowexp["expirationdate"];
                    }	
                    
                    $expirationdate = $resultexp["expirationdate"];
                    ?>
                    <?php
                    
                    $con1 = mysqli_connect("localhost","root","","gocar");
                    $sql= "update trip set bookstatus='completed',paidamount='$amount' where id='$passid' and acceptedby = '$driverid' and bookstatus='DA'";
                    if(mysqli_query($con1, $sql)){
                        echo "Records updated successfully.";
                     } else{
                        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
                    }
                    mysqli_close($con1);
                    ?>
                    <label>Card Number: <input type="text" name="transaction[credit_card][number]" value="<?php echo $cardnumber; ?>"></label><br/><br/>
                    <label>Expiration Date (MM/YY): <input type="text" name="transaction[credit_card][expiration_date]" value="<?php echo $expirationdate; ?>"></label><br/><br/>
                    
                    <label>Amount: <input type="text" name="transaction[amount]" value="<?php echo $amount; ?>"></label>
                   
                </fieldset>
                
                <?php 

                $tr_data = Braintree_TransparentRedirect::transactionData(
                    array('redirectUrl' => "http://" . $_SERVER["SERVER_NAME"] . ":" . $_SERVER["SERVER_PORT"] . parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH),
                    'transaction' => array( 'type' => 'sale'))) ?>
                <input type="hidden" name="tr_data" value="<?php echo $tr_data ?>" />
 
                <br />
                <input type="submit" value="Submit" />
            </form>
        <?php } ?>
    </body>
</html>
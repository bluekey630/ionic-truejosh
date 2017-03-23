
<?php
require('config.php');

function newUser($uid, $upassword, $uemail, $utype) {
	
    $link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysqli_connect_error());
 
    
	//echo "insert into user (id, passvvord, email, type) values ( ?, ?, ?, ?)"; die;
	$query = "insert into user (id, passvvord, email, type) values ( ?, ?, ?, ?)";
	$stmt = mysqli_prepare($link, $query);
	mysqli_stmt_bind_param($stmt, 'ssss', $uid, $upassword, $uemail, $utype);
	mysqli_stmt_execute($stmt);
	// End of prepared statement
	mysqli_stmt_close($stmt);
    mysqli_close($link);
    return true;
}

function newBook($uid, $uriderfrom, $uriderdest, $uphoneno, $upicktype) {
	
    $link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysqli_connect_error());
    print("success");
	    
    $sql = "INSERT INTO trip(id, pickup,phoneno,picktype,destination) VALUES ('$uid','$uriderdest','$uphoneno','$upicktype','$uriderdest');";
        echo "inserted";
        if(mysqli_query($link, $sql)){
            echo "Records added successfully.";
        } else{
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
        }
        //mysqli_query($link, $sql);
	//$stmt = mysqli_prepare($link, $query);
       
	//mysqli_stmt_bind_param($stmt, 'ssss', $uid, $uriderfrom, $uriderdest, $uphoneno, $upicktype);
	  
//	mysqli_stmt_execute($stmt);
//	// End of prepared statement
//	mysqli_stmt_close($stmt);
    mysqli_close($link);
    return true;
        
}

function UserForgot($uemail) {
	
   	$salt = "498#2D83B631%3800EBD!801600D*7E3CC13";

 

        // Create the unique user password reset key

        $password = hash('sha512', $salt.$uemail);

 

        // Create a url which we will direct them to reset their password

        $pwrurl = "http://firstimpression-jobs.com/jobsearch/reset.php?q=".$password."&email=".$uemail;
         $mailbody = "Dear user,\n\nIf this e-mail does not apply to you please ignore it. It appears that you have requested a password reset at our FirstImpression App.\n\nTo reset your password, please click the link below. If you cannot click it, please paste it into your web browser's address bar.\n\n" . $pwrurl ."\n\nThanks,\nThe Administration";
	
		// the message
	$msg = "Hi \n Here is your password Key:".$mtrand;

// use wordwrap() if lines are longer than 70 characters
	$msg = wordwrap($pwrurl,120);

// send email
mail($uemail,"Forget Password",$msg);
		return true;
	

	}

function UserForgot1($uemail) {
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());
	$mtrand=mt_rand(1000, 99000);
	$mrrandnew=md5($mtrand);
	
 	$query = "UPDATE `user` SET `passvvord`='".$mrrandnew."' WHERE `email` = '$uemail'";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		// the message
	$msg = "Hi \n Here is your password Key:".$mtrand;

// use wordwrap() if lines are longer than 70 characters
	$msg = wordwrap($msg,70);

// send email
mail($uemail,"Forget Password",$msg);
		return true;
	}

	
	mysqli_close($link);
}



function signInUser($uemail, $upassword){
	
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());
	$upass =$upassword;
	//echo "SELECT * FROM `user` WHERE email = '$uemail' AND password = '$upass' "; die;
 	$query = "SELECT * FROM `user` WHERE email = '$uemail' AND passvvord = '$upass' ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
	    //$resultArray = array();
		while ($row = mysqli_fetch_array($result)) {
			$resultArray = array("status" => "0" ,"user_id" => $row['id'], "email" => $row['email'], "type" => $row['type'],  "status_level" => $row['status'], "isOnline" => $row['isOnline']); 
		}
		
		return $resultArray;
	}

	mysqli_close($link);
}
function checkUser($uemail, $upassword){
	
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());
	$upass = $upassword;
 	$query = "SELECT * FROM `user` WHERE email = '$uemail' AND passvvord = '$upass'";
	$result = mysqli_query($link, $query);
	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	return true;
	}

	mysqli_close($link);
}
function checkEmail($uemail){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `user` WHERE email = '$uemail' ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	return true;
	}

	mysqli_close($link);
}
function checkUsername($uusername){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `user` WHERE username = '$uusername' ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	return true;
	}

	mysqli_close($link);
}
function linkedinUser($lid, $limage, $lfirstname, $llastname) {
	
    $link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysqli_connect_error());
	$query = "insert into user (id, pictureUrl, firstname, lastname) values ( ?, ?, ?, ?)";
	
	$stmt = mysqli_prepare($link, $query);
	mysqli_stmt_bind_param($stmt, 'ssss', $lid, $limage, $lfirstname, $llastname);
	if($stmt->execute()){
		return true;
	}
	else{
		return false;
	}
	// End of prepared statement
	mysqli_stmt_close($stmt);
    mysqli_close($link);
 
}
function checkLinkedinUser($lid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `user` WHERE id = '$lid' ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	return true;
	}

	mysqli_close($link);
}
function getLinkedinUserDetails($lid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `user` WHERE id = '$lid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "id" => $row['id'], "pictureUrl" => $row['pictureUrl'], "firstName" => $row['firstname'], "lastName" => $row['lastname'], "email" => $row['email'], "phone" => $row['phone'], "type" => $row['type'], "companyName" => $row['company_name'], "companyAddress" => $row['company_address'], "companyPhone" => $row['company_phone'], "education" => $row['education']); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}
function updateLinkedinUserDetails($lid, $lfirstname, $llastname, $lemail, $lphone, $limage, $ueducation, $ustatus_level){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "UPDATE `user` SET pictureUrl = '$limage', firstname = '$lfirstname', lastname = '$llastname', email = '$lemail', phone = '$lphone', education = '$ueducation', status = '$ustatus_level' WHERE id = '$lid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}

	
	mysqli_close($link);
}
function updateCompany($uid, $ucomname, $ucomadd, $ucomphone){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "UPDATE `user` SET company_name = '$ucomname', company_address = '$ucomadd', company_phone = '$ucomphone' WHERE id = '$uid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}

	
	mysqli_close($link);
}
function postJob($comoverview, $comdesc, $jobposition, $jobeducation, $jobsalary, $jobdesc, $uid, $jobexpire){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysqli_connect_error());
	$query = "insert into jobs (company_overview, company_description, job_position, job_education, job_salary, job_description, user_id_fk, job_expire) values ( ?, ?, ?, ?, ?, ?, ?, ?)";
	
	$stmt = mysqli_prepare($link, $query);
	mysqli_stmt_bind_param($stmt, 'ssssisss', $comoverview, $comdesc, $jobposition, $jobeducation, $jobsalary, $jobdesc, $uid, $jobexpire);
	if($stmt->execute()){
		$jid = mysqli_insert_id($link);
		return $jid;
	}
	else{
		return false;
	}
	// End of prepared statement
	mysqli_stmt_close($stmt);
    mysqli_close($link);
}
function getAllJob(){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM  `jobs` ,  `user` WHERE jobs.user_id_fk = user.id COLLATE utf8_unicode_ci ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "employerid" => $row['user_id_fk'], "id" => $row['job_id'], "pictureUrl" => $row['pictureUrl'],  "company_overview" => $row['company_overview'], "company_description" => $row['company_description'], "job_position" => $row['job_position'], "job_education" => $row['job_education'], "job_salary" => $row['job_salary'], "job_description" => $row['job_description'], "timestamp" => $row['timestamp'], "companyName" => $row['company_name'], "companyAddress" => $row['company_address'], "companyPhone" => $row['company_phone'], "job_expire" => $row['job_expire'], "category" => $row["category"]); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}
function getCategory(){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT DISTINCT(industry) FROM  `job`  ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "category" => $row["industry"]); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}
function getJobs(){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM  `job`  ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}


	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("jobid" => $row["jobid"], "industry" => $row["industry"], "title" => $row["title"], "salary" => $row["salary"], "deadline" =>  $row["deadline"], "experience" => $row["experience"], "requirement" => $row["requirement"], "educational" => $row["educational"], "userid" => $row["userid"], "goodtohave" => $row["goodtohave"], "currency" => $row["currency"], "location" => $row["joblocation"]); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}

function getJobsWithCompanyName(){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT job.*,company.industry as comIndustry FROM `job` INNER JOIN `company` ON company.userid = job.userid";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}


	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("jobid" => $row["jobid"], "industry" => $row["industry"],"Com_industry" => $row["comIndustry"], "title" => $row["title"], "salary" => $row["salary"], "deadline" =>  $row["deadline"], "experience" => $row["experience"], "requirement" => $row["requirement"], "educational" => $row["educational"], "userid" => $row["userid"], "goodtohave" => $row["goodtohave"], "currency" => $row["currency"], "location" => $row["joblocation"],"companyname"=> $row["companyname"]); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}

function getCompany($lid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT userid,country,companyname,address,phone,email,website,overview,industry,countrycode FROM `company` WHERE userid = '$lid' ";
 	$result = mysqli_query($link, $query);

 	$imgPath = '/home/primefield/public_html/jobsearch/companyImage/com_'.$lid.'.jpg';
 	$image = file_exists($imgPath);
 	//var_dump($image);abort;

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	
	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("userid" => $row['userid'], "country" => $row['country'], "companyname" => $row['companyname'], "address" => $row['address'], "phone" => $row['phone'], "email" => $row['email'], "website" => $row['website'], "overview" => $row['overview'], "industry" => $row['industry'], "countrycode" => $row['countrycode'], "image" => $image); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}

function like($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "INSERT into `like` (job_id_fk, user_id_fk) values (?, ?) ";
 	$stmt = mysqli_prepare($link, $query);
	mysqli_stmt_bind_param($stmt, 'is', $jobid, $uid);
	if($stmt->execute()){
		return true;
	}
	else{
		return false;
	}
	// End of prepared statement
	mysqli_stmt_close($stmt);
    mysqli_close($link);
}
function unImpressed($jobid, $uid){
	
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "DELETE FROM `impressedjobseeker` WHERE jobid = '$jobid' AND jobseekerID = '$uid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}
	mysqli_close($link);
}
function unlike($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "DELETE FROM `like` WHERE job_id_fk = '$jobid' AND user_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}
	mysqli_close($link);
}
function getCountLike($jobid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT COUNT(user_id_fk) as num_like FROM  `like` WHERE job_id_fk = '$jobid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	while ($row = mysqli_fetch_array($result)) {
			return $row['num_like'];
		}
	}

	mysqli_close($link);
}
function checkLike($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `like` WHERE job_id_fk = $jobid AND user_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	return true;
	}

	mysqli_close($link);
}
function checkApplyJob($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `applicants` WHERE job_id_fk = $jobid AND user_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	return true;
	}

	mysqli_close($link);
}
function applyJob($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "INSERT into `applicants` (job_id_fk, user_id_fk) values (?, ?) ";
 	$stmt = mysqli_prepare($link, $query);
	mysqli_stmt_bind_param($stmt, 'is', $jobid, $uid);
	if($stmt->execute()){
		return true;
	}
	else{
		return false;
	}
	// End of prepared statement
	mysqli_stmt_close($stmt);
    mysqli_close($link);
}
function unapplyJob($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "DELETE FROM `applicants` WHERE job_id_fk = '$jobid' AND user_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}
	mysqli_close($link);
}
function getFavouriteJob($uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM  `jobs` ,  `user`, `like` WHERE `like`.job_id_fk = jobs.job_id AND `like`.user_id_fk = '$uid' AND jobs.user_id_fk = user.id COLLATE utf8_unicode_ci GROUP BY jobs.job_id ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "id" => $row['job_id'], "pictureUrl" => $row['pictureUrl'],  "company_overview" => $row['company_overview'], "company_description" => $row['company_description'], "job_position" => $row['job_position'], "job_education" => $row['job_education'], "job_salary" => $row['job_salary'], "job_description" => $row['job_description'], "timestamp" => $row['timestamp'], "companyName" => $row['company_name'], "companyAddress" => $row['company_address'], "companyPhone" => $row['company_phone'], "job_expire" => $row['job_expire']); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}
function favourite($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "INSERT into `favourite` (job_id_fk, user_id_fk) values (?, ?) ";
 	$stmt = mysqli_prepare($link, $query);
	mysqli_stmt_bind_param($stmt, 'is', $jobid, $uid);
	if($stmt->execute()){
		return true;
	}
	else{
		return false;
	}
	// End of prepared statement
	mysqli_stmt_close($stmt);
    mysqli_close($link);
}
function unfavourite($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "DELETE FROM `favourite` WHERE job_id_fk = '$jobid' AND user_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}
	mysqli_close($link);
}
function checkFavourite($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `favourite` WHERE job_id_fk = $jobid AND user_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	return true;
	}

	mysqli_close($link);
}
function applicantview($jobid, $employerid, $jobseekerid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "INSERT into `viewapplicant` (jobseeker_id_fk, employer_id_fk, job_id_fk) values (?, ?, ?) ";
 	$stmt = mysqli_prepare($link, $query);
	mysqli_stmt_bind_param($stmt, 'ssi', $jobseekerid, $employerid, $jobid);
	if($stmt->execute()){
		return true;
	}
	else{
		return false;
	}
	// End of prepared statement
	mysqli_stmt_close($stmt);
    mysqli_close($link);
}
function getApplicantViewCount($uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());
 	
 	$query = "SELECT COUNT(*) as view_count FROM  `viewapplicant` WHERE jobseeker_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	while ($row = mysqli_fetch_array($result)) {
			return $row['view_count'];
		}
	}

	mysqli_close($link);
}
function getApplicantViewList($uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `jobs`, `user` WHERE `jobs`.job_id IN (SELECT job_id_fk FROM `viewapplicant` WHERE `viewapplicant`.jobseeker_id_fk = '$uid' AND `viewapplicant`.employer_id_fk = `user`.id)  ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "employerid" => $row['id'], "id" => $row['job_id'], "pictureUrl" => $row['pictureUrl'],  "company_overview" => $row['company_overview'], "company_description" => $row['company_description'], "job_position" => $row['job_position'], "job_education" => $row['job_education'], "job_salary" => $row['job_salary'], "job_description" => $row['job_description'], "timestamp" => $row['timestamp'], "companyName" => $row['company_name'], "companyAddress" => $row['company_address'], "companyPhone" => $row['company_phone'], "job_expire" => $row['job_expire'], "category" => $row['category']); 
	}
	

	mysqli_close($link);
	return $resultArray;
}
function pageview($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "INSERT into `viewpage` (job_id_fk, user_id_fk) values (?, ?) ";
 	$stmt = mysqli_prepare($link, $query);
	mysqli_stmt_bind_param($stmt, 'is', $jobid, $uid);
	if($stmt->execute()){
		return true;
	}
	else{
		return false;
	}
	// End of prepared statement
	mysqli_stmt_close($stmt);
    mysqli_close($link);
}
function getPageviewCount($jobid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());
 	
 	$query = "SELECT COUNT(*) as viewpage_count FROM  `viewpage` WHERE job_id_fk = '$jobid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	while ($row = mysqli_fetch_array($result)) {
			return $row['viewpage_count'];
		}
	}

	mysqli_close($link);
}

function getJobViaID($jobid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT jobs.*, user.*  FROM  `jobs` ,  `user` WHERE job_id = $jobid AND `jobs`.user_id_fk = `user`.id COLLATE utf8_unicode_ci  GROUP BY jobs.job_id ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "id" => $row['job_id'], "pictureUrl" => $row['pictureUrl'],  "company_overview" => $row['company_overview'], "company_description" => $row['company_description'], "job_position" => $row['job_position'], "job_education" => $row['job_education'], "job_salary" => $row['job_salary'], "job_description" => $row['job_description'], "timestamp" => $row['timestamp'], "companyName" => $row['company_name'], "companyAddress" => $row['company_address'], "companyPhone" => $row['company_phone'], "job_expire" => $row['job_expire']); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}

function getAllPostedJobViaID($uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT jobs.*, user.*  FROM  `jobs` ,  `user` WHERE jobs.user_id_fk = '$uid' AND user.id = '$uid' AND jobs.deadline >=cast((now() + interval 1 day) as date)  GROUP BY jobs.job_id ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "id" => $row['job_id'], "pictureUrl" => $row['pictureUrl'],  "company_overview" => $row['company_overview'], "company_description" => $row['company_description'], "job_position" => $row['job_position'], "job_education" => $row['job_education'], "job_salary" => $row['job_salary'], "job_description" => $row['job_description'], "timestamp" => $row['timestamp'], "companyName" => $row['company_name'], "companyAddress" => $row['company_address'], "companyPhone" => $row['company_phone'], "job_expire" => $row['job_expire']); 
	}
	mysqli_close($link);
	//echo $user_id;
	return $resultArray;
}
function getApplicantCountPerJob($uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT COUNT(*) as applicant_count FROM applicants, jobs WHERE jobs.job_id = applicants.job_id_fk AND jobs.user_id_fk = '$uid' GROUP BY jobs.job_id ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	
		$resultArray = array();
    	while ($row = mysqli_fetch_array($result)) {
			$resultArray[] = array("applicant_count" => $row['applicant_count']);
		}
	

	mysqli_close($link);
	return $resultArray;
}
function getApplicants($jobid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = " SELECT * FROM `user`, `applicants` appl WHERE user.id IN (SELECT applicants.user_id_fk COLLATE utf8_unicode_ci FROM applicants)  AND appl.user_id_fk = user.id  COLLATE utf8_unicode_ci AND appl.job_id_fk = $jobid GROUP BY user.id  ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	
	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "id" => $row['id'], "username" => $row['username'],  "firstname" => $row['firstname'], "lastname" => $row['lastname'], "email" => $row['email'], "phone" => $row['phone'], "pictureUrl" => $row['pictureUrl'], "education" => $row['education'], "shortlisted" => $row['shortlisted']); 
	}
	

	mysqli_close($link);
	return $resultArray;
}
function getViewPageList($jobid){
	
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = " SELECT * FROM `user`, `viewpage` appl WHERE user.id IN (SELECT viewpage.user_id_fk COLLATE utf8_unicode_ci FROM viewpage)  AND appl.user_id_fk = user.id  COLLATE utf8_unicode_ci AND appl.job_id_fk = $jobid GROUP BY user.id  ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	
	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "id" => $row['id'], "username" => $row['username'],  "firstname" => $row['firstname'], "lastname" => $row['lastname'], "email" => $row['email'], "phone" => $row['phone'], "pictureUrl" => $row['pictureUrl'], "education" => $row['education'], "shortlisted" => $row['shortlisted']); 
	}
	

	mysqli_close($link);
	return $resultArray;
}
function checkShortlist($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `applicants` WHERE job_id_fk = $jobid AND user_id_fk = '$uid' AND shortlisted = 'Yes' ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	if(mysqli_num_rows($result) > 0) {
    	return true;
	}

	mysqli_close($link);
}
function getShortlistViaJobID($jobid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `applicants` WHERE job_id_fk = $jobid ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "job_id" => $row['job_id_fk'], "user_id" => $row['user_id_fk'], "shortlisted" => $row['shortlisted']); 
	}

	mysqli_close($link);
	return $resultArray;
}
function getShortListApplicants($jobid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "SELECT * FROM `user` WHERE user.id COLLATE utf8_unicode_ci IN (SELECT user_id_fk FROM `applicants` WHERE `applicants`.job_id_fk = $jobid AND `applicants`.shortlisted = 'Yes')  ";
 	$result = mysqli_query($link, $query);

	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}

	$resultArray = array();
	while ($row = mysqli_fetch_array($result)) {
		$resultArray [] = array("status" => "0", "id" => $row['id'], "username" => $row['username'],  "firstname" => $row['firstname'], "lastname" => $row['lastname'], "email" => $row['email'], "phone" => $row['phone'], "pictureUrl" => $row['pictureUrl'], "education" => $row['education'], "shortlisted" => $row['shortlisted']); 
	}
	

	mysqli_close($link);
	return $resultArray;
}
function shortlistApplicant($jobid, $uid, $shortlist){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "UPDATE `applicants` SET shortlisted = '$shortlist' WHERE job_id_fk = '$jobid' AND user_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}

	
	mysqli_close($link);
}
function updatePostedJob($jobid, $userid , $companyoverview, $companydesc, $position, $education, $salary, $jobdesc, $jobexpire){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "UPDATE `jobs` SET company_overview = '$companyoverview', company_description = '$companydesc', job_position = '$position', job_education = '$education', job_salary = '$salary', job_description = '$jobdesc', job_expire = '$jobexpire' WHERE job_id = '$jobid' AND user_id_fk = '$userid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}

	
	mysqli_close($link);
}
function removeJob($jobid, $uid){
	$link = mysqli_connect(DBSERVER,DBUSER,DBPASS,DBNAME) or die(mysql_error());

 	$query = "DELETE FROM `jobs` WHERE job_id = '$jobid' AND user_id_fk = '$uid' ";
 	$result = mysqli_query($link, $query);


	if (!$result) {
	    die('MySQL Error: ' . mysql_error());
	    exit;
	}
	else{
		return true;
	}
	mysqli_close($link);
}
?>
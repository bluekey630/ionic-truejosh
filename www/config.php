<?php

session_start();

$location="local";

if ($location == "local") {

    define ("DBSERVER", "localhost", true);

    define ("DBUSER", "root", true);

    define ("DBPASS", "", true);

    define ("DBNAME", "gocar", true);

}

else if($location == "server") {

    define ("DBSERVER", "", true);

    define ("DBUSER", "", true);

    define ("DBPASS", "", true);

    define ("DBNAME", "", true);

}

?>
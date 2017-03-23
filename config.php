<?php

session_start();

$location="local";

if ($location == "local") {

    define ("DBSERVER", "localhost", true);

    define ("DBUSER", "primefie_js", true);

    define ("DBPASS", "5{p;[cGRHy~C", true);

    define ("DBNAME", "primefie_jobsearch", true);

}

else if($location == "server") {

    define ("DBSERVER", "", true);

    define ("DBUSER", "", true);

    define ("DBPASS", "", true);

    define ("DBNAME", "", true);

}

?>
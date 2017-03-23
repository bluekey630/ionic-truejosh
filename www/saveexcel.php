<?php
include_once("excelDownload/xlsxwriter.class.php");
$data = array(
    array('year','month','amount'),
    array('2004','1','220'),
    array('2004','2','153.5'),
);
$writer = new XLSXWriter();
$writer->writeSheet($data);
$writer->writeToFile('output.xlsx');
?>
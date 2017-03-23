<?php 
$from = "Our lady star of sea,Singapore";
$to = "353,yishun ring road,Singapore";
$from = urlencode($from);
$to = urlencode($to);
$data = file_get_contents("http://maps.googleapis.com/maps/api/distancematrix/json?origins=$from&destinations=$to&language=en-EN&sensor=false");
$data = json_decode($data);
$time = 0;
$distance = 0;
foreach($data->rows[0]->elements as $road) {
    $time += $road->duration->value;
    $distance += $road->distance->value;
}
echo "To: ".$data->destination_addresses[0];
echo "<br/>";
echo "From: ".$data->origin_addresses[0];
echo "<br/>";
$distance=$distance/1000;
echo "Distance: ".$distance." km";
/* $default_price=11;
$distance_mile=$distance*1.6;
$price_distance=$default_price*$distance_mile;

if($distance_mile>=25){
    echo "<script>alert('We are sorry. Your address falls outside of our service area and we are unable to deliver/pick up equipment to you at this time.');</script>";
}
elseif($price_distance>=500){
    $price=$price_distance;
}else{
    if($distance_mile<5){
        $price=$price_distance;
    }elseif($distance_mile>5 && $distance_mile<10){
        $price=$default_price + 20;
    }
    elseif($distance_mile>10 && $distance_mile<25){
        $price=$default_price + 30;
    }
}
echo "final price : ".$price; */
?>
<?php

require '../../app/common.php';

$turbineId = intval($_GET['turbineId'] ?? 0);

if($turbineId < 1){
  // 1. Go to the database and get all client
  $sensorTimeSeries = SensorTimeSeries::fetchAll();

  // 2. Convert to JSON u
  $json = json_encode($sensorTimeSeries, JSON_PRETTY_PRINT);

  // 3. Print
  header('Content-Type: application/json');
  echo $json;
}
else {
$sensorTimeSeriesByTurbineId = SensorTimeSeries::fetchTimeSeriesByTurbineId($turbineId, $sensorId);

// 2. Convert to JSON
$json = json_encode($sensorTimeSeriesByTurbineId, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
}


//
// // 1. Go to the database and get all client
// $sensorTimeSeries = SensorTimeSeries::fetchAll();
//
// // 2. Convert to JSON
// $json = json_encode($sensorTimeSeries, JSON_PRETTY_PRINT);
//
// // 3. Print
// header('Content-Type: application/json');
// echo $json;

<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'PostSensorTimeSeries.php';
  exit;
}

// 1. Go to the database and get all client
$sensorTimeSeries = SensorTimeSeries::fetchAll();

// 2. Convert to JSON
$json = json_encode($sensorTimeSeries, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;

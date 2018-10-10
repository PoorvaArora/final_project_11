<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'TurbineDeployedPOST.php';
  exit;
}

// 1. Go to the database and get all client
$turbineDeployed = TurbineDeployed::fetchAll();

// 2. Convert to JSON
$json = json_encode($turbineDeployed, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;

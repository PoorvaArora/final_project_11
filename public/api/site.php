<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sitePost.php'; //do we need to change this and create a sensor post.
  exit;
}

// 1. Go to the database and get all client
$site = Site::fetchAll();

// 2. Convert to JSON
$json = json_encode($site, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;

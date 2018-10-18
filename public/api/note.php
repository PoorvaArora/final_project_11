<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'notePost.php';
  exit;
}

$notesByClientId = Note::fetchNotesByClientId($clientId);

// 2. Convert to JSON
$json = json_encode($notesByClientId, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;

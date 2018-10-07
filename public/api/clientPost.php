<?php

$client = new CLient($_POST);

$client->create();

echo json_encode($client);

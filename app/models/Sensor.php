<?php

class Sensor
{

  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $manufacturer;
  public $totalLifeExpentancyHours;


  public function __construct($data) {
    $this->id = isset($data['sensorId']) ? intval($data['sensorId']) : null;
    $this->sensorName = $data['sensorName'];
    $this->sensorDescription = $data['sensorDescription'];
    $this->manufacturer = $data['manufacturer'];
    $this->totalLifeExpentancyHours = $data['totalLifeExpentancyHours'];

  }
  //
  // public function create() {
  //   $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //   $sql = 'INSERT INTO Comment (comment)
  //           VALUES (?)';
  //
  //   $statement = $db->prepare($sql);
  //
  //   $success = $statement->execute([
  //     $this->comment
  //   ]);
  //
  //   if (!$success) {
  //     // TODO: Better error handling
  //     die('SQL error');
  //   }
  //   $this->id = $db->lastInsertId();
  // }

  public static function fetchAll() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM Sensor';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensor =  new Sensor($row);
      array_push($arr, $theSensor);
    }

    return $arr;
  }

}

<?php

class Turbine
{
  public $turbineId;
  public $turbineName;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;

  public function __construct($data) {
    $this->turbineId = isset($data['turbineId']) ? intval($data['turbineId']) : null;
    $this->turbineName = $data['turbineName'];
    $this->capacity = $data['capacity'];
    $this->rampUpTime = $data['rampUpTime'];
    $this->maintenanceInterval = $data['maintenanceInterval'];
}
    public static function fetchAll() {
      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);

      // 2. Prepare the query
      $sql = 'SELECT * FROM turbine';
      $statement = $db->prepare($sql);

      // 3. Run the query
      $success = $statement->execute();

      // 4. Handle the results
      $arr = [];
      while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $theTurbine =  new Turbine($row);
        array_push($arr, $theTurbine);
      }

      return $arr;
    }

    public static function fetchTurbineByTurbineId(int $turbineId) {
      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);

      // 2. Prepare the query
      $sql = 'SELECT * FROM Work WHERE task_id = ?';

      $statement = $db->prepare($sql);

      // 3. Run the query
      $success = $statement->execute(
          [$turbineId]
      );

      // 4. Handle the results
      $arr = [];
      while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        // 4.a. For each row, make a new work object
        $turbineItem =  new Turbine($row);

        array_push($arr, $turbineItem);
      }
      return $arr;
    }
}

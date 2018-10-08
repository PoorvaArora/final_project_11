<?php

class Turbine
{
  pubic $turbineId
  pubic $turbineName
  pubic $capacity
  pubic $rampUpTime
  pubic $maintenanceInterval

  public function __construct($data) {
    $this->id = isset($data['turbineId']) ? intval($data['turbineId']) : null;
    $this->turbineName = $data['turbineName'];
    $this->capacity = $data['capacity'];
    $this->rampUpTime = $data['rampUpTime'];
    $this->maintenanceInterval = $data['maintenanceInterval'];
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
      $sql = 'SELECT * FROM Turbine';
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
}

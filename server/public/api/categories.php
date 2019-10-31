<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$query = 'SELECT * FROM `categories`';

$result = mysqli_query($conn, $query);

if(!$result) {
  throw new Exception('Issue retrieving categories from database'.mysqli_error($conn));
}

$categoryOutput = [];
while($row = mysqli_fetch_assoc($result)) {
  array_push($categoryOutput, $row);
}

$categoryOutput = json_encode($categoryOutput);

print_r($categoryOutput);

?>

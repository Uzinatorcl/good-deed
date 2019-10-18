<?php

require_once('functions.php');
set_exception_handler('commit_error_handler');
require_once('db_connection.php');
$userId = intVal($_GET['id']);

$query = "SELECT `request_id`, `headline` FROM `requests` WHERE `completed` = 0 && `request_user_id` = $userId";

$result = mysqli_query($conn, $query);
if (!$result) {
  throw new Exception('Error' . mysqli_error($conn));
}
$userRequestList = [];
while ($row = mysqli_fetch_assoc($result)) {
  array_push($userRequestList, $row);
}

$userRequestList = json_encode($userRequestList);

print_r($userRequestList);


?>

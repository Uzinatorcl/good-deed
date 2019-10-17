<?php

require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

$userCommitData = getBodyData();
$requestId = $userCommitData['request_id'];
$userId = $userCommitData['user_id'];
print_r(json_encode($userCommitData));

$query = "INSERT INTO `commits` (`request_id`,`commit_user_id`)
VALUES({$requestId},{$userId})";
$result = mysqli_query($conn, $query);
print_r($result);
if(!$result) {
  throw new Exception('Error'.mysqli_error($conn));
}
$response = [];
while($row = mysqli_fetch_assoc($result)) {
  array_push($response, $row);
}

print_r(json_encode($response));


?>

<?php

require_once('functions.php');
set_exception_handler('commit_error_handler');
require_once('db_connection.php');

$userCommitData = getBodyData();
$requestId = $userCommitData['request_id'];
$userId = $userCommitData['user_id'];

$query = "INSERT INTO `commits` (`request_id`,`commit_user_id`)
VALUES({$requestId},{$userId})";
$result = mysqli_query($conn, $query);
if(!$result) {
  throw new Exception('Error'.mysqli_error($conn));
}
//response will be 1 if insert was successful
$response = mysqli_affected_rows($conn);

print_r(json_encode($response));


?>

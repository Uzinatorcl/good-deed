<?php

require_once('functions.php');
set_exception_handler('commit_error_handler');
require_once('../../db_connection.php');

$userCommitData = getBodyData();
$requestId = $userCommitData['request_id'];
$userId = $userCommitData['user_id'];
$recievingUserId = $userCommitData['requesters_user_id'];

$startTransaction = mysqli_query($conn, 'START TRANSACTION');
if (!$startTransaction) {
  throw new Exception('Error starting query' . mysqli_error($conn));
}
$query = "INSERT INTO `commits` (`request_id`,`commit_user_id`)
VALUES({$requestId},{$userId})";
$result = mysqli_query($conn, $query);
if(!$result) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Error'.mysqli_error($conn));
}
$commitId = mysqli_insert_id($conn);

$messageQuery = "INSERT INTO `messages` (`commit_id`,`sending_user_id`,`recieving_user_id`,`message`, `requesters_user_id`, `commiters_user_id`)
VALUES ($commitId, $userId, $recievingUserId, 'Hi, How can I help?', $recievingUserId, $userId)";

$messageResult = mysqli_query($conn, $messageQuery);

if(!$messageResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Error adding to messages' . mysqli_error($conn));
}

mysqli_query($conn, 'COMMIT');
$response = mysqli_affected_rows($conn);

print_r(json_encode($response));


?>

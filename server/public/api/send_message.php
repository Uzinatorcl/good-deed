<?php
require_once('functions.php');
set_exception_handler('commit_error_handler');
require_once('db_connection.php');

$messageData = getBodyData();

$commit_id = intval($messageData['commit_id']);
$commiters_user_id = intval($messageData['commiters_user_id']);
$requesters_user_id = intval($messageData['requesters_user_id']);
$recieving_user_id = intval($messageData['recieving_user_id']);
$sending_user_id = intval($messageData['sending_user_id']);
$message = addslashes($messageData['message']);

$query = "INSERT INTO `messages` (`commit_id`, `sending_user_id`, `recieving_user_id`, `message`, `requesters_user_id`, `commiters_user_id`)
VALUES ($commit_id, $sending_user_id, $recieving_user_id, '$message', $requesters_user_id, $commiters_user_id)";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('Error sending message' . mysqli_error($conn));
}

$response = mysqli_insert_id($conn);

print_r(json_encode($response));


?>

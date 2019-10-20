<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

$reviewData = getBodyData();
$commitId = intval($reviewData['commit_id']);
$requestId = intval($reviewData['request_id']);
$recievingUserId = intval($reviewData['recieving_user_id']);
$sendingUserId = intval($reviewData['sending_user_id']);
$reviewMessage = addslashes($reviewData['review_message']);
$rating = intval($reviewData['rating']);

$result = mysqli_query($conn, 'START TRANSACTION');

if(!$result) {
  throw new Exception('There was error server side'.mysqli_error($conn));
}

$reviewQuery = "INSERT INTO `reviews` (`request_id`, `recieving_user_id`, `sending_user_id`, `review_message`, `rating`)
VALUES ($requestId, $recievingUserId, $sendingUserId, '$reviewMessage', $rating)";

$reviewResult = mysqli_query($conn, $reviewQuery);

if(!$reviewResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('There was an error submitting the review '.mysqli_error($conn));
}

$commitQuery = "DELETE FROM `commits` WHERE `commit_id` = $commitId";

$commitResult = mysqli_query($conn, $commitQuery);

if (!$commitResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('There was an error deleting the commit ' . mysqli_error($conn));
}

$completeQuery = "UPDATE `requests` SET `completed`=1 WHERE `request_id` = $requestId";

$completeResult = mysqli_query($conn, $completeQuery);

if(!$completeResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('There was an issue completed the request '.mysqli_error($conn));
}

$response = mysqli_query($conn, 'COMMIT');

if(!$response) {
  throw new Exception('There was an issue completeing your query '.mysqli_error($conn));
}

print_r(json_encode($response));


?>

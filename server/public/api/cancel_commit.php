<?php
require_once('functions.php');
set_exception_handler('commit_error_handler');
require_once('db_connection.php');

$userDeleteData = getBodyData();
$commitId = intval($userDeleteData['commit_id']);

$startTransaction = mysqli_query($conn, 'START TRANSACTION');
if (!$startTransaction) {
  throw new Exception('Error starting query' . mysqli_error($conn));
}

$query = "DELETE FROM `commits` WHERE `commit_id` = $commitId";

$result = mysqli_query($conn, $query);
if (!$result) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Error canceling the commit' . mysqli_error($conn));
}

$messageQuery = "DELETE FROM `messages` WHERE `commit_id` = $commitId";

$messageResult = mysqli_query($conn, $messageQuery);
if (!$messageResult) {
  mysqli_query($conn, 'ROLLBACK');
  throw new Exception('Error canceling the commit' . mysqli_error($conn));
}

mysqli_query($conn, 'COMMIT');
$response = mysqli_affected_rows($conn);

print_r(json_encode($response));


?>

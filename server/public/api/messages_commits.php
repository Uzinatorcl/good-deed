<?php
require_once('functions.php');
set_exception_handler('commit_error_handler');
require_once('db_connection.php');

$userId = intVal($_GET['id']);

$messageQuery = "SELECT * FROM `messages` WHERE requesters_user_id = $userId OR commiters_user_id = $userId";

$messageResult = mysqli_query($conn, $messageQuery);

if (!$messageResult) {
  throw new Exception('Error in retrieving users messages' . mysqli_error($conn));
}

$messages = [];
$commitsArray=[];
while ($row = mysqli_fetch_assoc($messageResult)) {
  array_push($commitsArray, $row['commit_id']);
  array_push($messages, $row);
}
$commits = implode("', '", $commitsArray);

$deedQuery = "SELECT C.`commit_id`, C.`request_id`, R.`headline`, R.`request_user_id` AS requesters_user_id,
(SELECT `image_url` FROM `users` WHERE `user_id` = requesters_user_id) AS `image_url`,
(SELECT `username` FROM `users` WHERE `user_id` = requesters_user_id) AS `username`
FROM `commits` AS C
JOIN `requests` AS R
ON C.`request_id`= R.`request_id`
WHERE C.`commit_id` IN ('$commits')";

$deedResult = mysqli_query($conn, $deedQuery);

if (!$deedResult) {
  throw new Exception('Error in retrieving deeds' . mysqli_error($conn));
}

$deedArray = [];

while($row = mysqli_fetch_assoc($deedResult)) {
  array_push($deedArray, $row);
}

$response = [
  "deeds" => $deedArray,
  "messages" => $messages
];

print_r(json_encode($response));

?>

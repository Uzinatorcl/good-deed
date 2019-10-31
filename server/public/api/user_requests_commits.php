<?php

require_once('functions.php');
set_exception_handler('commit_error_handler');
require_once('../../db_connection.php');


$userId = intVal($_GET['id']);

$requestsQuery = "SELECT `request_id`, `headline`, `summary` FROM `requests` WHERE `completed` = 0 && `request_user_id` = $userId";

$requestsResult = mysqli_query($conn, $requestsQuery);
if (!$requestsResult) {
  throw new Exception('Error in retrieving users requests' . mysqli_error($conn));
}

$userRequestList = [];
while ($row = mysqli_fetch_assoc($requestsResult)) {
  array_push($userRequestList, $row);
}

$commitsQuery = "SELECT C.`commit_id`, C.`request_id`, R.`headline`, R.`summary`, R.`zipcode`, R.`request_user_id` AS requesters_user_id,
(SELECT `image_url` FROM `users` WHERE `user_id` = requesters_user_id) AS `image_url`,
(SELECT `username` FROM `users` WHERE `user_id` = requesters_user_id) AS `username`
FROM `commits` AS C
JOIN `requests` AS R
ON C.`request_id`= R.`request_id`
WHERE R.`completed`= 0 && C.`commit_user_id` = $userId";

$commitResult = mysqli_query($conn, $commitsQuery);
if (!$commitResult) {
  throw new Exception('Error in retrieving users commits' . mysqli_error($conn));
}
$userCommitList = [];
while ($row = mysqli_fetch_assoc($commitResult)) {
  array_push($userCommitList, $row);
}
$usersRequestsCommits = [
  "requests"=>$userRequestList,
  "commits"=>$userCommitList
];

$usersRequestsCommits = json_encode($usersRequestsCommits);

print_r($usersRequestsCommits);


?>

<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');

$query = 'SELECT R.`review_id`, R.`rating`, R.`review_message`, R.`sending_user_id`, R.`request_id`, U.`username`, U.`image_url`,
(SELECT category_id FROM `requests` WHERE request_id = R.`request_id`) AS category,
(SELECT name FROM `categories` WHERE category_id = category) AS category_name
FROM `reviews` AS R
JOIN `users` AS U
ON U.`user_id`= R.`sending_user_id`
WHERE R.`recieving_user_id` ='.$_GET['id'];

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('Error'.mysqli_error($conn));
}
$userReviewData = [];
while($row = mysqli_fetch_assoc($result)) {
  array_push($userReviewData, $row);
}

$userReviewData = json_encode($userReviewData);

print_r($userReviewData);
?>

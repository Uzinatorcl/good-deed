<?php
if (!defined('INTERNAL')) {
  exit('Direct access is not allowed');
}
$id = intval($_GET['id']);
$query = "SELECT R.`request_id`, R.`category_id`, R.`headline`, R.`summary`, R.`request_user_id`, R.`completed`,
(SELECT `username` FROM `users` WHERE `user_id` = R.`request_user_id` ) AS `user_id`,
(SELECT `image_url` FROM `users` WHERE `user_id` = R.`request_user_id` ) AS `image_url`
FROM `requests` AS R
WHERE  R.`completed` != 1 && R.`category_id` = {$id}";
$result = mysqli_query($conn, $query);
if (!$result) {
  throw new Exception('Error'.mysqli_error($conn));
}
$deedList = [];
while($row = mysqli_fetch_assoc($result)) {
  array_push($deedList, $row);
}

$deedList = json_encode($deedList);

print_r($deedList);

?>

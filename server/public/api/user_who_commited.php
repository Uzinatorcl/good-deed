<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

$requestId = intval($_GET['request_id']);
$query = "SELECT C.`commit_id`, C.`request_id`, U.`username`, U.`image_url`, U.`user_id`
FROM `commits` AS C
JOIN `users` AS U
ON U.`user_id`= C.`commit_user_id`
WHERE C.`request_id` = $requestId";

$result = mysqli_query($conn, $query);

if(!$result) {
  throw new Exception('Error accessing database'. mysqli_error($conn));
}

if(mysqli_num_rows($result) <= 0) {
  print_r(json_encode([]));
  exit();
}
$usersWhoCommited = [];

while($row = mysqli_fetch_assoc($result)) {
  array_push($usersWhoCommited, $row);
}

print_r(json_encode($usersWhoCommited));



?>

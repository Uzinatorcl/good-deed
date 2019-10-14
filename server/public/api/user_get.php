<?php
if (!defined('INTERNAL')) {
  exit('Direct access is not allowed');
}
$userRequest = getBodyData();
if($userRequest['username'] === '') {
  exit('Username cannot be blank');
}
$query = "SELECT `user_id` AS id, `username`, `email`,`firstname`, `lastname`, `zipcode`, `image_url` FROM `users` WHERE `username` = '$userRequest[username]'";
$result = mysqli_query($conn, $query);

if(!$result) {
  throw new Exception('Invalid username');
}

$userDataOutput = mysqli_fetch_assoc($result);

$userDataOutput = json_encode($userDataOutput);

print_r($userDataOutput);

?>

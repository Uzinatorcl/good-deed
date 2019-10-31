<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');


$userAccountInfo = getBodyData();
$email = addslashes($userAccountInfo['email']);
$firstname = addslashes($userAccountInfo['firstname']);
$lastname = addslashes($userAccountInfo['lastname']);
$zipcode = addslashes($userAccountInfo['zipcode']);
$userId = intval($userAccountInfo['user_id']);

$query = "UPDATE `users`
SET `email`='$email', `firstname`='$firstname', `lastname`='$lastname', `zipcode`='$zipcode'
WHERE `user_id` = $userId";

$result = mysqli_query($conn, $query);

if(!$result) {
  throw new Exception('There was an error updating the users profile '.mysqli_error($conn));
}

$response = [
  'success' => true,
  'response' => 'You have successfully updated your users profile'
];

print_r(json_encode($response));


?>

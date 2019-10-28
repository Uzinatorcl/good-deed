<?php
if (!defined('INTERNAL')) {
  exit('Direct access is not allowed');
}
$newUserData = getBodyData();
$username = addslashes($newUserData['username']);
$password = hash('sha256', $newUserData['password']);
$email = addslashes($newUserData['email']);
$firstname = addslashes($newUserData['firstname']);
$lastname = addslashes($newUserData['lastname']);
$zipcode = addslashes($newUserData['zipcode']);

$query = "INSERT INTO `users` (`username`, `password`, `email`, `firstname`, `lastname`, `zipcode`, `image_url`)
VALUES ('$username', '$password', '$email', '$firstname', '$lastname', '$zipcode', 'images/empty.png')";

$result = mysqli_query($conn, $query);

if(!$result) {
  throw new Exception('There was an error uploading the user data to the server');
}

if(mysqli_affected_rows($conn) <= 0) {
  throw new Exception('User was not added to database');
}

$response = [
  'success' => true,
  'response' => 'User was successfully added to the database'
];

print_r(json_encode($response));

?>

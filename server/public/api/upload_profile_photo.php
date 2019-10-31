<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');


$imagesDirectory = '../images/';
$profileImage = $imagesDirectory.uniqid().$_FILES['profilePhoto']['name'];
$userId = intval($_POST['id']);
$imageUrl = substr($profileImage, 3);
$upload = true;
$output = [];

if($_FILES['profilePhoto']['size'] > 5000000) {
  $output['errors'][] = 'The photo is too large';
  print_r(json_encode($output));
  exit();
}


$upload = move_uploaded_file($_FILES['profilePhoto']['tmp_name'], $profileImage);

if(!$upload) {
  throw new Exception('There was an issue uploading the file.');
} else {
  $output['success'] = true;
  $output['filepath'] = $imageUrl;
  $output['message'] = 'Image was successfully uploaded to the server';
}

$query = "UPDATE `users`
SET `image_url` = '$imageUrl'
WHERE `user_id` = $userId";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('There was an error updating user info' . mysqli_error($conn));
}

print_r(json_encode($output));



?>

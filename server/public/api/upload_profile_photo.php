<?php
require_once('functions.php');
set_exception_handler('error_handler');

$imagesDirectory = '../images/';
$profileImage = $imagesDirectory.uniqid().$_FILES['profilePhoto']['name'];
$upload = true;
$output = [];

if($_FILES['profilePhoto']['size'] > 5000000) {
  $output['errors'][] = 'The photo is too large';
  print_r(json_encode($output));
  exit();
}

$upload = move_uploaded_file($_FILES['profilePhoto']['tmp_name'], $profileImage);

if(!$upload) {
  $output['success'] = false;
  $output['message'] = 'There was an error uploading this image to the server';
} else {
  $output['success'] = true;
  $output['filepath'] = stripslashes($profileImage);
  $output['message'] = 'Image was successfully uploaded to the server';
}

print_r(json_encode($output));



?>

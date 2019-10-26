<?php
if (!defined('INTERNAL')) {
  exit('Direct access is not allowed');
}
$requestData = getBodyData();
if ($requestData['headline'] === '') {
  exit('headline cannot be blank');
}
if ($requestData['zipcode'] === '') {
  exit('zipcode cannot be blank');
}
$categoryId = intval($requestData['category_id']);
$userId = intval($requestData['user_id']);
$headline = addSlashes($requestData['headline']);
$zipcode = addSlashes($requestData['zipcode']);
$summary = addSlashes($requestData['summary']);
$latitude = floatval($requestData['latitude']);
$longitude = floatval($requestData['longitude']);

$query = "INSERT INTO `requests` (`category_id`,`request_user_id`,`headline`,`zipcode`, `summary`, `latitude`, `longitude`)
VALUES ($categoryId , $userId , '{$headline}' , '{$zipcode}' , '{$summary}', $latitude, $longitude)";

$result = mysqli_query($conn, $query);
if(!$result) {
  throw new Exception('Error adding new request to database'.mysqli_error($conn));
}

$response = mysqli_affected_rows($conn);

print_r(json_encode($response));


?>

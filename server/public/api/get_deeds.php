<?php
if (!defined('INTERNAL')) {
  exit('Direct access is not allowed');
}
$cat_id = intval($_GET['catid']);
$user_id = intval($_GET['id']);
$locationDataRecieved = isset($_GET['lat']) && isset($_GET['long']);

if($locationDataRecieved) {

  $latitude = floatval($_GET['lat']);

  $longitude = floatval($_GET['long']);

  $query = "SELECT R.`request_id`, R.`category_id`, R.`headline`, R.`zipcode`, R.`summary`, R.`request_user_id`, R.`completed`,R.`latitude`,R.`longitude`, U.`username`, U.`image_url`,
  CEIL((SELECT ST_Distance_Sphere(point(R.`longitude`, R.`latitude`), point($longitude, $latitude)))*0.000621371192) < 10 AS near
  FROM `requests` AS R
  JOIN `users` AS U
  ON U.`user_id` = R.`request_user_id`
  WHERE  R.`completed` != 1 && R.`request_user_id` != 1 && R.`category_id` = 1 ";
} else {
  $query = "SELECT R.`request_id`, R.`category_id`, R.`headline`, R.`zipcode`, R.`summary`, R.`request_user_id`, R.`completed`,R.`latitude`,R.`longitude`, U.`username`, U.`image_url`
  FROM `requests` AS R
  JOIN `users` AS U
  ON U.`user_id` = R.`request_user_id`
  WHERE  R.`completed` != 1 && R.`request_user_id` != {$user_id} && R.`category_id` = {$cat_id} LIMIT 10";
}


$result = mysqli_query($conn, $query);
if (!$result) {
  throw new Exception('Error'.mysqli_error($conn));
}
$deedList = [];
  if($locationDataRecieved) {
  while ($row = mysqli_fetch_assoc($result)) {
    if($row['near']) {
      array_push($deedList, $row);
    }
  }
} else {
  while ($row = mysqli_fetch_assoc($result)) {
    array_push($deedList, $row);
  }
}


$deedList = json_encode($deedList);

print_r($deedList);

<?php

if(!function_exists('error_handler')) {
  function error_handler($error) {
    http_response_code(500);
    $output = [
      "success" => false,
      "error" => $error->getMessage()
    ];
    $jsonOutput = json_encode($output);

    print_r($jsonOutput);
  }
  };
  if (!function_exists('commit_error_handler')) {
    function commit_error_handler($commitError)
    {
      http_response_code(409);
      $output = [
        "success" => false,
        "error" => $commitError->getMessage()
      ];
      $jsonOutput = json_encode($output);

      print_r($jsonOutput);
    };
}
if (!function_exists('startUp')) {
  function startUp() {
    header('Content-Type: application/json');
  }
}

if (!function_exists('getBodyData')) {
  function getBodyData(){
    return json_decode(file_get_contents('php://input'), true);
  }
}

?>

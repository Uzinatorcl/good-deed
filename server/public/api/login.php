<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('../../db_connection.php');


define('INTERNAL', true);

switch($_SERVER['REQUEST_METHOD']) {
  case 'PATCH':
  require('user_add.php');
  break;
  case 'POST':
  require('user_get.php');
  break;
}

?>

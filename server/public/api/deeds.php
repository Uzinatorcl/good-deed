<?php
require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

define('INTERNAL', true);

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    require('get_deeds.php');
    break;
  case 'POST':
    require('add_deeds.php');
    break;
}

<?php
  require_once 'inc/conn.php';
  $db = new DB();
  $status = array();
  if (empty($_POST['username'])) {
    $status['code'] = 400;
    echo json_encode($status);
    exit;
  }
  $username = $_POST['username'];
  $password = md5($_POST['password']);
  $sql = "select user, password from admin where user = '$username' and passsword = '$password'";
  $db->query($sql);
  $conn = $db->conn();
  if ($conn->affected_rows >= 1) {
    $status['code'] = 200;
  } else {
    $status['code'] = 400;
  }
  echo json_encode($status);
  $db->close();
?>
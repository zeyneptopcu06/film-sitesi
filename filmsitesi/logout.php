<?php
session_start();
require 'db.php';

if(isset($_SESSION['id'])) {
    $user_id = $_SESSION['id'];
    $update_sql = "UPDATE uyeler SET giris=0 WHERE id='$user_id'";
    $conn->query($update_sql);
}
// Oturumu sonlandır
session_unset();
session_destroy();

// Giriş sayfasına yönlendir
header("Location: index.php");
exit();
?>
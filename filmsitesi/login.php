<?php
session_start();
require 'db.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM uyeler WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            if ($row['giris']) {
                $_SESSION['id'] = $row['id'];
                echo "<script>
                localStorage.setItem('loggedInUserId', '{$row['id']}');
                location.href = 'index.html';
                </script>";
            
                exit();
            } else {
                $update_sql = "UPDATE uyeler SET giris=1 WHERE email='$email'";
                if ($conn->query($update_sql) === TRUE) {
                    $_SESSION['id'] = $row['id'];
                    echo "<script>
                localStorage.setItem('loggedInUserId', '{$row['id']}');
                location.href = 'index.html';
                </script>";
                exit();
                } else {
                    echo "Hata: " . $conn->error;
                }
            }
        } else {
            echo "Geçersiz şifre";

        }
    } else {
        echo "Kullanıcı bulunamadı.";
    }
} else {
    echo "Lütfen formu kullanarak giriş yapın.";
}
$conn->close();


?>

    
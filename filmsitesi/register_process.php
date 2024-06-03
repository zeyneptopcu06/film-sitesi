<div class="container">
    <div class="alert-container">
<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];

    // Şifrenin en az 6 karakterden oluştuğunu, bir büyük harf, bir sayı ve bir noktalama işareti içerdiğini kontrol et
    if (strlen($password) < 6 || !preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password) || !preg_match('/[^\w\s]/', $password)) {
        echo "Şifre en az 6 karakterden oluşmalı ve en az bir büyük harf, bir sayı ve bir noktalama işareti içermelidir.";
        exit();
    }


    
    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if ($password !== $password_confirm) {
        echo "Şifreler eşleşmiyor.";
        exit();
    }

    // Veritabanında aynı email ile kullanıcı kontrolü yap
    $sql = "SELECT * FROM uyeler WHERE email='$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        echo "Bu email adresi zaten kayıtlı.";
        exit();
    }

    // Şifreyi hashle
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Kullanıcıyı veritabanına ekle
    $sql = "INSERT INTO uyeler (isim_soyisim, email, password) VALUES ('$name', '$email', '$hashed_password')";
     $calistirekle=mysqli_query($conn,$sql);
     if ($calistirekle) {
        echo "Kullanıcı başarılı bir şekilde eklendi.";
    } else {
        echo "Kayıt eklenirken bir problem oluştu.";
    }
} else {
    echo "Lütfen formu kullanarak kayıt olun.";
}
mysqli_close($conn);
?>
</div>
</div>


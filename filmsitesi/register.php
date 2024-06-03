<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kayıt Ol</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
        <div class="form-container">
            <h2>Kayıt Ol</h2>
            <form action="register_process.php" method="post">
                <label for="name">İsim Soyisim:</label><br>
                <input type="text" id="name" name="name" required><br>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required><br>
                <label for="password">Şifre:</label><br>
                <input type="password" id="password" name="password" required><br>
                <label for="password_confirm">Şifre Tekrar:</label><br>
                <input type="password" id="password_confirm" name="password_confirm" required><br><br>
                <input type="submit" value="Kayıt Ol">
            </form>
            <p>Giriş yapmak istiyorsanız <a href="index.php">buraya</a> tıklayın.</p>
        </div>
    </div>
</body>
</html>
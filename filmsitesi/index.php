
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giriş Formu</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
        <div class="form-container">
            <form action="login.php" method="post" >
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required><br>
                <label for="password">Şifre:</label><br>
                <input type="password" id="password" name="password" required><br><br>
                <input type="submit"  value="Giriş Yap">
            </form>
            <p>Kayıt olmak istiyorsanız <a href="register.php">buraya</a> tıklayın.</p>
</div>
</body>
</html>

<?php
    // Получение данных с формы:
    $name = htmlspecialchars($_POST['firstName']);
    $email = htmlspecialchars($_POST['email']);
    $tel = htmlspecialchars($_POST['telephone']);

    // Параметры для функции mail:
    $source = getenv('HTTP_REFERER');
    $subject = 'Тема письма клиенту';
    $message = "Текст письма:
        <br><br>
        Имя: $name<br>
        E-mail: $email<br>
        Телефон: $tel<br>
        Источник (ссылка): $source
    ";
    $headers = "From: $email\r\nReply-To: $email\r\nContent-type: text/html; charset=utf-8\r\n";

    // Отправка данных на почту:
    $success = mail("kkaassaa68@mail.ru", $subject, $message, $headers);
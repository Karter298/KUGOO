<?php
$user_email = htmlspecialchars($_POST["useremail"]);
$user_phone = htmlspecialchars($_POST["userphone"]);

$token = "5702429350:AAEU-ky8lYDAHGuqQX_AiWmlAWOa9F2S5hs";
$chat_id = "-836144743";
$text = "";

$formData = array(
  "Почта: " => $user_email,
  "Телефон: " => $user_phone
);

foreach($formData as $key => $value)  {
  $text .= $key . "<b>" . urlencode($value) . "</b>" . "%0A";
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text={$text}&parse_mode=html", "r");

if ($sendToTelegram) {
  echo "Success";
} else {
  echo "Error";
}
?>
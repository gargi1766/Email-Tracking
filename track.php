<?php
if (isset($_GET['email'])) {
    $email = $_GET['email'];
    $logfile = 'opened_emails.log';
    file_put_contents($logfile, $email . "\n", FILE_APPEND);
}
header('Content-Type: image/gif');
echo base64_decode("R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="); // 1x1 transparent GIF
?>

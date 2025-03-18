<?php
$to = "recipient@example.com";  // Change this to your test email
$subject = "Test Email with Tracking Pixel";

// Read the email HTML template
$message = file_get_contents("email.html");

// Set email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: your-email@example.com" . "\r\n";  // Change this to your sender email

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo "✅ Email sent successfully!";
} else {
    echo "❌ Email sending failed.";
}
?>

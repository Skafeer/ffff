<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dropshipping_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}
?>
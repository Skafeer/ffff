<?php
$conn = new mysqli("localhost", "root", "", "dropshipping_db");

if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

$name = $_POST['name'];
$wholesale_price = $_POST['wholesale_price'];
$image = $_FILES['image']['name'];
$target = "images/" . basename($image);

$sql = "INSERT INTO products (name, wholesale_price, image) VALUES ('$name', '$wholesale_price', '$image')";

if (move_uploaded_file($_FILES['image']['tmp_name'], $target) && $conn->query($sql) === TRUE) {
    echo "تمت إضافة المنتج بنجاح!";
} else {
    echo "فشل في الإضافة: " . $conn->error;
}

$conn->close();
?>
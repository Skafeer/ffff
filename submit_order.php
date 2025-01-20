<?php
$conn = new mysqli("localhost", "root", "", "dropshipping_db");

if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

$product = $_POST['product'];
$price = $_POST['price'];
$customer_name = $_POST['customer_name'];
$customer_phone = $_POST['customer_phone'];

$sql = "INSERT INTO orders (product, selling_price, customer_name, customer_phone) 
        VALUES ('$product', '$price', '$customer_name', '$customer_phone')";

if ($conn->query($sql) === TRUE) {
    echo "تمت إضافة الطلب بنجاح!";
} else {
    echo "خطأ: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
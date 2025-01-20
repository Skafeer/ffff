<?php
function displayProducts() {
    $conn = new mysqli("localhost", "root", "", "dropshipping_db");

    if ($conn->connect_error) {
        die("فشل الاتصال: " . $conn->connect_error);
    }

    $result = $conn->query("SELECT * FROM products");

    while ($row = $result->fetch_assoc()) {
        echo '<div class="product">';
        echo '<img src="images/' . $row['image'] . '" alt="' . $row['name'] . '">';
        echo '<h3>' . $row['name'] . '</h3>';
        echo '<p>سعر الجملة: ' . $row['wholesale_price'] . ' دينار</p>';
        echo '</div>';
    }

    $conn->close();
}
?>
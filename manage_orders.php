<?php
function displayOrders() {
    $conn = new mysqli("localhost", "root", "", "dropshipping_db");

    if ($conn->connect_error) {
        die("فشل الاتصال: " . $conn->connect_error);
    }

    $result = $conn->query("SELECT * FROM orders");

    while ($row = $result->fetch_assoc()) {
        echo '<div class="order">';
        echo '<h3>طلب: ' . $row['product'] . '</h3>';
        echo '<p>السعر: ' . $row['selling_price'] . ' دينار</p>';
        echo '<p>الزبون: ' . $row['customer_name'] . '</p>';
        echo '<p>الهاتف: ' . $row['customer_phone'] . '</p>';
        echo '</div>';
    }

    $conn->close();
}
?>
<?php

session_start();

require_once "db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if ($email === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT id, name, email, password
     FROM admins
     WHERE email = ?"
);

$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid admin email or password."
    ]);
    exit;
}

$admin = $result->fetch_assoc();

if (!password_verify($password, $admin["password"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid admin email or password."
    ]);
    exit;
}
$_SESSION["admin_id"] = (int)$admin["id"];
$_SESSION["admin_name"] = $admin["name"];
$_SESSION["admin_email"] = $admin["email"];
echo json_encode([
    "success" => true,
    "message" => "Admin login successful.",
    "admin" => [
        "id" => (int)$admin["id"],
        "name" => $admin["name"],
        "email" => $admin["email"]
    ]
]);

$stmt->close();
$conn->close();

?>
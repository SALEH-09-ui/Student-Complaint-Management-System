<?php

require_once "db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$batch = trim($_POST["batch"] ?? "");
$password = $_POST["password"] ?? "";

if ($name === "" || $email === "" || $batch === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address."
    ]);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 6 characters."
    ]);
    exit;
}

/* Check whether email already exists */
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "An account with this email already exists."
    ]);
    $check->close();
    exit;
}

$check->close();

/* Hash password */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

/* Insert user */
$stmt = $conn->prepare(
    "INSERT INTO users (name, email, batch, password)
     VALUES (?, ?, ?, ?)"
);

$stmt->bind_param(
    "ssss",
    $name,
    $email,
    $batch,
    $hashedPassword
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Account created successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to create account."
    ]);
}

$stmt->close();
$conn->close();

?>
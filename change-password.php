<?php

require_once "db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);

    exit;
}

$userId = intval(
    $_POST["user_id"] ?? 0
);

$currentPassword =
    $_POST["current_password"] ?? "";

$newPassword =
    $_POST["new_password"] ?? "";

if (
    $userId <= 0 ||
    $currentPassword === "" ||
    $newPassword === ""
) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid password information."
    ]);

    exit;
}

if (strlen($newPassword) < 6) {

    echo json_encode([
        "success" => false,
        "message" => "New password must contain at least 6 characters."
    ]);

    exit;
}


/* -----------------------------------------
   Get current password
----------------------------------------- */

$stmt = $conn->prepare(
    "SELECT password
     FROM users
     WHERE id = ?"
);

$stmt->bind_param(
    "i",
    $userId
);

$stmt->execute();

$result =
    $stmt->get_result();


if ($result->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "message" => "User account could not be found."
    ]);

    exit;
}

$user =
    $result->fetch_assoc();


/* -----------------------------------------
   Verify current password
----------------------------------------- */

if (
    !password_verify(
        $currentPassword,
        $user["password"]
    )
) {

    echo json_encode([
        "success" => false,
        "message" => "Current password is incorrect."
    ]);

    exit;
}


/* -----------------------------------------
   Check new password
----------------------------------------- */

if (
    $currentPassword ===
    $newPassword
) {

    echo json_encode([
        "success" => false,
        "message" => "New password must be different from your current password."
    ]);

    exit;
}


/* -----------------------------------------
   Hash new password
----------------------------------------- */

$newPasswordHash =
    password_hash(
        $newPassword,
        PASSWORD_DEFAULT
    );


/* -----------------------------------------
   Update password
----------------------------------------- */

$updateStmt =
    $conn->prepare(
        "UPDATE users
         SET password = ?
         WHERE id = ?"
    );

$updateStmt->bind_param(
    "si",
    $newPasswordHash,
    $userId
);

if ($updateStmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Password changed successfully!"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to change password."
    ]);
}


$stmt->close();
$updateStmt->close();
$conn->close();

?>
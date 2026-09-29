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

$complaintId = intval(
    $_POST["complaint_id"] ?? 0
);

$userId = intval(
    $_POST["user_id"] ?? 0
);

if ($complaintId <= 0 || $userId <= 0) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid complaint or user."
    ]);

    exit;
}

$stmt = $conn->prepare(
    "DELETE FROM complaints
     WHERE id = ? AND user_id = ?"
);

$stmt->bind_param(
    "ii",
    $complaintId,
    $userId
);

$stmt->execute();

if ($stmt->affected_rows > 0) {

    echo json_encode([
        "success" => true,
        "message" => "Complaint withdrawn successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "You cannot withdraw this complaint."
    ]);
}

$stmt->close();
$conn->close();

?>
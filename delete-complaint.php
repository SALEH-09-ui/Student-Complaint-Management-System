<?php

session_start();

require_once "db.php";

header("Content-Type: application/json");

if (
    !isset($_SESSION["admin_id"]) ||
    !isset($_SESSION["admin_email"])
) {
    echo json_encode([
        "success" => false,
        "message" => "Admin is not logged in."
    ]);
    exit;
}

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

if ($complaintId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid complaint ID."
    ]);
    exit;
}

$stmt = $conn->prepare(
    "DELETE FROM complaints WHERE id = ?"
);

$stmt->bind_param(
    "i",
    $complaintId
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Complaint deleted successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete complaint."
    ]);
}

$stmt->close();
$conn->close();

?>
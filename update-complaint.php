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

$complaintId = intval($_POST["complaint_id"] ?? 0);
$status = trim($_POST["status"] ?? "");
$feedback = trim($_POST["feedback"] ?? "");

$allowedStatuses = [
    "processing",
    "approved",
    "rejected"
];

if ($complaintId <= 0 || !in_array($status, $allowedStatuses, true)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid complaint information."
    ]);
    exit;
}

$stmt = $conn->prepare(
    "UPDATE complaints
     SET status = ?, feedback = ?
     WHERE id = ?"
);

$stmt->bind_param(
    "ssi",
    $status,
    $feedback,
    $complaintId
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Complaint updated successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to update complaint."
    ]);

}

$stmt->close();
$conn->close();

?>
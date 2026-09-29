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
$userId = intval($_POST["user_id"] ?? 0);

if ($complaintId <= 0 || $userId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid complaint or user."
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT
        id,
        user_id,
        student_name,
        batch,
        is_anonymous,
        title,
        description,
        status,
        feedback,
        DATE_FORMAT(created_at, '%d %M %Y') AS complaint_date
     FROM complaints
     WHERE id = ? AND user_id = ?"
);

$stmt->bind_param(
    "ii",
    $complaintId,
    $userId
);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "message" => "Complaint not found."
    ]);

    exit;
}

$row = $result->fetch_assoc();

$complaint = [
    "id" => (int)$row["id"],
    "userId" => (int)$row["user_id"],
    "name" => $row["student_name"],
    "anonymous" => (bool)$row["is_anonymous"],
    "batch" => $row["batch"],
    "title" => $row["title"],
    "description" => $row["description"],
    "status" => $row["status"],
    "feedback" => $row["feedback"],
    "date" => $row["complaint_date"]
];

echo json_encode([
    "success" => true,
    "complaint" => $complaint
]);

$stmt->close();
$conn->close();

?>
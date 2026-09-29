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

$userId = intval($_POST["user_id"] ?? 0);

if ($userId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid user."
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
     WHERE user_id = ?
     ORDER BY id DESC"
);

$stmt->bind_param("i", $userId);

$stmt->execute();

$result = $stmt->get_result();

$complaints = [];

while ($row = $result->fetch_assoc()) {

    $complaints[] = [
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
}

echo json_encode([
    "success" => true,
    "complaints" => $complaints
]);

$stmt->close();
$conn->close();

?>
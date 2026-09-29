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
$studentName = trim($_POST["student_name"] ?? "");
$batch = trim($_POST["batch"] ?? "");
$isAnonymous = isset($_POST["is_anonymous"]) && $_POST["is_anonymous"] === "true";
$description = trim($_POST["description"] ?? "");


if ($userId <= 0 || $batch === "" || $description === "") {
    echo json_encode([
        "success" => false,
        "message" => "Required information is missing."
    ]);
    exit;
}


/* If anonymous, hide the student's name */
if ($isAnonymous) {
    $studentName = "Anonymous";
}


/* Create complaint title from description */
$title = strlen($description) > 55
    ? substr($description, 0, 55) . "..."
    : $description;


/* Insert complaint */
$stmt = $conn->prepare(
    "INSERT INTO complaints
    (user_id, student_name, batch, is_anonymous, title, description, status, feedback)
    VALUES (?, ?, ?, ?, ?, ?, 'processing',
    'Your complaint has been received and is currently under review.')"
);

$anonymousValue = $isAnonymous ? 1 : 0;

$stmt->bind_param(
    "ississ",
    $userId,
    $studentName,
    $batch,
    $anonymousValue,
    $title,
    $description
);


if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Complaint submitted successfully.",
        "complaint_id" => $stmt->insert_id
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to submit complaint."
    ]);
}


$stmt->close();
$conn->close();

?>
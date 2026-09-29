<?php

session_start();

header("Content-Type: application/json");

if (
    isset($_SESSION["admin_id"]) &&
    isset($_SESSION["admin_email"])
) {
    echo json_encode([
        "success" => true,
        "loggedIn" => true,
        "admin" => [
            "id" => $_SESSION["admin_id"],
            "email" => $_SESSION["admin_email"],
            "name" => $_SESSION["admin_name"]
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "loggedIn" => false,
        "message" => "Admin is not logged in."
    ]);
}

?>
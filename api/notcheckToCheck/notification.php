<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');

$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "react-crud";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from POST request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['inv_id'])) {
    $checkNumbersArray = $data['inv_id']; // Invoice IDs are provided as an array
    $response = array();

    foreach ($checkNumbersArray as $checkNumber) {
        // Fetch reminders for each invoice ID
        $sqlSelectCheck = "SELECT *, DATEDIFF(NOW(), created_at) AS days_passed FROM not_checked_received WHERE inv_id = '$checkNumber'";
        $result = $conn->query($sqlSelectCheck);

        // Fetch and process reminders data
        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $daysPassed = $row['days_passed'];

            // Add invoice number and remaining days to response array
            $response[] = array(
                'inv_id' => $checkNumber,
                'remaining_days' => 25 - $daysPassed
            );
        }
    }

    if (!empty($response)) {
        echo json_encode($response); // Send the reminders data for all invoice IDs
    } else {
        $response['message'] = "No reminders found for provided invoice IDs.";
        echo json_encode($response);
    }
} else {
    $response['message'] = "No invoice IDs provided.";
    echo json_encode($response);
}

$conn->close();
?>

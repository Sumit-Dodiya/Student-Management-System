<?php
header('Content-Type: application/json');
$conn = mysqli_connect("localhost", "root", "", "student");

if (!$conn) {
    echo json_encode(array("status" => "error", "message" => "Database connection failed."));
    exit();
}

$requestMethod = $_SERVER['REQUEST_METHOD'];

// handel Get Method for particuler id recored
if ($requestMethod === 'GET') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if ($id) {
        $query = mysqli_query($conn, "SELECT * FROM register WHERE id = '$id'");

        if ($query) {
            $result = mysqli_fetch_all($query, MYSQLI_ASSOC);
            if ($result) {
                echo json_encode($result);
            } else {
                echo json_encode(["status" => "error", "message" => "No data found for the given ID"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to execute query"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No ID provided"]);
    }
} 

//handle Put request to update particuler data

elseif ($requestMethod === 'PUT') {
    $inputData = file_get_contents("php://input");
    $data = json_decode($inputData, true);

    //Check if any error occure in json formate
    if (json_last_error() === JSON_ERROR_NONE) {

        //check if id is set
        $id = isset($data['id']) ? $data['id'] : null;
        $name = $data['name'];
        $email = $data['email'];
        $phone = $data['phone'];
        $address = $data['address'];
        $gender = $data['gender'];
        $course = $data['course'];

        //if id is set
        if ($id) {
            $query = "UPDATE register SET name='$name', email='$email', phone='$phone',
                     address='$address', gender='$gender', course='$course' WHERE id='$id'";
            $result = mysqli_query($conn, $query);

            if ($result) {
                echo json_encode(['status' => 'success', 'message' => 'Record updated successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update record']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No ID provided']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

mysqli_close($conn);
?>

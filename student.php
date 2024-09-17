<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = mysqli_connect("localhost","root","","student");

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$address = $data['address'];
$gender = $data['gender'];
$course = $data['course'];
$password = $data['password'];

$query = mysqli_query($conn,"INSERT INTO register (name,email,phone,address,gender,course,password) VALUE 
                       ('$name','$email','$phone','$address','$gender','$course','$password') ");
                       
if($query){
    echo json_encode(array("status"=> "success","message"=> "Data Inserted successfully"));
}                       

else{
    echo json_encode(array("status"=> "error",  "message"=>"Somthing Went Wrong"));       
}


?>

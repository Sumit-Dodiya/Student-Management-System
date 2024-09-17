<?php 

$conn = mysqli_connect("localhost","root","","student");

$query = mysqli_query($conn,"SELECT * FROM register");

if($query){
    echo json_encode(mysqli_fetch_all($query, MYSQLI_ASSOC));
}

else{
    echo json_encode(["error"=> "Somthing Went Wrong"]);
}

?>
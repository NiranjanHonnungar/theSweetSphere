<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'database.php';
$obj =new dbConnect();
$conn=$obj->connect();
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT uname,fname,lname,rating,feedback FROM customer C,feedback F where C.cid=F.cid";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response);
        break;
    case "POST":
        $feed= json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO feedback(cid,rating,feedback) VALUES(:cid,:rating,:feedback)";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':rating', $feed->rating);
        $stmt->bindParam(':feedback',$feed->feedback);
        $stmt->bindParam(':cid',$path[3]);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    }
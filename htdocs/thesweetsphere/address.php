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
    case "POST":
        $address = json_decode( file_get_contents('php://input') );
        $sql = "SELECT cid FROM customer where uname=:uname";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':uname',$path[3]);
        $stmt->execute();
        $data=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $cid=$data[0]["cid"];
        $sql="INSERT INTO address values(:cid,:addr)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':cid',$cid);
        $stmt->bindParam(':addr',$address->address1);
        if($stmt->execute())
        {
            $response = ['status' => 1, 'message' => '1 Record created successfully'];
        }else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }

        if($address->address2)
        {
            $stmt->bindParam(':addr',$address->address2);
            if($stmt->execute())
            {
                $response = ['status' => 1, 'message' => '2 Records created successfully'];
            }
            
        }
        if($address->address3)
        {
            $stmt->bindParam(':addr',$address->address3);
            if($stmt->execute())
            {
                $response = ['status' => 1, 'message' => '3 Records created successfully'];
            }
            
        }
        echo json_encode($response);
        break;
    case "GET":
        $sql = "SELECT *  FROM address where cid=:cid";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':cid',$path[3]);
        if($stmt->execute())
        {
            $data=$stmt->fetchALL(PDO::FETCH_ASSOC);
            $response = ['status' => 1, 'message' => '1 Record created successfully'];
        }else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($data);
        break;}
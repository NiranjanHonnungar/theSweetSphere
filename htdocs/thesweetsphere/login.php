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
        $login= json_decode( file_get_contents('php://input') );
        $sql = "SELECT * FROM customer where uname=:uname and pass=:pass";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':uname',$login->uname);
        $stmt->bindParam(':pass',$login->pass);
        
        if($stmt->execute()) {
            $res=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if($res==[])
            {

                $response=['status'=>0,"message"=>'BOSS Not there'];
            }
            else
            {
                $cid=$res[0]["cid"];
                $ph_no=$res[0]["ph_no"];
                $response=['status'=>1,"ph_no"=>$ph_no,"cid"=>$cid,"message"=>'ofc is there'];
            }
          
        } else {
            $response = ['status' => 0, 'message' => 'Failed to find'];
        }
        echo json_encode($response);
        break;
    }
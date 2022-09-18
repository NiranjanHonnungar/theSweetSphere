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
        $sql = "SELECT * FROM customer where uname=:uname";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':uname',$login->uname);
        if($stmt->execute()) {
            $res=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if($res==[])
            {
                $sql="INSERT INTO customer values(null,:uname,:fname,:lname,:pass,:ph_no)";
                $stmt=$conn->prepare($sql);
                $stmt->bindParam(':uname',$login->uname);
                $stmt->bindParam(':fname',$login->fname);
                $stmt->bindParam(':lname',$login->lname);
                $stmt->bindParam(':pass',$login->pass);
                $stmt->bindParam(':ph_no',$login->ph_no);
                if($stmt->execute())
                   $response=['status'=>1,"message"=>'Registered'];
            }
            else{
                $response=['status'=>0,"message"=>'Already registered!'];

            }
        }
        echo json_encode($response);
        break;
    }
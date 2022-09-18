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
        $prod = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO cart(cid,pid,quantity) VALUES(:cid,:pid,1)";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':pid', $prod->pid);
        $stmt->bindParam(':cid',$path[3]);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3] && $path[4]==0)) {
            $sql = "SELECT pid FROM cart WHERE cid=:id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);

        } else {
            $sql = "SELECT P.pid,P.pname,P.price,P.description,P.imgAlt,C.quantity FROM cart C,products P WHERE C.cid=:id and P.pid=C.pid";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if($path[4]!=0)
        {
        $sql = "DELETE FROM cart WHERE pid = :pid and cid=:cid";
        $stmt = $conn->prepare($sql);            
        $stmt->bindParam(':pid', $path[3]);
        $stmt->bindParam(':cid',$path[4]);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            return;
        }
        $sql = "DELETE FROM cart WHERE cid=:cid";
        $stmt = $conn->prepare($sql);  
        $stmt->bindParam(':cid',$path[3]);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
        break;
        
    case "PUT":
        $prod = json_decode( file_get_contents('php://input') );
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql="UPDATE cart SET quantity=:qty WHERE pid=:pid and cid=:cid";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam(':pid',$prod->pid);
        $stmt->bindParam(':qty',$prod->qty);
        $stmt->bindParam(':cid',$path[3]);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record update successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;
    }
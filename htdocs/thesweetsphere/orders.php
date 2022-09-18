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
        $order=json_decode(file_get_contents('php://input')); 
        $orderItems= $order->orderItems; 
        $address=$order->address;
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $sql="SELECT max(oid) as oid from orders";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $res=$stmt->fetchALL(PDO::FETCH_ASSOC);

        if(!$res[0]["oid"])
           $oid=1;
        $oid=$res[0]["oid"]+1;
        $date=date("Y-m-d",time());
        $sql="INSERT INTO orders values(:oid,:cid,:pid,:qty,:address,:date)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':oid',$oid);
        $stmt->bindParam(':date',$date);
        $stmt->bindParam(':address',$address);
        $stmt->bindParam(':cid',$path[3]);
        foreach($orderItems as $item)
        {
            $stmt->bindParam(':pid',$item->pid); 
            $stmt->bindParam(':qty',$item->qty);
            $stmt->execute();
        }
        break;
    case "GET":
        $sql='SELECT distinct oid FROM orders where cid=:cid';
        $stmt = $conn->prepare($sql);
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt->bindParam(':cid',$path[3]);
        $stmt->execute();
        $result=$stmt->fetchALL(PDO::FETCH_OBJ);
        $answer=[];
        foreach($result as $row)
        {   
             $sql2='SELECT pname, price, quantity,address from orders O,products P where O.pid=P.pid and oid=:oid';
             $sec = $conn->prepare($sql2);
             $oid=$row->oid;
             $sec->bindParam(':oid',$oid);
             $sec->execute();
             $response=$sec->fetchALL(PDO::FETCH_ASSOC);
             $answer[$row->oid]=$response;
        }
        echo(json_encode($answer));
        break;
    }
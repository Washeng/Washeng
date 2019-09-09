<?php

require "conn.php";

if(isset($_POST['$tel']) && isset($_POST['$password'])){
    $usertel=$_POST['$tel'];
    $pass=sha1($_POST['$password']);

    $result=$conn->query("select * from juanpiuser where tel='$usertel' and pass='$pass' ");

    if($result->fetch_assoc()){//匹配成功
        echo true;
    }else{
        echo false;
    }

}
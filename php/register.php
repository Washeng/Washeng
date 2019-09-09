<?php

require "conn.php";
if(isset($_POST['submit'])){
    
    $tel=$_POST['account'];
    $pass=sha1($_POST['password']);//加密
    echo $tel;
    //添加数据库
    $conn->query("insert juanpiuser values(null,'$tel','$pass')");
    // $conn->query("insert usertable values(null,'$name','$pass','$email',NOW())");

    //php的跳转
    header('location:http://10.31.157.39:8088/js/Project2/dist/html/login.html');
}
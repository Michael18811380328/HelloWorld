<?php
	// 练习jsonp请求
	// echo 'alert(1)';
	$arr = array('name'=>'itcast','age'=>10);
	$result = json_encode($arr); // {"name": "itcast", "age": 10}
	$a = $_GET['a']; // fn
	echo $a . '(' . $result . ')'; // fn({"name": "itcast", "age": 10});
?>
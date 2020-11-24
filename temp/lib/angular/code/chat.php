<?php
	$messages = array(
		'你说啥？',
		'你也好',
		'你找我有啥事？',
		'我在吃饭！'
	);
	// 通过array_rand()随机获取数组下标
	// var_dump(array_rand($messages));

	// var_dump(array_rand($messages));
	$key = array_rand($messages);
	echo $messages[$key];
	sleep(1);
?>
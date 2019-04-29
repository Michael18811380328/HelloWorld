		//javascript DOM practice1
    
    document.getElementById("p1").innerHTML = "Bingo";
		document.getElementById("p1").style.color = "red";
		document.getElementById("p1").style.backgroundColor = "yellow";
		var para = document.createElement("div");
		var node = document.createNode("hello");
		para.appendChild(node);
		console.log(para);

		var bingo = document.getElementById("p1");
		bingo.appendChild(para);
		var br = document.createElement("br");
		bingo.appendChild(br);
		bingo.appendChild(br);
    
    //javascript DOM practice2
    
    var array = ["red","blue"];
		var i = 0;
		function changeColor(){
			document.body.style.backgroundColor="lavender";
		}
		function changeButtonColor(){
			document.getElementById("button1").style.backgroundColor = arrar[i];
			i++;
		}
    
    //javascript DOM practice3
    var str = "iej";
		console.log(typeof(str));
		console.log(str.charAt(0));
		for (var i = 0 ; i < str.length; i ++){
			if(str.chat(i) == "f"){
				console.log( i+1 );
			}
		}
    
    //javascript BOM practice1
    var i = 0;
		var t; 
		function change(){
			document.getelementById("para").innerHTML = i;
			i ++;
			t = setTimeout("change()",1000);
		}
		// 注意：settimeout函数第一个参数代码需要加引号，自身周期循环，不需要再设置循环，直接函数递归调用即可。
    
    //javascript BOM practice2
    var t; 
		var i = 0;
		function time(){
			t = setTimeOut("changeColor()",1000)
		}
		function timeend() {
			chearTimeout(t);
		}
		function changeColor(){
			var arr = ["red","green"];
			document.body.style.backgroundColor = arr[i];
			i++;
		}
    

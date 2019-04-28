// 矩形动画效果
		var juxing = new JuXing(ctx,100,100,10,10,2,'black');
		juxing.draw();
		setInternal(function(){
			ctx.clearRect(0,0,cvs.width,cvs.height);
			juxing.startX += 2;
			juxing.draw();
		},50);
    
    ctx.setLineDash([4,2,1]);
		// 绘制虚线，内部加入数组，表示4px实现，2px空白，1px实线。（实线与空白间隔就是虚线）
		var i = 0 ;
		for(var len = 255;i <= len;i++){
			ctx.beginPath();
			ctx.moveTo(10,10+i);
			ctx.lineTo(210,10+i);
			ctx.strokeStyle = "rgb("+0+","+ i +','+255+")";
			ctx.stroke();
		}
		// 绘制一个渐变的矩形
		var cvs = document.getElementById('cvs');
		var ctx = cvs.getContext('2d');

		ctx.lineDashOffset = 3;
		// 设置虚线绘制时偏移量
		ctx.setLineDash([4,3,2]);
		ctx.moveTo(10,10);
		ctx.lineTo(100,10);
		ctx.stroke();
		console.log(ctx.getLineDash());
    
    // 绘制坐标轴
		var cvs = document.getElementById('cvs');
		var ctx = cvs.getContext('2d');

		var padding = {
			top:20,
			right:20,
			bottom:20,
			left:20
		}
		// 箭头尺寸
		var arrow = {
			width:20,
			height:20
		}
		// Y轴顶点坐标
		var vertexTop = {
			x:padding.left,
			y:padding.top
		}
		// 原点坐标
		var origin = {
			x:padding.left,
			y:cvs.height - padding.bottom
		}
		// X轴顶点坐标
		var vertexRight = {
			x:cvs.width - padding.right,
			y:cvs.height - padding.bottom
		}
		// 两个坐标轴
		ctx.moveTo(vertexTop.x, vertexTop.y);
		ctx.lineTo(origin.x,origin.y);
		ctx.lineTo(vertexRight.x,vertexRight.y);
		ctx.stroke();

		// 绘制坐标轴箭头
		ctx.beginPath();
		ctx.moveTo(vertexTop.x,vertexTop.y);
		ctx.lineTo(vertexTop.x - arrow.width/2,vertexTop.y + arrow.height);
		ctx.moveTo(vertexTop.x,vertexTop.y);
		ctx.lineTo(vertexTop.x + arrow.width/2,vertexTop.y + arrow.height);
		ctx.closePath();
		cts.fill();
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(vertexRight.x,vertexRight.y);
		ctx.lineTo(vertexRight.x - arrow.height,vertexRight.y - arrow.width/2);
		ctx.moveTo(vertexRight.x,vertexRight.y);
		ctx.lineTo(vertexRight.x - arrow.height, vertexRight.y + arrow.width/2);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// 在坐标轴内指定位置画一个点（小矩形）
		var point = {
			x:100,
			y:200
		}
		ctx.fillRect(origin.x + point.x, origin.x - point.y, 2, 2);

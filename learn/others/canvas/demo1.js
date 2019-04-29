    var cvs = document.getElementById('cvs');
		var ctx = cvs.getContext('2d');

		ctx.moveTo(10,10);
		ctx.lineTo(20,10);
		ctx.lineTo(20,20);
		ctx.lineTo(10,20);

		ctx.strokeStyle = 'blue';
		ctx.lineWidth = 6;
		// 线宽和颜色必须在绘制之前设置
		ctx.stroke();

		// 2.closePath()关闭路径，最后一条边省去
		ctx.moveTo(100,10);
		ctx.lineTo(160,10);
		ctx.lineTo(60,60);
		ctx.closePath();

		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 6;
		ctx.stroke();
		// 设置颜色和线宽度必须在绘制之前
    
    // 绘制矩形封装
		var cvs = document.getElementById('cvs');
		var ctx = cvs.getContext('2d');
		function juxing(startX,startY,width,height,lineWidth,strokeStyle){
			ctx.moveTo(startX,startY);
			ctx.lineTo(startX + width,startY);
			ctx.lineTo(startX+width,startY+height);
			ctx.lineTo(startX,startY+height);
			ctx.closePath();
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeStyle;
			ctx.stroke();
		}
		// 为了防止重绘之前的路径，绘制新路径需要吧之前的路径清除掉
		ctx.beginPath();
		juxing(100,100,10,20,3,"skyblue");
    
    // 矩形对象封装
		// 构造函数
		function JuXing(ctx,startX,startY,width,height,lineWidth,strokeStyle){
			this.ctx = ctx;
			this.startX = startX;
			this.startY = startY;
			this.width = width;
			this.height = height;
			this.lineWidth = lineWidth;
			this.strokeStyle = strokeStyle;
		}
		// 给原型添加一个绘制方法
		JuXing.prototype.draw = function(){
			this.ctx.moveTo(startX,startY);
			this.ctx.lineTo(startX + width,startY);
			this.ctx.lineTo(startX+width,startY+height);
			this.ctx.lineTo(startX,startY+height);
			this.ctx.closePath();
			this.ctx.lineWidth = lineWidth;
			this.ctx.strokeStyle = strokeStyle;
			this.ctx.stroke();
		}
		ctx.beginPath();
		var juxing = new JuXing(ctx,10,10,100,100,2,"pink");
		juxing.draw();
    
    //绘制三种矩形：矩形路径，描边矩形，填充矩形。
		// 矩形路径
		ctx.rect(10,10,10,10);
		ctx.stroke();
		// 描边矩形
		ctx.strokeRect(10,10,10,10);
		// 填充矩形
		ctx.fillRect(10,10,10,10);
		// 清除矩形区域
		ctx.clearRect(10,10,10,10);

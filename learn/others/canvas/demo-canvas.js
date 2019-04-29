      var cvs = document.getElementById('cvs');
      var ctx = cvs.getContext('2d');

      // method one
    	var baseRadian = 0;
    	setInterval(function(){
    	// 将当前状态保存一份
    	ctx.save();

    	ctx.clearRect(0,0,cvs.width,cvs.height);
    	ctx.translate(100,100);
    	ctx.rotate(baseRadian += Math.PI / 180*4);
    	ctx.fillRect(-25,-25,50,50);
    	ctx.restore();
    	},50);

    //method two
		ctx.translate(125,125);
		setInterval(function(){
			ctx.clearRect(-50,-50,cvs.width,cvs.height);
			ctx.rotate(Math.PI/180*4);
			ctx.fillRect(-25,-25,50,50);
		}, 50);

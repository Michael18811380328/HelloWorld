// first, create a html file and create a canvas which id is mycanvas;

var myCanvas = document.querySelector("#mycanvas");
var ctx = myCanvas.getContext("2d");

// basic methods
ctx beginPath();
ctx.fillStyle = "red";
ctx.arc(100, 100, 50, 0, Math.PI*2, true);
ctx.closePath();
ctx.fill();

let rand = (min, max) => {
	parseInt(Math.random()*(max-min) + min);
}

class Ball{
	constructor(){
		this.color = `rgb(${rand(1,256)}, ${rand(1,256)}, ${rand(1,256)},)`;
		var r = rand(2, 10);
		this.r = r;
		this.x = rand(r, maxWidth-r);
		this.y = rand(r, maxHeight-r);
	}
	draw(){
		ctx.beginPath();
		ctx.fillStyle = "purple";
		ctx.arc(100, 100, 50, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
}

let balls = [];
for(let i = 0; i < 10; i++){
	var ball = new Ball(ctx, canvasWidth, canvasHeight);
	balls.push(ball);
	// put new ball into balls
}
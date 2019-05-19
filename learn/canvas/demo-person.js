(function( w ) {
    function extend( o1, o2 ) {
        for ( var key in o2 ) {
            if ( o2.hasOwnProperty( key ) ) {
                o1[ key ] = o2[ key ];
            }
        }
    }
    function Person( ctx, img, widthFrame, heightFrame, x, y, renderWidth, renderHeight, speed ) {

        //将属性绑定到新对象上
        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.x = x;
        this.y = y;
        this.renderWidth = renderWidth;
        this.renderHeight = renderHeight;

        //计算其他参数
        this.speed = speed || 2;
        this.width = this.img.width / this.widthFrame;
        this.height = this.img.height / this.heightFrame;

        //设置定时器
        this.currentFrame = 0;
        this.direction = 0;

        this.bind();
    }

    // 给Person对象原型扩充方法
    extend( Person.prototype, {
    
        // 绘制方法
        draw: function() {
            this.ctx.drawImage( this.img,
                this.width * this.currentFrame, this.height * this.direction, this.width, this.height,
                this.x, this.y, this.renderWidth, this.renderHeight);
        },
        // 绑定按键事件
        bind: function() {
            var self = this;
            document.addEventListener( 'keydown', function( e ) {
                // 根据按键改变对象的方向
                switch ( e.keyCode ) {
                    case 37:
                        self.direction = 1;
                        break;
                    case 38:
                        self.direction = 3;
                        break;
                    case 39:
                        self.direction = 2;
                        break;
                    case 40:
                        self.direction = 0;
                        break;
                }

            } );
        },

        // 绑定更新
        update: function() {
            switch ( this.direction ) {
                //当对象位置超出画布，将对象改到另一侧（贪吃蛇）
                case 0:
                    this.y += this.speed;
                    this.y = this.y > this.ctx.canvas.height? -this.height: this.y;
                    break;
                case 1:
                    this.x -= this.speed;
                    this.x = this.x < -this.width? this.ctx.canvas.width: this.x;
                    break;
                case 2:
                    this.x += this.speed;
                    this.x = this.x > this.ctx.canvas.width? -this.width: this.x;
                    break;
                case 3:
                    this.y -= this.speed;
                    this.y = this.y < -this.height? this.ctx.canvas.height: this.y;
                    break;
            }
        }
    });
    w.Person = Person;
}( window ));

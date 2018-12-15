//utf-8 relax canvas function
var CVS=(function(){
	//重置canvas画布大小
	//ctx 2d绘制区域
	//backColor 绘制区域背景色
	//size number 或者 {W,H} 调整画布的高和宽
	function resetCanvas(ctx,backColor,size){
		var cav=ctx.canvas;
		bcolor='transparent';
		var defaultSize=500;
		csize=defaultSize;
		if (backColor) bcolor=backColor;
		if (size){
			if (typeof(size)==='object'){
				if (size.W===undefined || size.H===undefined){
				}else{
					csize=size;
				}
			}else if(typeof(size)==='number'){
				csize=size;
			}
		}
		if (typeof(csize)==='number'){
			cav.width=csize;
			cav.height=csize;
		}else{
			cav.width=parseInt(csize.W)? parseInt(csize.W) : defaultSize;
			cav.height=parseInt(csize.H)? parseInt(csize.H) : defaultSize;
		}
		ctx.beginPath();
		if (bcolor==='transparent'){
			ctx.clearRect(0, 0, cav.width, cav.height);
		}else{
			ctx.fillStyle=bcolor;
			ctx.rect(0,0,cav.width,cav.height);
			ctx.fill();
		}
	}
	
	//绘制放射线条
	//ctx 2d绘制区域
	//config参数
	//ct{x,y} 圆心坐标
	//r 半径
	//count 绘制数量
	//color 线的颜色
	//width 线宽
	function drawRadial(ctx, config){
		var arg={
			ct:{x:0, y:0},
			r:100,
			count:12,
			color:'#000',
			width:1
		};
		for (var x in config){
			if (arg[x]!==undefined) arg[x]=config[x];
		}
		ctx.beginPath();
		ctx.lineWidth=arg.width;
		ctx.strokeStyle=arg.color;
		var angle, radian;
		for (var i=0; i<arg.count; i++){
			angle=i*(360/arg.count);  //获得角度值
			radian=angle*Math.PI/180; //计算角度的弧度值
			ctx.moveTo(arg.ct.x,arg.ct.y);
			ctx.lineTo(Math.cos(radian)*arg.r+arg.ct.x,Math.sin(radian)*arg.r+arg.ct.y);
		}
		ctx.stroke();
	}
	
	//绘制圆
	function drawCircle(ctx, config){
		var arg={
			ct:{x:0, y:0},
			r:100,
			width:1,
			color:'#000',
			fill:'#fff'
		};
		for (var x in config){
			if (arg[x]!==undefined) arg[x]=config[x];
		}
		
		ctx.beginPath();
		ctx.fillStyle=arg.fill;
		ctx.arc(arg.ct.x, arg.ct.y, arg.r, 0, 2*Math.PI);
		ctx.fill();
		if (arg.width>0){
			ctx.strokeStyle=arg.color;
			ctx.lineWidth=arg.width;
			ctx.stroke();
		}
	}
	
	//绘制扇形
	function drawFan(ctx, config){
		var arg={
			ct:{x:0, y:0},
			r:100,
			width:1,
			color:'#000',
			fill:'#fff',
			start:0,
			end:360
		};
		for (var x in config){
			if (arg[x]!==undefined) arg[x]=config[x];
		}
		var radianStart=arg.start*Math.PI/180;
		var radianEnd=arg.end*Math.PI/180;
		ctx.beginPath();
		ctx.fillStyle=arg.fill;
		ctx.moveTo(arg.ct.x, arg.ct.y);
		ctx.arc(arg.ct.x, arg.ct.y, arg.r, radianStart, radianEnd);
		ctx.lineTo(arg.ct.x, arg.ct.y);
		ctx.fill();
		if (arg.width>0){
			ctx.strokeStyle=arg.color;
			ctx.lineWidth=arg.width;
			ctx.stroke();
		}
	}
	
	return{
		reset: resetCanvas,
		radial: drawRadial,
		circle: drawCircle,
		fan: drawFan
	};
})();


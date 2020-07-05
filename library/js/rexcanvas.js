//relax canvas 2020/07/04 ECMA5
function rexCav({cav,w,h}){
	this.cav=cav? cav.getContext('2d') : document.createElement('canvas').getContext('2d');
	this.w=isNaN(w-0)? this.cav.canvas.width : w-0;
	this.h=isNaN(h-0)? this.cav.canvas.height: h-0;
	this.cx=this.w/2;
	this.cy=this.h/2;
	this.reset({});
}
//=== 重置画布 ====
/*
	cx 画布2d对象，默认使用类的cav
	w,h 画布宽和高
	bg 填充色
*/
rexCav.prototype.reset=function({cx,w,h,bg}){
	if (!cx) cx=this.cav;
	if (!isNaN(w-0)){
		cx.canvas.width=w-0;
	}else{
		cx.canvas.width=this.w;
		w=this.w;
	}
	if (!isNaN(h-0)){
		cx.canvas.height=h-0;
	}else{
		cx.canvas.height=this.h;
		h=this.h;
	}
	this.cx=w/2;
	this.cy=h/2;
	if (bg){
		cx.fillStyle=bg;
		cx.rect(0,0,w,h);
		cx.fill();
	}
};
//=== 绘制圆/扇形 ====
/*
	cx...
	x,y 圆心坐标
	r 圆半径
	f 填充色
	cp 绘制模式 见globalCompositeOperation参考资料
	sw 边框宽
	sf 边框色
	angle 角度，默认绘制圆360
*/
rexCav.prototype.drawArc=function({cx,x,y,r,f,cp,sw,sf,angle}){
	if (!cx) cx=this.cav;
	//协调超范围的角度
	if (isNaN(angle-0)) angle=360;
	while(angle<0 || angle>360){
		if (angle>360){
			angle-=360;
		}else if(angle<0){
			angle+=360;
		}
	}
	if (angle===0) return;
	
	cx.beginPath();
	if (f) cx.fillStyle=f;
	if (cp){
		cx.globalCompositeOperation=cp;
	}else if(cp===''){
		cx.globalCompositeOperation='source-over';
	}
	if (x===undefined) x=this.cx;
	if (y===undefined) y=this.cy;
	cx.arc(x, y, r, 0, Math.PI/180*angle);
	if (f) cx.fill();
	if (sw) {
		cx.lineWidth=sw;
		if (sf) cx.strokeStyle=sf;
		cx.stroke();
	}
};
//=== 绘制矩形 ====
/*
	w,h 矩形的宽高
*/
rexCav.prototype.drawRect=function({cx,x,y,w,h,f,cp,sw,sf}){
	if (!cx) cx=this.cav;
	cx.beginPath();
	if (f) cx.fillStyle=f;
	if (cp){
		cx.globalCompositeOperation=cp;
	}else if(cp===''){
		cx.globalCompositeOperation='source-over';
	}
	if (x===undefined) x=this.cx;
	if (y===undefined) y=this.cy;
	cx.rect(x, y, w, h);
	if (f) cx.fill();
	if (sw) {
		cx.lineWidth=sw;
		if (sf) cx.strokeStyle=sf;
		cx.sf();
	}
};
//=== 绘制文本 ====
/*
	text 文本内容
	size 文本尺寸
*/
rexCav.prototype.drawText=function({cx,x,y,text,size,f,cp}){
	if (!text) return;
	if (!cx) cx=this.cav;
	cx.beginPath();
	cx.font=size+'px "Arial, Helvetica, sans-serif"';
	if (cp){
		cx.globalCompositeOperation=cp;
	}else if(cp===''){
		cx.globalCompositeOperation='source-over';
	}
	if (f) cx.fillStyle=f;
	cx.textAlign='center';
	cx.textBaseline='middle';
	if (x===undefined) x=this.cx;
	if (y===undefined) y=this.cy;
	cx.fillText(text, x, y);
};
//=== 得到线性渐变的填充对象 ===
/*
	x,y 渐变中心坐标
	color 渐变色节点数组，比如 [[0,'#f90'],[1,'red']]
	angle 渐变旋转角度（按中心坐标旋转）
	r 渐变半径
*/
rexCav.prototype.getLinearGradient=function({cx,x,y,color,angle,r}){
	if (!cx) cx=this.cav;
	if (isNaN(angle-0)) angle=0;
	if (isNaN(r-0)){
		if (this.w>this.h){
			r=ctx.canvas.width;
		}else{
			r=ctx.canvas.height;
		}
	}
	while(angle<0 || angle>360){
		if (angle>360){
			angle-=360;
		}else if(angle<0){
			angle+=360;
		}
	}
	if (x===undefined) x=this.cx;
	if (y===undefined) y=this.cy;
	let radian=Math.PI/180*angle;  //弧度值
	x1=x-Math.cos(radian)*r;
	y1=y-Math.sin(radian)*r;
	x2=x+Math.cos(radian)*r;
	y2=y+Math.sin(radian)*r;
	let grad=cx.createLinearGradient(x1,y1,x2,y2);
	for (let i=0; i<color.length; i++){
		grad.addColorStop(color[i][0],color[i][1]);
	}
	return grad;
};
//获取平铺填充图案
/*
	source 图片对象，画布对象或者视频
	type repeat/repeat-x/repeat-y/no-repeat
*/
rexCav.prototype.getPattern=function({source,type}){
	return this.cav.createPattern(source,type);
}
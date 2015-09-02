// JavaScript Document
'use strict';
;(function(global){
	var bOk=false;
	global.Calendar=function(id){
		this.obj=document.getElementById(id);
		this.oBox=document.createElement('div');
		this.oBox.className='box';
		this.oBox.innerHTML='<a href="javascript:;" class="right"></a>\
		<a href="javascript:;" class="left"></a><h2></h2>\
		<p class="tick"></p>\
		<ol><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li>\
		<li class="week">六</li><li class="week">日</li></ol><ul></ul>';	
		this.oH=this.oBox.getElementsByTagName('h2')[0];
		this.oP=this.oBox.getElementsByTagName('p')[0];
		this.oUl=this.oBox.getElementsByTagName('ul')[0];
		this.oNext=this.oBox.getElementsByTagName('a')[0];
		this.oPrev=this.oBox.getElementsByTagName('a')[1];
		this.timer=null;
		this.iNow=0;
		this.init();	
	}
	Calendar.prototype={
		init:function(){
			this.createLi();
			this.setDay();
			this.tick();
			this.next();
			this.prev();
			this.stopB();
			this.focus();
			this.link();
			this.obj.parentNode.appendChild(this.oBox);	
		},
		stopB:function(){
			var _this=this;
			this.oBox.onclick=function(ev){
				var oEvent=ev||event;
				oEvent.cancelBubble=true;	
			};
			function addEvent(obj,sEv,fn){
				if(obj.addEventListener){
					obj.addEventListener(sEv,fn,false);	
				}else{
					obj.attachEvent('on'+sEv,fn);	
				}	
			}
			addEvent(document,'click',function(){
				_this.oBox.style.display='none';
				_this.iNow=0;
				_this.init();	
			});	
		},
		focus:function(){
			var _this=this;
			this.obj.onfocus=this.obj.onclick=function(ev){
				var oEvent=ev||event;
				oEvent.cancelBubble=true;
				if(_this.obj.value){
					_this.obj.value='';	
				}
				_this.oBox.style.display='block';
				_this.oBox.style.left=_this.obj.offsetLeft+'px';
				_this.oBox.style.top=_this.obj.offsetTop+_this.obj.offsetHeight+'px';	
			};
		},
		setDay:function(){
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+this.iNow);
			var y=oDate.getFullYear();
			var m=oDate.getMonth()+1;
			m=m<10?'0'+m:''+m;
			this.oH.innerHTML=y+'年 - '+m+'月';	
		},
		next:function(){
			var _this=this;
			this.oNext.onclick=function(){
				_this.iNow++;
				_this.createLi();
				_this.setDay();
				return false;	
			};	
		},
		link:function(){
			if(bOk)return;
			bOk=true;
			var oLink=document.createElement('link');
			oLink.rel='stylesheet';
			oLink.href='calendar.css';
			oLink.type='text/css';
			document.documentElement.children[0].appendChild(oLink);	
		},
		prev:function(){
			var _this=this;
			this.oPrev.onclick=function(){
				_this.iNow--;
				_this.createLi();
				_this.setDay();	
				return false;
			};	
		},
		tick:function(){
			var _this=this;
			function toGo(){
				var oDate=new Date();
				var h=oDate.getHours();
				var m=oDate.getMinutes();
				var s=oDate.getSeconds();
				h=h<10?'0'+h:''+h;
				m=m<10?'0'+m:''+m;
				s=s<10?'0'+s:''+s;
				_this.oP.innerHTML=h+':'+m+':'+s;	
			}
			toGo();
			this.timer=setInterval(toGo,1000);	
		},
		createLi:function(){
			var _this=this;
			this.oUl.innerHTML='';
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+this.iNow,1);
			var w=oDate.getDay();
			if(w==0)w=7;
			w--;
			for(var i=0;i<w;i++){
				var oLi=document.createElement('li');
				this.oUl.appendChild(oLi);	
			}
			oDate.setMonth(oDate.getMonth()+1,0);
			var n=oDate.getDate();
			for(var i=0;i<n;i++){
				var oLi=document.createElement('li');
				oLi.className='hover';
				oLi.innerHTML=i+1;
				var oDate=new Date();
				var oToday=oDate.getDate();
				if(this.iNow<0){
					oLi.className='pass hover';	
				}else if(this.iNow==0){
					if((i+w)%7==5||(i+w)%7==6){
						oLi.className='week hover';	
					}
					if(i+1==oToday){
						oLi.className='today hover';	
					}
					if(i+1<oToday){
						oLi.className='pass hover';	
					}
					if(i+1>=oToday){
						oLi.onclick=function(){
							_this.oBox.style.display='none';
							var arr=_this.oH.innerHTML.match(/\d+/g).concat(this.innerHTML);
							_this.obj.value=arr.join('-');
							_this.iNow=0;
							_this.init();
							return false;	
						};	
					}	
				}else{
					if((i+w)%7==5||(i+w)%7==6){
						oLi.className='week hover';	
					}
					oLi.onclick=function(){
						_this.oBox.style.display='none';
						var arr=_this.oH.innerHTML.match(/\d+/g).concat(this.innerHTML);
						_this.obj.value=arr.join('-');
						_this.iNow=0;
						_this.init();	
						return false;
					};	
				}
				this.oUl.appendChild(oLi);	
			}
		}	
	};
})(window);
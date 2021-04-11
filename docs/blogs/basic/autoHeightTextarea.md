---
title: textarea高度自适应多行文本
date: '2020-05-06 09:47:00'
sidebar: true
categories:
 - 移动端
tags:
 - textarea
 - 自适应高度
publish: true
---

# Web移动端实现高度自适应多行文本

初衷：最近刚好有H5项目需求是使用这么一个控件；如果H5仅运行在IOS的话，就没必要大费周章了，只要给dom元素增加contenteditable="true"属性，然后设置样式user-select:"auto"就可以了。这时就会有小伙伴发出疑问了，难道contenteditable属性在Android端就不支持了吗？其实不然，安卓也是支持这个属性的，但会逼死强迫症患者。至于是怎么一回事，下面让博主来揭晓：

![](https://img-blog.csdnimg.cn/20200506094326700.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpbmF0XzM4MTc4NzMw,size_16,color_FFFFFF,t_70)
问题图片来源（侵权删）：[http://www.imooc.com/wenda/detail/411576](http://www.imooc.com/wenda/detail/411576)


可以看到，在安卓端失焦时并不会自动消除光标水滴，而且点击了其他dom元素也不一定消除（博主的测试结果是时有时无），是不是逼死强迫症！！！！！！

##  效果图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200506094121117.gif)



## 一种不得体的解决办法（vue版本）
#利用vue的属性观察和表单控件的数据双向绑定，动态给textarea多行文本框调整高度

```javascript
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title></title>
	<script src="js/vue.min.js" type="text/javascript" charset="utf-8"></script>
	<style type="text/css">
		*{
			font-size: 16px;
			padding: 0;
		}
		#app{
			position: relative;
			height: auto;
			font: normal 16px auto;
			overflow: hidden;
		}
		.hide{
			padding: 0;
			margin: 0;
			word-break: break-all;
			border-bottom: 1px solid black;
			line-height: 21px;
			box-sizing: border-box;
			opacity: 0;
		}
		.hide{
			min-height: 22px;
			white-space:pre-wrap;
		}
		textarea{
			height: 21px;
			line-height: 21px;
			width: 100%;
			position: absolute;
			top: 0;
			bottom: 0;
			outline: none;
			border: none;
			border-bottom: 1px solid #000000;
			font: normal 16px auto;
			border-radius: 0;
		}
		textarea:focus{
			border-bottom: 1px solid blue;
		}
	</style>
</head>
<body>
	<h1>移动端自适应高度多行文本输入框</h1>
	<div id="app">
		<div class="hide">{{text}}</div>
		<textarea id="input" type="text" v-model="text"></textarea>
	</div>
	
</body>
<script type="text/javascript">
	var vue = new Vue({
		el: '#app',
		data:{
			text:'',
		},
		watch:{
			text:function(newtext,oldtext){
				
				var input = document.getElementById('input');
				var hide = document.querySelector('.hide');
				// 增加文本时
				if(newtext.length > oldtext.length){
					console.log('增加')
					document.querySelector('#app').style.height = (input.scrollHeight + 1) + 'px'
					input.style.height = input.scrollHeight + 'px';
				}
				// 删除文本时
				else{
					console.log('减少')
					document.querySelector('#app').style.height = 'auto'
					// 延时执行，否则dom元素的自动高度尚未被渲染就获取实际高度，导致获取到的高度不对
					setTimeout(function(){
						input.style.height = hide.offsetHeight - 1 + 'px'
					},100)
				}
			}
		}
	})
</script>
</html>
```

##  原生JS版本

```javascript
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title></title>
	<script src="js/vue.min.js" type="text/javascript" charset="utf-8"></script>
	<style type="text/css">
		*{
			font-size: 16px;
			padding: 0;
		}
		#app{
			position: relative;
			height: auto;
			font: normal 16px auto;
			overflow: hidden;
		}
		.hide{
			padding: 0;
			margin: 0;
			word-break: break-all;
			border-bottom: 1px solid black;
			line-height: 21px;
			box-sizing: border-box;
			opacity: 0;
		}
		.hide{
			min-height: 22px;
			white-space:pre-wrap;
		}
		textarea{
			height: 21px;
			line-height: 21px;
			width: 100%;
			position: absolute;
			top: 0;
			bottom: 0;
			outline: none;
			border: none;
			border-bottom: 1px solid #000000;
			font: normal 16px auto;
			border-radius: 0;
		}
		textarea:focus{
			border-bottom: 1px solid blue;
		}
	</style>
</head>
<body>
	<h1>移动端自适应高度多行文本输入框</h1>
	<div id="app">
		<div class="hide"></div>
		<textarea id="input" type="text"></textarea>
	</div>
	
</body>
<script type="text/javascript">
	var input = document.getElementById('input');
	var newtext = oldtext = ''
	input.oninput = function (){
		// 获取新的值
		newtext = this.value
		var hide = document.querySelector('.hide');
		hide.innerHTML = newtext
		// 增加文本时
		if(newtext.length > oldtext.length){
			console.log('增加')
			document.querySelector('#app').style.height = (input.scrollHeight + 1) + 'px'
			input.style.height = input.scrollHeight + 'px';
		}
		// 删除文本时
		else{
			console.log('减少')
			document.querySelector('#app').style.height = 'auto'
			// 延时执行，否则dom元素的自动高度尚未被渲染就获取实际高度，导致获取到的高度不对
			setTimeout(function(){
				input.style.height = hide.offsetHeight - 1 + 'px'
			},100)
		}
		oldtext = newtext
	}
</script>
</html>
```

> 第一次写博客，多多担待
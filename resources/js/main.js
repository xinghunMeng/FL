require.config({
	shim:{
		'jquery.ui':['jquery']
	},　　　　
	paths: {　　　　　　
		"jquery": "../lib/jquery-2.1.4.min",
		"jquery.ui": "../lib/jquery-ui.1.11.2",
		"BMap": "http://api.map.baidu.com/api?v=2.0&ak=0mWBmtCu1yAUKkGVwOZ0i3Be"　　
	}　　
});
	//调用右上脚时间模块
	require(['time'], function (time) {
　　　　time.setCurrent(".time",".date",".week")
　　});


$(document).ready(function() {
//下方三块的拖拽事件
$(".FL").draggable({containment: "#containment-wrapper", scroll: false}); 
$(".LX").draggable({containment: "#containment-wrapper", scroll: false}); 
$(".HB").draggable({containment: "#containment-wrapper", scroll: false}); 
//弹出视频的测试按钮
$(".time").click(function() {
	window.CallCSharpMethod("ShowVideo","400,400,600,600");
})
	//showCal()

	

	//下方三个图表的配置
	var myChart = echarts.init(document.getElementById('office_chart'));
	var myChart1 = echarts.init(document.getElementById('type_chart'));
	var myChart2 = echarts.init(document.getElementById('ratio_chart'));
	var option = {
		//calculable: true,
		color: ["#0096f1"],
		backgroundColor:'rgba(23,94,130,0.4)',
		grid: {
			x:40,
			y:40,
			x2:40,
			y2:40,			
		},
		xAxis: [{
			type: 'category',
			nameTextStyle: {
				color: "#fffbff"
			},
			splitLine:{
				show:false
			},
			boundaryGap: false,
			axisLabel: {
				textStyle:{
					color:'#ffffff'
				}
			},
			data: ['19', '20', '21', '22', '23', '24', '25']
		}],
		yAxis: [{
			type: 'value',
			nameTextStyle: {
				color: "#fffbff"
			},
			axisLabel: {
				formatter: '{value}',
				textStyle:{
					color:'#ffffff'
				}
			}
		}],

		series: [{
			name: '最高气温',
			type: 'line',
			data: [11, 11, 15, 13, 12, 13, 10]


		}]
	};
	//生成下方的第一个图表
	myChart.setOption(option);
	//下方第一个图表的点击事件
	$(".trend_ul li").click(function() {	
		
		$(".trend_ul li").removeClass('trend_sel')
		$(this).addClass('trend_sel')
		$("#office_chart").empty()
		var myChart = echarts.init(document.getElementById('office_chart'));
		myChart.setOption(option);
	})
	
	var placeHolderStyle = {
		normal: {
			color: 'rgba(0,0,0,0)',
			label: {
				show: false
			},
			labelLine: {
				show: false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	option1 = {
		/*title: {
			text: '你幸福吗？',
			// subtext: 'From ExcelHome',
			//sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
			x: 'center',
			y: 'center',
			itemGap: 20,
			textStyle: {
				color: 'rgba(30,144,255,0.8)',
				fontFamily: '微软雅黑',
				fontSize: 25,
				fontWeight: 'bolder'
			}
		},*/
		// tooltip: {
		// 	show: true,
		// 	formatter: "{a} <br/>{b} : {c} ({d}%)"
		// },
		// legend: {
		// 	orient: 'vertical',
		// 	x: document.getElementById('main').offsetWidth / 2,
		// 	y: 45,
		// 	itemGap: 12,
		// 	data: ['68%的人表示过的不错', '29%的人表示生活压力很大', '3%的人表示“我姓曾”']
		// },
		// toolbox: {
		// 	show: true,
		// 	feature: {
		// 		mark: {
		// 			show: true
		// 		},
		// 		dataView: {
		// 			show: true,
		// 			readOnly: false
		// 		},
		// 		restore: {
		// 			show: true
		// 		},
		// 		saveAsImage: {
		// 			show: true
		// 		}
		// 	}
		// },
		color: ["#c1e2e7","#a4d7f2","#87c5ee","#29a6dc","#0095d9","#0077bb","#1c5c88","#254a76"],
		
		series: [{
			name: '1',
			type: 'pie',
			clockWise: false,
			radius: [80, 90],
			itemStyle:{ normal: {
				color:"#254a76",
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			}},
			data: [{
				value: 68,
				name: '68%的人表示过的不错'
			}, {
				value: 32,
				name: 'invisible',
				itemStyle: placeHolderStyle
			}]
		}, {
			name: '2',
			type: 'pie',
			clockWise: false,
			radius: [70, 80],
			itemStyle:{normal: {
				color:"#1c5c88",
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			}},
			data: [{
				value: 29,
				name: '29%的人表示生活压力很大'
			}, {
				value: 71,
				name: 'invisible',
				itemStyle: placeHolderStyle
			}]
		}, {
			name: '3',
			type: 'pie',
			clockWise: false,
			radius: [60, 70],
			itemStyle:{normal: {
				color:"#0077bb",
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			}},
			data: [{
				value: 50,
				name: '3%的人表示“我姓曾”'
			}, {
				value: 50,
				name: 'invisible',
				itemStyle: placeHolderStyle
			}]
		},{
			name: '4',
			type: 'pie',
			clockWise: false,
			radius: [50, 60],
			itemStyle:{normal: {
				color:"#0095d9",
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			}},
			data: [{
				value: 50,
				name: '3%的人表示“我姓曾”'
			}, {
				value: 50,
				name: 'invisible',
				itemStyle: placeHolderStyle
			}]
		},{
			name: '5',
			type: 'pie',
			clockWise: false,
			radius: [40, 50],
			itemStyle:{normal: {
				color:"#29a6dc",
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			}}, 
			data: [{
				value: 56,
				name: '3%的人表示“我姓曾”'
			}, {
				value: 44,
				name: 'invisible',
				itemStyle: placeHolderStyle
			}]
		},{
			name: '6',
			type: 'pie',
			clockWise: false,
			radius: [30, 40],
			itemStyle:{normal: {
				color:"#87c5ee",
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			}},
			data: [{
				value: 50,
				name: '3%的人表示“我姓曾”'
			}, {
				value: 50,
				name: 'invisible',
				itemStyle: placeHolderStyle
			}]
		},{
			name: '7',
			type: 'pie',
			clockWise: false,
			radius: [20, 30],
			itemStyle:{normal: {
				color:"#a4d7f2",
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			}},
			data: [{
				value: 50,
				name: '3%的人表示“我姓曾”'
			}, {
				value: 50,
				name: 'invisible',
				itemStyle: placeHolderStyle
			}]
		},{
			name: '8',
			type: 'pie',
			clockWise: false,
			radius: [10, 20],
			itemStyle:{normal: {
				color:"#c1e2e7",
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			}},
			data: [{
				value: 50,
				name: '3%的人表示“我姓曾”'
			}, {
				value: 50,
				name: 'invisible',
				itemStyle: placeHolderStyle
			}]
		}]
	};
	//生成下方的第二个图表
	myChart1.setOption(option1);
	
	option2 = {
   
	   	backgroundColor:'rgba(23,94,130,0.4)',
	    //calculable : true,
	    grid: {
				x:40,
				y:20,
				x2:40,
				y2:20,			
			},
	    xAxis : [
	        {	
	        	show:false,
	            type : 'value',
	            boundaryGap : [0, 0.01]
	        }
	    ],
	    yAxis : [
	        {
	        	show:false,
	            type : 'category',
	            data : ['巴西']
	        }
	    ],
	    dataZoom:{
	    	show:false
	    },
	    series : [
	        {
	            name:'2011年',
	            type:'bar',
	            data:[11238],
	            itemStyle:{ normal: {
					color:"#2caae5",
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				}},
				barWidth:15
	        },
	         {
	            name:'2012年',
	            type:'bar',
	            data:[7085],
	            itemStyle:{ normal: {
					color:"#4b89dc",
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				}},
				barWidth:15
	        },
	         {
	            name:'2013年',
	            type:'bar',
	            data:[9297],
	            itemStyle:{ normal: {
					color:"#8bc2eb",
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				}},
				barWidth:15
	        },
	         {
	            name:'2014年',
	            type:'bar',
	            data:[12297],
	            itemStyle:{ normal: {
					color:"#eaeceb",
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				}},
				barWidth:15
	        }
	    ]
	};
	//生成下方的第二个图表
	myChart2.setOption(option2);
})
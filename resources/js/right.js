/* 
* @Author: Yaphet_peng
* @Date:   2015-09-24 14:13:10
* @Last Modified by:   Yaphet_peng
* @Last Modified time: 2015-09-25 15:01:37
*/

$(document).ready(function() {

	// 给右侧添加滚动条
	var selector = document.querySelector('.tab_gps_con')
	var selector1 = document.querySelector('.monitor_con')
	var selector2 = document.querySelector('.none') 
	var selector3 = document.querySelector('.alarm_con')
	var scrollBar = new Scroll(selector)
	var scrollBar1 = new Scroll(selector1)
	var scrollBar2 = new Scroll(selector2)
	var scrollBar3 = new Scroll(selector3)
	scrollBar.init()
	scrollBar1.init()
	scrollBar2.init()
	scrollBar3.init()
	
	//GPS分块的点击切换事件
	$('.tab_gps .top span').click(function(e) {

		var gpsIndex 

		$(this).parent().find('span').removeClass('selected')
		$(this).addClass('selected')

		gpsIndex = $(this).index()

		if (gpsIndex === 0) {

			$('.tab_gps .con:eq(0)').show()
			$('.tab_gps .con:eq(1)').hide()
		} else {

			$('.tab_gps .con:eq(1)').show()
			$('.tab_gps .con:eq(0)').hide()
		}
	})
	//右侧查询点击事件
	$(".cx").click(function() {
		if ($(".right").css("right") == "-315px") {
			$(".right").animate({
				right:0
			})
			$(".cx").css("background","url(resources/images/serch.png)")
		} else {
			$(".cx").css("background","url(resources/images/serch1.png)")
			$(".right").animate({
				right:"-315px"
			})
		}
		
	})


	//下侧三块的点击事件
	$(".offiec_button").click(function() {
		if ($(".offiec_button").hasClass("up")) {
			$(".offiec_button").removeClass("up")
			$(".offiec_button").addClass("down")
			$("#office_chart").show()
		} else {			
			$(".offiec_button").addClass("up")
			$(".offiec_button").removeClass("down")
			$("#office_chart").hide()
		}
	})

	$(".type_xl").click(function() {
		if ($(".type_xl").hasClass("up")) {
			$(".type_xl").removeClass("up")
			$(".type_xl").addClass("down")
			$(".type_type").show()
		} else {			
			$(".type_xl").addClass("up")
			$(".type_xl").removeClass("down")
			$(".type_type").hide()
		}
	})

	$(".ratio_xl").click(function() {
		if ($(".ratio_xl").hasClass("up")) {
			$(".ratio_xl").removeClass("up")
			$(".ratio_xl").addClass("down")
			$("#ratio_chart").show()
		} else {			
			$(".ratio_xl").addClass("up")
			$(".ratio_xl").removeClass("down")
			$("#ratio_chart").hide()
		}
	})
	
	//右侧块的点击事件
	$('.tab_title div').click(function(e) {

		var index = $(this).index()
		if (index == 1) {
			$(this).css("background","url(resources/images/cctv1.png)")
			$(".gps").css("background","url(resources/images/gps.png)")
			$(".alarm").css("background","url(resources/images/info.png)")
		} else if (index == 2) {
			$(this).css("background","url(resources/images/gps1.png)")
			$(".alarm").css("background","url(resources/images/info.png)")
			$(".monitor").css("background","url(resources/images/cctv.png)")
		} else {
			$(this).css("background","url(resources/images/info1.png)")
			$(".gps").css("background","url(resources/images/gps.png)")
			$(".monitor").css("background","url(resources/images/cctv.png)")
		}
		

		var index = $(this).index()

		$('.tab_cotainer  > div:nth-child('+(index)+')')
			.css('display','block').siblings().css('display','none')		

		e.preventDefault()
		e.stopPropagation()
	})



})
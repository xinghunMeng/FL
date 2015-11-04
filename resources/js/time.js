define(function() {
	//时间模块
	var time1,date1,week1
	function checkTime(i) {
		if (i < 10) {
			i = "0" + i
		}
		return i
	}
		
	var setCurrent = function(time, date, week) {
		time1 = time
		date1 = date
		week1 = week
		setInterval(time2,500)
	}
	
	function time2() {		
		var MyDate = new Date()
		var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
		var year = MyDate.getFullYear()
		var month = checkTime(MyDate.getMonth() + 1)
		var day = checkTime(MyDate.getDate())
		var hours = MyDate.getHours()
		var min = checkTime(MyDate.getMinutes())
		var sec = checkTime(MyDate.getSeconds())
		document.querySelector(time1).innerHTML=hours + ':' + min + ':' + sec
		document.querySelector(date1).innerHTML=month + " 月 " + day + " 日"
		document.querySelector(week1).innerHTML=weeks[Number(MyDate.getDay())]
		
	}

	return {
        setCurrent: setCurrent
    }


})
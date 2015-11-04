/*
 * @Author: zhangyujie
 * @Date:   2015-07-30 21:53:34
 * @Last Modified by:   Yaphet_peng
 * @Last Modified time: 2015-09-25 15:14:50
 */

'use strict';

//$wrap 为需要添加滚动条的容器
function Scroll(wrap, style) {

	this.wrap = wrap
	this.$wrap = $(wrap)
	this.$content = null //内容区域
	this.$scrollBar = null //可滚动的条框,
	this.$barWrap = null //滚动条框的父元素
	this.barH = null //滚动条的高度
	this.wrapH = null //容器的高度
	this.contentH = null //内容的实际高度
	this.barDiffHeight = null //滚动的条和父元素的高度差

	if (!style) {

		this.style = {
			bar: {
				"background-color": "#185e82",
				"width": "6px"
			},
			button: {
				"background-color": "#719bb3",
				"width": "6px"
			}
		}

		var parent = document.querySelector('.canvas-wrap')

		if (parent && parent.contains(wrap)) {

			this.style = $(parent).data('allStyle').scrollBarStyle

		}

	}

}

//创建滚动条所需要的div
Scroll.prototype._createBar = function(callback) {

	var $wrap = this.$wrap,
		$content = this.$content,
		$scrollBar = this.$scrollBar,
		$barWrap = this.$barWrap,
		wrap = this.wrap,
		contentH = 0,
		barStyle,
		buttonStyle,
		key

	barStyle = this.style.bar

	buttonStyle = this.style.button

	if (wrap.firstElementChild) {

		contentH = $(wrap.firstElementChild).height()

	}

	if ($wrap.height() >= contentH - 5) {

		return false
	}

	var childNodes = wrap.childNodes


	$content = $('<div></div>').addClass('content')

	if (childNodes) {

		while (childNodes.length) {

			$content[0].appendChild(childNodes[0])

		}

	}
	$content[0].style.position = 'position'

	$content[0].style.left = 0 + 'px'

	$content[0].style.top = 0 + 'px'

	$scrollBar = $('<span></span>')
		.addClass('scroll-button')

	for (key in buttonStyle) {

		$scrollBar.css(key, buttonStyle[key])

	}

	$barWrap = $('<div></div>')
		.addClass('scroll-bar')
		.append($scrollBar)

	$barWrap.data('object', this)

	for (key in barStyle) {

		$barWrap.css(key, barStyle[key])
	}

	$wrap.append($content)

	$wrap.append($barWrap)


	$content.css('left', 0 + 'px').css('top', 0 + 'px')

	$wrap.addClass('scroll')

	this.wrapH = $wrap.height()

	this.contentH = $content.height()

	this.barH = Math.max((this.wrapH * this.wrapH) / this.contentH, 20)

	$scrollBar.css('height', this.barH + 'px')


	this.barDiffHeight = $barWrap.height() - $scrollBar.height()

	this.$wrap = $wrap
	this.$content = $content
	this.$scrollBar = $scrollBar
	this.$barWrap = $barWrap

	if (callback) {

		callback()
	}

}

Scroll.prototype._scrolling = function(y) {

	var rate = -(y / (this.$barWrap.height() - this.$scrollBar.height())) * (this.$content.height() - this.$wrap.height())

	this.$scrollBar.css('top', y + 'px')

	this.$content.css('top', rate + 'px')

}
Scroll.prototype._wheel = function(event) {

	var event = event || window.event

	var isMacWebkit = (navigator.userAgent.indexOf('Macintosh') !== -1 && navigator.userAgent.indexOf('WebKit') !== -1)

	var isFirefox = navigator.userAgent.indexOf('Gecko') !== -1

	//var deltaY = event.deltaY * -30 || event.wheelDeltaY / 4 || (event.wheelDeltaY === undefined && event.wheelDelta / 4) || event.detail * -10 || 0

	var deltaY = event.deltaY * -30 || event.wheelDeltaY / 4 || (event.wheelDeltaY === undefined && event.wheelDelta / 4) || event.detail * -10 || 0

	deltaY = - deltaY

	if (isMacWebkit) {

		deltaY = deltaY / 30
	} else {

		deltaY = deltaY / 120
	}


	var distances = this.$scrollBar.position().top + deltaY;

	if (distances < 0) {

		distances = 0

	} else if (distances > (this.wrapH - this.barH)) {

		distances = (this.wrapH - this.barH)
	}

	this._scrolling(distances);


	return false;
}
Scroll.prototype._wheelHandler = function(that, e) {


		that._wheel(e)

		if (e.preventDefault) {

			e.preventDefault()
		}

		if (e.stopPropagation) {

			e.stopPropagation()
		}

		e.cancelBubble = true
		e.returnValue = true
	}
	//绑定事件
Scroll.prototype._bindEvent = function() {
	var that = this

	this.$scrollBar.on('mousedown', function(event) {

		console.log('---------------------------1')
		var startEventTop = event.pageY
		var startTop = Number(this.offsetTop)
		var self = this

		$(document).on('mousemove', function(e) {

			var mouseEventTop = e.pageY
			var diff = mouseEventTop - startEventTop
			var pos = startTop + diff

			if (pos < 0) {

				pos = 0
			} else if (pos >= that.barDiffHeight) {

				pos = that.barDiffHeight
			}

			$(self).css('top', pos + 'px')

			that._scrolling(pos)

			e.preventDefault()
			e.stopPropagation()
		})

		$(document).on('mouseup', function() {

			$(document).off('mousemove')
			$(document).off('mouseup')
		})
	})

	this.$scrollBar.data('scrollBar', this)

	//console.log(this.$wrap[0])

/*	this.$wrap.on('DOMMouseScroll', this._wheelHandler.bind(null, this), false)

	this.$wrap.on('mousewheel', this._wheelHandler.bind(null, this), false)*/

	// 原生写法
	this.$wrap[0].addEventListener("DOMMouseScroll",this._wheelHandler.bind(null, this))

	this.$wrap[0].addEventListener("mousewheel", this._wheelHandler.bind(null, this))
}
Scroll.prototype._unbindEvent = function() {

/*	this.$wrap.off('DOMMouseScroll')

	this.$wrap.off('mousewheel')*/

	this.$wrap[0].removeEventListener("DOMMouseScroll",this._wheelHandler.bind(null, this))

	this.$wrap[0].removeEventListener("mousewheel", this._wheelHandler.bind(null, this))
}

Scroll.prototype._update = function() {

	this.$barWrap.css('display', 'block')

	this.wrapH = this.$wrap.height()

	this.barH = Math.max((this.wrapH * this.wrapH) / this.$content.height(), 20)

	this.$scrollBar.css('height', this.barH + 'px')

	var top = this.$content.position().top

	var rate_f = -(top * (this.$barWrap.height() - this.$scrollBar.height())) / (this.$content.height() - this.$wrap.height())

	var scrollBar = this.$scrollBar[0]

	scrollBar.style.top = rate_f + 'px'

	this.barDiffHeight = this.wrapH - this.barH

/*	this.$wrap.on('DOMMouseScroll', this._wheelHandler.bind(null, this), false)

	this.$wrap.on('mousewheel', this._wheelHandler.bind(null, this), false)*/

	this.$wrap[0].addEventListener("DOMMouseScroll",this._wheelHandler.bind(null, this))

	this.$wrap[0].addEventListener("mousewheel", this._wheelHandler.bind(null, this))
}
Scroll.prototype.updateStyle = function(newStyle) {

	var barStyle, buttonStyle, key

	barStyle = newStyle.bar

	buttonStyle = newStyle.button

	for (key in barStyle) {

		this.$barWrap.css(key, barStyle[key])
	}

	for (key in buttonStyle) {

		this.$scrollBar.css(key, buttonStyle[key])
	}


	this.style = newStyle



}
Scroll.prototype.update = function() {

	/*
	 * 初始化成功添加滚动条则需要重新计算 size 和位置即可 ,否则重新进入初始化
	 * 重新计算的内容:
	 *
	 */

	if (this.$content) {

		if (this.$wrap.height() >= this.$content.height() - 5) {

			var $content = this.$content
			this._unbindEvent()
			this.$barWrap.css('display', 'none')

			$content[0].style.top = 0 + 'px'
			return
		}

		this._update()

	} else {

		this.init()
	}
}
Scroll.prototype.init = function() {

	var that = this

	this._createBar(function() {

		that._bindEvent()

		return that
	})

	return this
}

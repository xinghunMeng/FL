$(document).ready(function() {
    //生成打点详细信息的继承函数
    function SquareOverlay(center, width, height, index, k) {
        this._center = center
        this._width = width
        this._height = height
        this._index = index
        this._k = k
    }

    SquareOverlay.prototype = new BMap.Overlay()

    SquareOverlay.prototype.initialize = function(map) {
        this._map = map
        if (this._k == 0) {
            var div = $(".messagePolice").clone(true)[0]
        } else if (this._k == 1) {
            var div = $(".message_jy").clone(true)[0]
        } else if (this._k == 2) {
            var div = $(".message_jq").clone(true)[0]
        } else {
            var div = $(".message_jk").clone(true)[0]
        }

        div.dataset.Id = this._index
        map.getPanes().markerPane.appendChild(div)
        div.style.position = 'absolute'
        div.style.width = this._width + 'px'
        div.style.height = this._height + 'px'
        this._div = div
        return div
    }

    SquareOverlay.prototype.draw = function() {
        var position = this._map.pointToOverlayPixel(this._center)
        this._div.style.left = position.x - this._width / 2 - 67 + "px"
        this._div.style.top = position.y - this._height - 30 + "px"
    }

    // 创建Map实例
    var bmap = new BMap.Map('map', {
        enableMapClick: false,
        minZoom: 4
            //vectorMapLevel: 3
    });

    bmap.enableScrollWheelZoom(); // 启用滚轮放大缩小

    bmap.getContainer().style.background = '#081734'; //地图未加载完成时，贴图的颜色
    //地图的配置参数
    bmap.setMapStyle({
        styleJson: [{
            featureType: 'water', //水
            elementType: 'all',
            stylers: {
                color: '#043347'
            }
        }, {
            featureType: 'land', //大地
            elementType: 'all',
            stylers: {
                color: '#000000'
            }
        }, {
            featureType: 'boundary', //分界线
            elementType: 'geometry',
            stylers: {
                visibility: 'off',
                color: '#012240'
            }
        }, {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
                visibility: 'on',
                color: '#011f3b'
            }
        }, {
            featureType: 'highway', //高速公路边框
            elementType: 'geometry',
            stylers: {
                color: '#012240'
            }
        }, {
            featureType: 'highway', //高速填充颜色
            elementType: 'geometry.fill',
            stylers: {
                color: '#011f3b',
                lightness: 1
            }
        }, {
            featureType: 'highway', //高速名称
            elementType: 'labels',
            stylers: {
                visibility: 'off',
                color: '#02546e'
            }
        }, {
            featureType: 'arterial', //干线边框
            elementType: 'geometry',
            stylers: {
                color: '#012240',
                lightness: -39
            }
        }, {
            featureType: 'arterial', //干线填充
            elementType: 'geometry.fill',
            stylers: {
                color: '#011f3b'
            }
        }, {
            featureType: 'arterial', //干线名称
            elementType: 'labels',
            stylers: {
                visibility: 'on',
                color: '#02546b'
            }
        }, {
            featureType: 'poi', //地点名称（银行，商店等）
            elementType: 'all',
            stylers: {
                visibility: 'on',
                color: '#454140'
            }
        }, {
            featureType: 'poi', //地点名称颜色（银行，商店等）
            elementType: 'labels.text.stroke',
            stylers: {
                color: '#656464'
            }
        }, {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: {
                color: '#011f3b'
            }
        }, {
            featureType: 'green',
            elementType: 'all',
            stylers: {
                color: '#012438',
                visibility: 'on'
            }
        }, {
            featureType: 'subway',
            elementType: 'all',
            stylers: {
                visibility: 'off'
            }
        }, {
            featureType: 'manmade',
            elementType: 'all',
            stylers: {
                visibility: 'off'
            }
        }, {
            featureType: 'local', //当地道路（小路）
            elementType: 'all',
            stylers: {
                visibility: 'on',
                color: '#012240'
            }
        }, {
            featureType: 'boundary',
            elementType: 'geometry.fill',
            stylers: {
                color: '#011f3b'
            }
        }, {
            featureType: 'building',
            elementType: 'all',
            stylers: {
                color: '#012240'
            }
        }, {
            featureType: 'label',
            elementType: 'all',
            stylers: {
                visibility: 'off',
                color: '#012240'
            }
        }]
    });
    bmap.centerAndZoom(new BMap.Point(107.39, 29.71), 16); // 初始化地图,设置中心点坐标和地图级别 
    var jc = 0,
        jy = 0,
        jq = 0,
        jk = 0
        //放置四类地图描点的实例对象
    var newArr = [
            [],
            [],
            [],
            []
        ]
        //放置四类地图描点详细信息的实例对象
    var newSquareArr = [
        [],
        [],
        [],
        []
    ]
    var mySquare = ["mySquare0", "mySquare1", "mySquare2", "mySquare3"]
    var marker = ["marker0", "marker1", "marker2", "marker3"]
    var mark = ["resources/images/mark-car.png", "resources/images/mark-jy.png",
        "resources/images/mark-jq.png", "resources/images/mark-jk.png"
    ]
    var MouseMark = ["resources/images/mark-car1.png", "resources/images/mark-jy1.png",
        "resources/images/mark-jq1.png", "resources/images/mark-jk1.png"
    ]


    //point为点的经纬度坐标，index为一组内的序号，src为图片路径，k为判断类型,type为判断视频的id
    function addMarker(point, index, src, k, type) {


        var myIcon = new BMap.Icon(src, new BMap.Size(40, 63), {
            offset: new BMap.Size(10, 25),
            imageOffset: new BMap.Size(0, 0 - index * 63)
        })
        marker[k] = new BMap.Marker(point, {
            icon: myIcon
        });
        newArr[k].push(marker[k])
        marker[k].addEventListener("mouseover", function() {
            if (k == 3) {
                $(this.Nc).attr("data-type", type)
            }

            $(this.Nc).find("img").attr("src", MouseMark[k])

        })
        marker[k].addEventListener("mouseout", function() {

            if ($(this.Nc).attr("data-clicked") != 1) {
                $(this.Nc).find("img").attr("src", mark[k])
            }


        })
        marker[k].addEventListener("click", function() {
            if ($(this.Nc).attr("data-clicked") == 1) {
                return
            }
            $(this.Nc).attr("data-clicked", "1")
            $(this.Nc).attr("data-index", newArr[k].indexOf(this))
            var index = $(this.Nc).attr("data-index")
            mySquare[k] = new SquareOverlay(point, 360, 172, index, k)

            bmap.addOverlay(mySquare[k])
            newSquareArr[k].push(mySquare[k])
            mySquare[k].show()


        })

        bmap.addOverlay(marker[k]);
    }
    //addMarker(new BMap.Point(107.39, 29.71))



    /*  var bounds = bmap.getBounds();

      var lngSpan = bounds.re - bounds.we;
      var latSpan = bounds.qe - bounds.ve;*/

    /* for (var i = 0; i < 100; i ++) {

     var point = new BMap.Point(bounds.we + lngSpan * (Math.random() * 0.7 + 0.15), bounds.ve + latSpan * (Math.random() * 0.7 + 0.15))
     addMarker(point, i);
     }*/
    //左侧4块的点击事件，请求数据，地图描点
    function getData(url, k) {
        $.get(url, function(data) {
            var length = data.point.length

            for (var i = 0; i < length; i++) {
                var point = new BMap.Point(data.point[i][0], data.point[i][1])
                if (k == 3) {
                    addMarker(point, i, mark[k], k, data.type[i]);
                } else {

                    addMarker(point, i, mark[k], k);
                }

            }

        })
    }

    //左侧四个分类的点击事件
    $(".jc").click(function() {
        if (jc == 0) {
            getData("resources/data/1.json", 0)
            $(this).css("background", "url(resources/images/car1.png)")
            jc = 1
            
            // if (document.body.requestFullscreen) {
            //     console.log(111)
            //     document.body.requestFullscreen();
            // } else if (document.body.mozRequestFullScreen) {
            //     document.body.mozRequestFullScreen();
            // } else if (document.body.webkitRequestFullscreen) {
            //     console.log(111)
            //     document.body.webkitRequestFullscreen();
            // }

            // function toggleFullScreen() {
            //     if (!document.mozFullScreen && !document.webkitFullScreen) {
            //         // if (document.mozRequestFullScreen) {
            //         //     document.mozRequestFullScreen();
            //         // } else {
            //         console.log(111)
            //         document.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            //         //}
            //     } else {
            //         if (document.mozCancelFullScreen) {
            //             document.mozCancelFullScreen();
            //         } else {
            //             document.webkitCancelFullScreen();
            //         }
            //     }
            // }
        } else {
            for (var i = 0; i < newArr[0].length; i++) {
                bmap.removeOverlay(newArr[0][i]);
                bmap.removeOverlay(newSquareArr[0][i]);

            }
            newArr[0] = []
            $(this).css("background", "url(resources/images/car.png)")
            jc = 0
        }

    })
    $(".jy").click(function() {
        if (jy == 0) {
            getData("resources/data/2.json", 1)
            $(this).css("background", "url(resources/images/jy1.png)")
            jy = 1
        } else {
            for (var i = 0; i < newArr[1].length; i++) {
                bmap.removeOverlay(newArr[1][i]);
                bmap.removeOverlay(newSquareArr[1][i]);
            }
            newArr[1] = []
            $(this).css("background", "url(resources/images/jy.png)")
            jy = 0
        }

    })
    $(".jq").click(function() {
        if (jq == 0) {
            getData("resources/data/3.json", 2)
            $(this).css("background", "url(resources/images/jq1.png)")
            jq = 1
        } else {
            for (var i = 0; i < newArr[2].length; i++) {
                bmap.removeOverlay(newArr[2][i]);
                bmap.removeOverlay(newSquareArr[2][i]);
            }
            newArr[2] = []
            $(this).css("background", "url(resources/images/jq.png)")
            jq = 0
        }

    })
    $(".jk").click(function() {
            if (jk == 0) {
                getData("resources/data/4.json", 3)
                $(this).css("background", "url(resources/images/jk1.png)")
                jk = 1
            } else {
                for (var i = 0; i < newArr[3].length; i++) {
                    bmap.removeOverlay(newArr[3][i]);
                    bmap.removeOverlay(newSquareArr[3][i]);
                }
                newArr[3] = []
                $(this).css("background", "url(resources/images/jk.png)")
                jk = 0
            }

        })
        //描点详细详细信息的关闭事件
    $(".close").on('click', function() {
        $(this).parent().hide()
        var num = $(this).parent().attr("data--id")
        if ($(this).parent().hasClass('messagePolice')) {
            $(newArr[0][num].Nc).find("img").attr("src", mark[0])
            $(newArr[0][num].Nc).attr("data-clicked", "0")
        } else if ($(this).parent().hasClass('message_jy')) {
            $(newArr[1][num].Nc).find("img").attr("src", mark[1])
            $(newArr[1][num].Nc).attr("data-clicked", "0")
        } else if ($(this).parent().hasClass('message_jq')) {
            $(newArr[2][num].Nc).find("img").attr("src", mark[2])
            $(newArr[2][num].Nc).attr("data-clicked", "0")
        } else {
            $(newArr[3][num].Nc).find("img").attr("src", mark[3])
            $(newArr[3][num].Nc).attr("data-clicked", "0")
        }
    })



})
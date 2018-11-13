// 工具函数
var NetUtil = require('netUtil.js');
var CON = require('constant.js');

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function makeCall(number) {
    let valid = false;
    if ((number.startsWith("04") || number.startsWith("02") || number.startsWith("03")) && number.length == 10) {
        number = number;
        valid = true;
    } else if (number.startsWith("1") || number.startsWith("+86")) {
        if (!number.includes("+86")) {
            number = "+86" + number;
        }
        valid = true;
    }
    if (valid) {
        wx.makePhoneCall({
            phoneNumber: number
        })
    } else {
        wx.showModal({
            title: '提示',
            content: '只支持拨打澳洲或中国大陆的手机号码',
            showCancel: false,
        })
    }

}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

function trimAll(str) {
    return str.replace(/\s+/g, "");
}

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8();
}

function image(pic) {
    wx.getLocation({
        success: function(res) {
            //console.log(res);
        },
        fail: function(res) {
            console.log(res);
        }
    })
    return CON.IMG_BASE + pic + ".jpg";
}

function imageThumb(pic) {
    wx.getLocation({
        success: function(res) {
            //console.log(res);
        },
        fail: function(res) {
            console.log(res);
        }
    })
    return CON.IMG_BASE_THUMB + pic + ".jpg";
}

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds();


    return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 将一维数组转为二维数组
function listToMatrix(list, elementPerSubArray) {
    let matrix = [],
        i, k;

    for (i = 0, k = -1; i < list.length; i += 1) {
        if (i % elementPerSubArray === 0) {
            k += 1;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}

function loadTasks(){
	let tasks = {}
	
	NetUtil.netUtil(CON.GET_TASKS, "GET", "", function (tasks) {
		if (tasks) {
			wx.setStorage({
				key: "tasks",
				data: tasks,
			})
		}
		
	})
}
module.exports = {
    formatTime: formatTime,
    makeCall: makeCall,
    trim: trim,
    trimAll: trimAll,
    guid: guid,
    image: image,
    formatTime: formatTime,
    listToMatrix: listToMatrix,
    strlen: strlen,
	loadTasks,
}
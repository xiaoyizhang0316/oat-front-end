// app.js
var COM = require('utils/common.js')
//TODO only used for demo
const diaries = require('demo/diaries');
App({

	globalData: {
		// 设备信息，主要用于获取屏幕尺寸而做适配
		deviceInfo: null,
		// 本地任务列表       
		tasks: null,
		// 用户信息
		clientId: null,
		clientInfo: null,
		token: null,
		
	},

	onLaunch: function () {

		var self = this
		//登陆则刷新任务
		self.getTasks()
		//检查缓存
		wx.getStorage({
			key: "clientId",
			success(res) {
				console.log(res)
				self.globalData.clientId = res.data
				self.globalData.token = wx.getStorageSync('token')
			},
			fail() {
				wx.login({
					success: function (res) {
						self.getClientId(res.code)
					},
					fail: function (res) {
						console.log(res)
					}
				})
			}
		})

	},

	//使用授权code获得
	getClientId: function (code) {
		var self = this
		let url = COM.load('CON').GET_CLIENTID + code;
		//console.log(code);		
		COM.load('NetUtil').netUtil(url, "GET", "", (data) => {

			self.globalData.token = data.token
			self.globalData.clientId = data.clientId
			//save data to cache
			wx.setStorage({
				key: 'clientId',
				data: data.clientId,
			})
			wx.setStorage({
				key: 'token',
				data: data.token,
			})

		})

	},

	// 获取任务列表
	getTasks() {
		var self = this;
		//TODO temp use local data as demo, modify to get data from back end
		wx.getStorage({
			key: 'tasks',
			success: (res) => {
				self.globalData.tasks = res.data;
			},
			fail: (error) => {
				self.globalData.tasks = [];
				var list = []
				list.push(...diaries.diaries);
				self.globalData.tasks = list;
				wx.setStorage({
					key: 'tasks',
					data: list,
				})
			}
		});
	},






})
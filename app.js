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
		token: null
	},
	onLaunch: function () {

		var self = this
		//登陆则刷新任务

		//检查缓存
		/*wx.getStorage({
			key: "clientId",
			success(res) {
				console.log(res)
				self.globalData.clientId = res.data
				self.globalData.token = wx.getStorageSync('token')
        self.globalData.avatarUrl = wx.getStorageSync('avatarUrl')
        self.globalData.nickName = wx.getStorageSync('nickName')
			},
			fail() {
				wx.login({
					success: function (res) {
            console.log (res);
						self.getClientId(res.code)
					},
					fail: function (res) {
						console.log(res)
					}
				})
			}
		})*/
    if (wx.getStorageSync("clientId")){
      self.globalData.clientId = wx.getStorageSync("clientId")
      self.globalData.token = wx.getStorageSync('token')
      self.globalData.avatarUrl = wx.getStorageSync('avatarUrl')
      self.globalData.nickName = wx.getStorageSync('nickName')
      self.getTasks()
    }
    else{
      wx.login({
        success: function (res) {
          console.log(res);
          self.getClientId(res.code)
          self.getTasks()
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }

	},

	//使用授权code获得
	getClientId: function (code) {
		var self = this
    let url2 = COM.load('CON').GET_CLIENTID + code;
		//let url = COM.load('CON').TEST;

		//console.log(code);		
		COM.load('NetUtil').netUtilNoToken(url2, "GET", "", (data) => {

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
    //COM.load('NetUtil').netUtil(url, "GET", "")
	},

	// 获取任务列表
	getTasks() {
		var self = this;
    var url = COM.load('CON').GET_TASKS;
    COM.load('NetUtil').netUtil(url,"GET","", (data)=> {
      self.globalData.tasks=data;
      wx.setStorage({
        key: 'tasks',
        data: data
      })
      //var img = JSON.parse("[" + data[0].material.imgs + "]");
      console.log(data);
    });
		//TODO temp use local data as demo, modify to get data from back end
		/*wx.getStorage({
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
		});*/
	},







})
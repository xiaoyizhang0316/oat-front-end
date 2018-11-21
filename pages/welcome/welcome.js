var app = getApp();
var COM = require('../../utils/common.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        targetBrandId: 0,
        targetTaskId: 0,

        showModal: false,
        approve: false,
        count: 0,
        approve: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let self = this
        //wait for many ready to use, then proceed to related page
        self.prepare(options);
    },

    prepare: function(e) {
        let self = this
        //wait for wx login auth 
        if (app.globalData.clientId == null) {
            setTimeout(function() {
                self.prepare(e)
            }, 1000)
            return
        }
        //wait for customer clicking two step auth
        else if (self.data.count < 5 && self.data.approve == false) {
			let clientInfo = wx.getStorageSync('clientInfo')
			console.log(clientInfo)
			if(!clientInfo)
			{
				self.setData({
					showModal: true
				})
				setTimeout(function () {
					self.prepare(e)
					let c = self.data.count + 1
					self.setData({
						count: c
					})
				}, 1000)
				return
			}else{
				self.hideModal();
				app.globalData.clientInfo = clientInfo
				self.setTarget(e)
			}
           
        }
        // if customer click approve, but data is not received
        else if (self.data.count < 5 && self.data.approve == true && app.globalData.clientInfo == null) {
            self.hideModal();
            setTimeout(function() {
                self.prepare(e)
            }, 1000)
            return
        }
        //1. success get user info proceed to index 2. over waitting time, proceed to index as not login user
        else if (app.globalData.clientInfo != null || self.data.count >= 5) {
            self.hideModal()
            self.setTarget(e)
        } else {
            console.log('something wrong, please check')
            console.log(app.globalData)
            console.log(self.data)
        }
    },
    //获得访问的品牌 或者 任务
    setTarget: function(e) {
        let self = this
        //TODO we do not have brand yet so we only consider task
        //let brandId = e.targetBrandId
        if (Object.prototype.toString.call(e) !== '[object Undefined]' && Object.prototype.toString.call(e.targetTaskId) !== '[object Undefined]') {
            let taskId = e.targetTaskId
            //TODO 
            wx.navigateTo({
                url: '../task/task?taskId=' + taskId,
            })
        } else {
            self.navigatorToIndex()
        }

    },
    //用户登录后把用户储存在client表里, 把用户是否注册状态存入缓存
    saveClientData: function(clientInfo) {
        var self = this
        app.globalData.clientInfo = clientInfo
        wx.setStorageSync('clientInfo', clientInfo)
        /*app.globalData.nickName = clientInfo.nickName
        app.globalData.avatarUrl = clientInfo.avatarUrl
        wx.setStorage({
          key: 'nickname',
          data: app.globalData.nickName
        })
        wx.setStorage({
          key: 'avatarUrl',
          data: app.globalData.avatarUrl
        })*/
        let url = COM.load('CON').UPDATE_CLIENT;
        COM.load('NetUtil').netUtil(url, "POST", {
            "clientId": app.globalData.clientId,
            "name": clientInfo.nickName,
            "avatarUrl": clientInfo.avatarUrl,
            "country": clientInfo.country,
            "province": clientInfo.province,
            "city": clientInfo.city
        }, (callback) => {
            if (callback == true) {
                console.log('update client info successfully')
            }
        })
    },

    /**
     * 隐藏模态对话框
     */
    hideModal: function() {	
        this.setData({
            showModal: false
        });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function() {
        this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function(e) {
        let self = this

        //储存用户信息
        console.log("********************")
        console.log(e)
        self.saveClientData(e.detail.userInfo)
    },
    //如果点了确定
    onBindTap(e) {		
        let self = this
        self.setData({
            approve: true
        })
        self.hideModal();
    },

    navigatorToIndex: function() {
        var interval = setInterval(function() {
            console.info('checking the storage');

            let tasks = wx.getStorageSync("tasks");
            let clientId = wx.getStorageSync("clientId");

            if (tasks && clientId) {
                clearInterval(interval);
                wx.switchTab({
                    url: '../index/index',
                })
            }
        }, 2000);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },


})
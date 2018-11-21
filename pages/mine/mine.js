// mine.js

// 自定义标签
const app = getApp();

Page({

    // data
    data: {
      thumb:'',
      nickName:''
    },


    onShow() {
     this.setData({
       thumb:app.globalData.clientInfo.avatarUrl,
       nickName:app.globalData.clientInfo.nickName
     })
    },

    goToMyTask:function() {
      wx.navigateTo({
        url: '../myTask/myTask',
      })
    },

    goToFAQ:function(){
      wx.navigateTo({
        url: '../FAQ/FAQ',
      })
    },

    goToReport:function() {
      wx.navigateTo({
        url: '../report/report',
      })
    },

    goToAboutUs:function() {
      wx.navigateTo({
        url: '../aboutUs/aboutUs',
      })
    },


   


})

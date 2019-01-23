// mine.js

// 自定义标签
const app = getApp();

Page({

  // data
  data: {
    thumb: '',
    nickName: '',
    myTaskFlag: '',
    faqFlag: '',
    reportFlag: '',
    aboutUsFlag: '',
    modalShow: false
  },


  onShow() {
    this.setData({
      thumb: app.globalData.clientInfo.avatarUrl,
      nickName: app.globalData.clientInfo.nickName
    })
    console.log(this.data)
    app.globalData.clickFlag = false
  },

  goToMyTask: function(e) {
    let self = this
    if (!app.globalData.clickFlag) {
      app.globalData.clickFlag = true
      wx.navigateTo({
        url: '../myTask/myTask',
      })
    }
  },

  goToFAQ: function() {
    let self = this
    if (!app.globalData.clickFlag) {
      app.globalData.clickFlag = true
      wx.navigateTo({
        url: '../FAQ/FAQ',
      })
    }
  },

  goToReport: function() {
    let self = this
    if (!app.globalData.clickFlag) {
      app.globalData.clickFlag = true
      wx.navigateTo({
        url: '../report/report',
      })
    }
  },

  goToAboutUs: function() {
    let self = this
    if (!app.globalData.clickFlag) {
      app.globalData.clickFlag = true
      wx.navigateTo({
        url: '../aboutUs/aboutUs',
      })
    }
  },

  goToPublish: function() {
    let self = this
    if (!app.globalData.clickFlag) {
      app.globalData.clickFlag = true
      wx.navigateTo({
        url: '../publish/publish',
      })
    }
  },

  hideShareModal: function() {
    this.setData({
      modalShow: false
    })
  },

  showModal: function() {
    this.setData({
      modalShow: true
    })
  },

  showQRCode: function() {
    this.setData({
      modalShow: true
    })
  },

  showImg: function(e) {
    let self = this
    wx.previewImage({
      urls: ['../../images/icons/customer.jpg']
    })
  },

  copyId: function(e) {
    let self = this;
    wx.setClipboardData({
      data: 'aomai8',
      success() {
        wx.showToast({
          title: '复制成功',
        })
      },
      fail() {
        wx.showToast({
          title: '复制失败',
        })
      }
    })
  },


})
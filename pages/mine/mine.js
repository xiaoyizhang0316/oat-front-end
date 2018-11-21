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

   


})

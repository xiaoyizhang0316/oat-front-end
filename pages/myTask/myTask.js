// pages/myTask/myTask.js
var COM = require('../../utils/common.js')
import dateParser from "../../utils/date.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: '',
    status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    let url = COM.load('CON').GET_REWARDS
    COM.load('NetUtil').netUtil(url, "GET","", (res) => {
        dateParser.parseRewardDate(res);
        let taskList = self.parseStatus(res);
        console.log(taskList);
        self.setData({
          tasks: taskList
        })
      })
  },

  parseStatus: function(tasks) {
    return tasks.map(function(task){
      switch (task.status.toString()) {
        case '1' || '2':
          task.status = '已接受';
          return task;
          break;
        case '3':
          task.status = '审核中'
          return task;
          break;
        case '4':
          task.status = '可领取'
          return task;
          break;
        case '5':
          task.status = '已领取'
          return task;
          break;
        case '6':
          task.status = '审核失败'
          return task;
          break;
        default:
          task.status = '未知状态'
          return task;
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  showDetail(event) {
    console.log(event)
    wx.navigateTo({
      url: '../task/task?taskId=' + event.currentTarget.id,
    });
  },

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// pages/myTask/myTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tasks = wx.getStorageSync('tasks');
    console.log(tasks);
    this.setData({
      tasks: tasks
    })
    console.log(this.data.tasks)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// index.js
var app = getApp();
import dateParser from "../../utils/date.js"
Page({

	data: {		
		tasks: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(event) {
		console.log("index.js")
    if(event.taskId){
      wx.navigateTo({
        url: '../task/task?taskId=' + event.taskId,
      })
    }
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000;
		console.log('index load at: ' + timestamp);
	},
	
	//查看详情
	showDetail(event) {
    if(!app.globalData.clickFlag){
      app.globalData.clickFlag = true;
      console.log(event)
      wx.navigateTo({
        url: '../task/task?taskId=' + event.currentTarget.id,
      });
    }
	},

	onShow(){
    let self = this
		let tasks = wx.getStorageSync('tasks');
    dateParser.parseArrayDate(tasks);
    console.log(tasks[1].title.length)
    tasks = self.parseTitle(tasks)
		this.setData({
			tasks : tasks
		})
    app.globalData.clickFlag = false
		
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000;
		console.log('index show at: ' + timestamp);
	},

  parseTitle(task){
    task.forEach(function(t){
      if(t.title.length>6)
      t.title = t.title.slice(0,6) + '...'
    })
    return task
  },

  onPullDownRefresh: function () {
    app.getTasks();
    let self = this
    let tasks = wx.getStorageSync('tasks');
    dateParser.parseArrayDate(tasks);
    console.log(tasks[1].title.length)
    tasks = self.parseTitle(tasks)
    this.setData({
      tasks: tasks
    })
    wx.stopPullDownRefresh()
  },
})

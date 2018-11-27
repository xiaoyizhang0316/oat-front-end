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
	onLoad() {
		console.log("index.js")
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000;
		console.log('index load at: ' + timestamp);
	},
	
	//查看详情
	showDetail(event) {
    console.log(event)
		wx.navigateTo({
			url: '../task/task?taskId=' + event.currentTarget.id,
		});
	},
	onShow(){
		var tasks = wx.getStorageSync('tasks');
    dateParser.parseArrayDate(tasks);
		this.setData({
			tasks : tasks
		})
		
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000;
		console.log('index show at: ' + timestamp);

	}
})

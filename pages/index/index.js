// index.js
var app = getApp();

Page({

	data: {		
		tasks: null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000;
		console.log('index load at: ' + timestamp);
		
	},
	
	// 查看详情
	showDetail(event) {
		wx.navigateTo({
			url: '../task/task?id=' + event.currentTarget.id,
		});
	},
	onShow(){
		var tasks = wx.getStorageSync('tasks')
		this.setData({
			tasks : tasks
		})
		
		var timestamp = Date.parse(new Date());
		timestamp = timestamp / 1000;
		console.log('index show at: ' + timestamp);

	}
})
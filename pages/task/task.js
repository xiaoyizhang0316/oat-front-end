// entry.js
import download from "../../utils/downloadFile.js"

var COM = require('../../utils/common.js')
const urlList = [
    'http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg'
];
const app = getApp();

Page({

    data: {
        url: '',
        status: '',
        description: null,
        currentTask: '',
		reward:'',
    },
	
    shareImg: function() {
        var self = this;
        wx.setClipboardData({
            data: self.data.description,
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
        download.downloadSaveFiles({
            urls: self.data.url,
            success: function(res) {
                console.dir(res);
				console.log("weqewqeweqwewewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
				//create a reward record in server
				//create reward record 
				let url = COM.load('CON').CREATE_REWARD
				COM.load('NetUtil').netUtil(url, "POST", {
					"oatTaskId": self.data.currentTask.id
				}, (reward) => {
					if (reward) {
						self.setData({
							reward: reward,
							status: reward.status

						})
					}
				})

                wx.showToast({
                    title: "下载任务成功",
                    duration: 1500,
                    mask: true
                });
                console.log(res)
            },
            fail: function(e) {
                console.info("下载失败");
            }
        });
		

    },

    uploadScreenshot: function() {
        var self = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
				console.log("---------------------------------------------")
                console.log(tempFilePaths);
				console.log("---------------------------------------------")
				let url = COM.load('CON').UPDATE_REWARD;
                /*COM.load('NetUtil').netUtil(url, "POST", {
                  url: tempFilePaths[0]
                }, (callback) => {
                  if (callback == true) {
                    console.log('update client info successfully')
                  }
                })*/
                let token = wx.getStorageSync('token');
                wx.uploadFile({
                    url: url,
                    filePath: tempFilePaths[0],
                    name: 'test',
					formData: {
						'oatRewardId': self.data.reward.id
					},
                    header: {
                        'content-type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    },
                    success(res) {
                        const data = res.data
                        //do something
						wx.showToast({
							title: "上传成功",
							duration: 1500,
							mask: true
						});
						self.setData({
							reward:data,
							status: reward.status
						})
                    }
                })
               
            }
        })
    },

    onLoad: function(e) {
		console.log("task_detail_onload")
        let self = this
        this.setData({
            url: urlList,
            description: "这是一段任务描述"
        })
        if (Object.prototype.toString.call(e) !== '[object Undefined]' && Object.prototype.toString.call(e.taskId) !== '[object Undefined]') {
            let taskId = e.taskId
            let tasks = wx.getStorageSync('tasks')
            let currentTask = ""
			
            for (let task of tasks) {
                if (task.id == taskId) {
                    currentTask = task
                    break
                }
            }
            if (!currentTask) {
                wx.showModal({
                    title: '错误',
                    content: '此任务不存在或已经结束',
                    showCancel: false,
                    success: function(e) {
                        wx.switchTab({
                            url: '/pages/index/index',
                        })
                    }
                })
            } else {
                self.setData({
                    currentTask: currentTask
                })
				//self.checkReward(currentTask)
				//check if current user is working on such project
				let url = COM.load('CON').GET_REWARD_BY_TASKID_AND_CLIENT + currentTask.id
				COM.load('NetUtil').netUtil(url, "GET", "", (data) => {
					if(data)
					{
						self.setData({
							reward:data,
							status: reward.status
						})
					}
				})

            }
        }


    },
	onShow: function(e)
	{
		console.log("on show")
	},

    onHide: function() {},
})
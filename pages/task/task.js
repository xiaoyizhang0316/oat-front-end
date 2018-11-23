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
        currentTask: ''
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
                self.setData({
                    status: 1
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
                //console.log(tempFilePaths);
                let url = COM.load('CON').GET_REWARD;
                /*COM.load('NetUtil').netUtil(url, "POST", {
                  url: tempFilePaths[0]
                }, (callback) => {
                  if (callback == true) {
                    console.log('update client info successfully')
                  }
                })
                let token = wx.getStorageSync('token');*/
                wx.uploadFile({
                    url: url,
                    filePath: tempFilePaths[0],
                    name: 'test',
                    header: {
                        'content-type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    },
                    success(res) {
                        const data = res.data
                        //do something
                    }
                })
                wx.showToast({
                    title: "上传成功",
                    duration: 1500,
                    mask: true
                });
                self.setData({
                    status: 2
                })
            }
        })
    },







// <<<<<<< HEAD
//   onLoad: function(option) {
//     this.setData({
//       url : urlList,
//       description: "这是一段任务描述"
//     })
//     //console.log(option);
//     let url = COM.load('CON').GET_TASKS + '/' + option.taskId;
//     COM.load('NetUtil').netUtil(url, "GET", {}, (data) => {
//       console.log(data);
//     })
//   },
// =======
// >>>>>>> aabfb52eaf38fa66204fd2d8f84b14832b2d0658

    onLoad: function(e) {
        let self = this
        console.log(e);
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
                            url: '../index/index',
                        })
                    }
                })
            } else {
                self.setData({
                    currentTask: currentTask
                })
            }
        }


    },

    onHide: function() {},
})
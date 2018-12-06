import download from '../../utils/downloadFile.js'
import dateParser from '../../utils/date.js'

var COM = require('../../utils/common.js')
const urlList = [
  'http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg'
];
const app = getApp();

Page({
  data: {
    url: '',
    description: null,
    materialDescription: null,
    currentTask: '',
    reward: '',
    status: '',
    buttonText: '',
    buttonMethod: '',
    buttonClass: ''
  },

  setButton: function(status) {
    console.log('call setButton')
    let self = this
    switch (status) {
      case 0:
        self.setData({
          buttonText: '一键转发',
          buttonMethod: 'shareImg',
          buttonClass: 'shareButton'
        })
        break;
      case 1:
      case 2:
        self.setData({
          buttonText: '上传截图',
          buttonMethod: 'uploadScreenshot',
          buttonClass: 'shareButton'
        })
        break;
      case 3:
        self.setData({
          buttonText: '审核中...',
          buttonMethod: '',
          buttonClass: 'grayButton'
        })
        break;
      case 4:
        self.setData({
          buttonText: '领取奖励',
          buttonMethod: 'getReward',
          buttonClass: 'shareButton'
        })
        break;
      case 5:
        self.setData({
          buttonText: '已领取',
          buttonMethod: '',
          buttonClass: 'shareButton'
        })
        break;
      case 6:
        self.setData({
          buttonText: '再次上传',
          buttonMethod: 'uploadScreenshot',
          buttonClass: 'shareButton'
        })
        break;
      default:
        self.setData({
          buttonText: '一键转发',
          buttonMethod: 'shareImg',
          buttonClass: 'shareButton'
        })
    }
  },

  shareImg: function(e) {
    console.log(e)
    let formID = e.detail.formId
    var self = this;
    if (!app.globalData.clickFlag) {
      app.globalData.clickFlag = true
      wx.setClipboardData({
        data: self.data.currentTask.description,
        success(temp) {
          download.downloadSaveFiles({
            urls: self.data.url,
            success: function(res) {
              console.log(res);
              //create a reward record in server
              //create reward record 
              let url = COM.load('CON').CREATE_REWARD
              COM.load('NetUtil').netUtil(url, "POST", {
                "oatTaskId": self.data.currentTask.id,
                "formId":formID
              }, (reward) => {
                if (reward) {
                  self.setData({
                    reward: reward,
                    status: reward.status
                  })
                  self.setButton(reward.status)
                }
              })
              wx.hideLoading();
              app.globalData.clickFlag = false
              wx.showToast({
                title: "下载任务成功",
                duration: 1500,
                mask: true
              });
              console.log(res)
            },
            fail: function(e) {
              wx.hideLoading()
              app.globalData.clickFlag = false
              console.info("下载失败");
            }
          })
        }
      })
    }
  },

  showImg: function(e){
    let self = this
    wx.previewImage({
      current: self.data.currentTask.material.imgs[e.target.dataset.id],
      urls: self.data.currentTask.material.imgs,
    })
  },

  uploadScreenshot: function(e) {
    var self = this;
    let formID = e.detail.formId
    if (1) {
      app.globalData.clickFlag = true
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          wx.showLoading({
            title: '图片上传中',
            mask: true
          })
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
            name: 'proof',
            formData: {
              'oatRewardId': self.data.reward.id,
              'formId': formID
            },
            header: {
              'content-type': 'multipart/form-data',
              'Authorization': 'Bearer ' + token,
              'Accept': 'application/json'
            },
            success(res) {
              console.dir(res)
              console.dir(JSON.parse(res.data))
              wx.hideLoading()
              app.globalData.clickFlag = false
              wx.showToast({
                title: "上传图片成功",
                duration: 1500,
                mask: true
              });
              self.setData({
                reward: JSON.parse(res.data),
                status: JSON.parse(res.data).status
              })
              self.setButton(JSON.parse(res.data).status)
            },
            fail(res) {
              wx.hideLoading();
              app.globalData.clickFlag = false
              wx.showToast({
                title: '上传图片失败',
                mask: true,
                duration: 1500
              })
            }
          })
        }
      })
    }
  },

  getReward: function(e) {
    let formID = e.detail.formId
    let self = this
    if (!app.globalData.clickFlag) {
      app.globalData.clickFlag = true
      let url = COM.load('CON').CLAIM_REWARD + this.data.reward.id;
      COM.load('NetUtil').netUtil(url, "GET", {
        "formId": formID
      }, (res) => {
        console.log(res)
        app.globalData.clickFlag = false
        self.setData({
          reward: res,
          status: res.status
        })
        self.setButton(res.status)
        wx.showModal({
          title: '领取成功',
          content: '点击返回首页',
          showCancel: false,
          success(res){
            if(res.confirm){
              wx.switchTab({
                url: '../index/index',
              })
            }
          }
        })
      })
    }
  },

  parseDescription: function(str) {
    return str.split('\r')
  },

  prepare: function(e) {
    let self = this
    app.globalData.clickFlag = false
    if (Object.prototype.toString.call(e) !== '[object Undefined]' && Object.prototype.toString.call(e.taskId) !== '[object Undefined]') {
      let taskId = e.taskId
      let tasks = wx.getStorageSync('tasks')
      dateParser.parseArrayDate(tasks)
      let currentTask = ""
      for (let task of tasks) {
        if (task.id == taskId) {
          currentTask = task
          console.log(task)
          self.setData({
            materialDescription: self.parseDescription(task.material.description),
            url: task.material.imgs,
            description: self.parseDescription(task.description)
          })
          break
        }
      }
      if (!currentTask) {
        wx.showModal({
          title: '提示',
          content: '此任务奖励已发完或已经结束',
          showCancel: false,
          success: function (e) {
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
          console.log(data)
          self.setButton(data.status)
          if (data) {
            self.setData({
              reward: data,
              status: data.status
            })
          }
        })
      }
    }
  },

  onLoad: function(e) {
    let self = this
    console.log("task_detail_onload")
    self.prepare(e)   
  },
  onShow: function(e) {
    let self = this
    self.prepare(e)
    if (self.data.reward.status == 5) {
      wx.showModal({
        title: '该任务已经领取',
        content: '点击返回首页',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
    console.log("on show")
  },

  onHide: function() {},

  onPullDownRefresh: function () {
    let self = this
    let url = COM.load('CON').GET_REWARD_BY_TASKID_AND_CLIENT + self.data.currentTask.id
    COM.load('NetUtil').netUtil(url, "GET", "", (data) => {
      console.log(data)
      self.setButton(data.status)
      if (data) {
        self.setData({
          reward: data,
          status: data.status
        })
      }
    })
    if (self.data.reward.status == 5) {
      wx.showModal({
        title: '该任务已经领取',
        content: '点击返回首页',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
    wx.stopPullDownRefresh()
  },
})
import download from '../../utils/downloadFile.js'
import dateParser from '../../utils/date.js'

var COM = require('../../utils/common.js')
const urlList = [
  'http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg'
];
const check = '../../images/icons/check.svg'
const one = '../../images/icons/one.svg'
const two = '../../images/icons/two.svg'
const three = '../../images/icons/three.svg'
const defaultShow = '查看全部 >'
const backToDefaultShow = '收起 >'
const app = getApp();

Page({
  data: {
    url: '',
    avatars: '',
    allAvatars:'',
    description: null,
    materialDescription: null,
    currentTask: '',
    reward: '',
    status: '',
    buttonText1: '',
    buttonMethod1: '',
    buttonClass1: '',
    buttonText2: '',
    buttonMethod2: '',
    buttonClass2: '',
    buttonText3: '',
    buttonMethod3: '',
    buttonClass3: '',
    status1:one,
    status2:two,
    status3:three,
    info: '',
    modalShow: false,
    animationData: {},
    redModalShow: false,
    showAllText: defaultShow
  },

  setButton: function(status) {
    console.log('call setButton')
    let self = this
    switch (status) {
      case 0:
        self.setData({
          buttonText1: '一键转发',
          buttonMethod1: 'shareImg',
          buttonClass1: 'shareButton',
          buttonText2: '上传截图',
          buttonMethod2: '',
          buttonClass2: 'grayButton',
          buttonText3: '领取奖励',
          buttonMethod3: '',
          buttonClass3: 'grayButton',
          info: '点击一键转发即可复制文字和图片',
          status1: one,
          status2: two,
          status3: three,
          statusClass1: 'statusImg',
          statusClass2: 'statusImg',
          statusClass3: 'statusImg'
        })
        break;
      case 1:
      case 2:
        self.setData({
          buttonText1: '一键转发',
          buttonMethod1: '',
          buttonClass1: 'grayButton',
          buttonText2: '上传截图',
          buttonMethod2: 'uploadScreenshot',
          buttonClass2: 'shareButton',
          buttonText3: '领取奖励',
          buttonMethod3: '',
          buttonClass3: 'grayButton',
          info: '图片已复制到相册，文字已复制到剪切板，点击上传任务截图',
          status1:check,
          status2:two,
          status3:three,
          statusClass1: 'checkImg',
          statusClass2: 'statusImg',
          statusClass3: 'statusImg'
        })
        break;
      case 3:
        self.setData({
          buttonText1: '一键转发',
          buttonMethod1: '',
          buttonClass1: 'grayButton',
          buttonText2: '审核中...',
          buttonMethod2: '',
          buttonClass2: 'grayButton',
          buttonText3: '领取奖励',
          buttonMethod3: '',
          buttonClass3: 'grayButton',
          info: '任务截图已上传，审核中',
          status1:check,
          status2:check,
          status3:three,
          statusClass1: 'checkImg',
          statusClass2: 'checkImg',
          statusClass3: 'statusImg'
        })
        break;
      case 4:
        self.setData({
          buttonText1: '一键转发',
          buttonMethod1: '',
          buttonClass1: 'grayButton',
          buttonText2: '上传截图',
          buttonMethod2: '',
          buttonClass2: 'grayButton',
          buttonText3: '领取奖励',
          buttonMethod3: 'showRedMenu',
          buttonClass3: 'shareButton',
          info: '任务成功，点击即可领取奖励',
          status1:check,
          status2:check,
          status3:three,
          statusClass1: 'checkImg',
          statusClass2: 'checkImg',
          statusClass3: 'statusImg'
        })
        break;
      case 5:
        self.setData({
          buttonText1: '一键转发',
          buttonMethod1: '',
          buttonClass1: 'grayButton',
          buttonText2: '上传截图',
          buttonMethod2: '',
          buttonClass2: 'grayButton',
          buttonText3: '已领取',
          buttonMethod3: '',
          buttonClass3: 'grayButton',
          info: '任务奖励已领取',
          status1: check,
          status2: check,
          status3: check,
          statusClass1:'checkImg',
          statusClass2:'checkImg',
          statusClass3:'checkImg'
        })
        break;
      case 6:
        self.setData({
          buttonText1: '一键转发',
          buttonMethod1: '',
          buttonClass1: 'grayButton',
          buttonText2: '再次上传',
          buttonMethod2: 'uploadScreenshot',
          buttonClass2: 'shareButton',
          buttonText3: '领取奖励',
          buttonMethod3: '',
          buttonClass3: 'grayButton',
          info: '审核失败，点击再次上传任务截图',
          status1: check,
          status2: two,
          status3: three,
          statusClass1: 'checkImg',
          statusClass2: 'statusImg',
          statusClass3: 'statusImg'
        })
        break;
      default:
        self.setData({
          buttonText1: '一键转发',
          buttonMethod1: 'shareImg',
          buttonClass1: 'shareButton',
          buttonText2: '上传截图',
          buttonMethod2: '',
          buttonClass2: 'grayButton',
          buttonText3: '领取奖励',
          buttonMethod3: '',
          buttonClass3: 'grayButton',
          info: '点击一键转发即可复制文字和图片',
          status1: one,
          status2: two,
          status3: three,
          statusClass1: 'statusImg',
          statusClass2: 'statusImg',
          statusClass3: 'statusImg'
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
                "formId": formID
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

  showImg: function(e) {
    let self = this
    wx.previewImage({
      current: self.data.currentTask.material.imgs[e.target.dataset.id],
      urls: self.data.currentTask.material.imgs,
    })
  },

  showQRCode: function() {
    this.setData({
      modalShow: true
    })
  },

  hideShareModal: function() {
    // const animation = wx.createAnimation({
    //   duration: 1000
    // })
    // let n = 0;
    // let m = true;
    // this.animation = animation
    // setInterval(function () {
    //   n = n + 1;
    //   console.log(n);
    //   if (m) {
    //     this.animation.rotateY(360 * (n)).step()
    //     m = !m;
    //   } else {
    //     this.animation.rotateY(360 * (n)).step()
    //     m = !m;
    //   }
    //   this.setData({
    //     animationData: this.animation.export()
    //   })
    // }.bind(this), 1000) 
    this.setData({
      modalShow: false
    })
  },

  hideRedpackageModal: function() {
    this.setData({
      redModalShow: false
    })
  },

  showRedMenu: function() {
    this.setData({
      redModalShow: true
    })
  },

  uploadScreenshot: function(e) {
    var self = this;
    let formID = e.detail.formId
    if (!app.globalData.clickFlag) {
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
    const animation = wx.createAnimation({
      duration: 3000
    })
    this.animation = animation
    this.animation.rotateY(1080).step()
    this.setData({
      animationData: this.animation.export()
    })
    let formID = e.detail.formId
    let self = this
    setTimeout(function() {
      if (!app.globalData.clickFlag) {
        app.globalData.clickFlag = true
        let url = COM.load('CON').CLAIM_REWARD + self.data.reward.id
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
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            }
          })
          }, true, 'application/json',false)
      }
    }, 1)
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
          console.log(data)
          self.setButton(0)
          self.setData({
            allAvatars: data.avatars,
            avatars: data.avatars.slice(0, 8)
          })
          if (data.reward) {
            self.setButton(data.reward.status)
            self.setData({
              reward: data.reward,
              status: data.reward.status
            })
          }
        })
      }
    }
  },

  showAll:function(e) {
    let self = this;
    let all = self.data.allAvatars
    if(!app.globalData.clickFlag){
      app.globalData.clickFlag = true;
      if (self.data.showAllText == defaultShow) {
        self.setData({
          avatars: all,
          showAllText: backToDefaultShow
        })
        app.globalData.clickFlag = false;
      }
      else {
        let temp = self.data.allAvatars.slice(0, 8)
        self.setData({
          avatars: temp,
          showAllText: defaultShow
        })
        app.globalData.clickFlag = false;
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

  onPullDownRefresh: function() {
    let self = this
    let url = COM.load('CON').GET_REWARD_BY_TASKID_AND_CLIENT + self.data.currentTask.id
    COM.load('NetUtil').netUtil(url, "GET", "", (data) => {
      console.log(data)
      self.setButton(0)
      self.setData({
        showAllText: defaultShow,
        avatars: data.avatars.slice(0, 8)
      })
      if (data.reward) {
        self.setButton(data.reward.status)
        self.setData({
          reward: data.reward,
          status: data.reward.status
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
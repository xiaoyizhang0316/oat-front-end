// entry.js
import download from "../../utils/downloadFile.js"
const urlList = [
  'http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg',
'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
  'http://pic.pimg.tw/nsnet/1312630758-aacfe0540683be05222f80f1a6c4f26e.jpg',
  'http://blog.barbaramccarthyphotos.com/wp-content/uploads/2018/07/Summer-drinking.jpg',
  'http://pic.sc.chinaz.com/files/pic/pic9/201610/apic23847.jpg'
];
const app = getApp();

Page({
  data: {
    url: '',
    status: '',
    description:null
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
      urls:self.data.url,
      success: function (res) {
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
      fail: function (e) {
        console.info("下载失败");
      }
    });

  },

  uploadScreenshot: function () {
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        wx.showToast({
          title: "上传成功",
          duration: 1500,
          mask: true
        });
        self.setData({
          status:2
        })
      }
    })
  },







  onLoad: function() {
    this.setData({
      url : urlList,
      description: "这是一段任务描述"
    })
  },

  onHide: function() {
  },
})

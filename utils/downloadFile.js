/**
 * 下载管理器
 * Created by 全科 on 2018/1/27.
 */

/**
 * 下载保存一个文件
 */
const app = getApp();
function downloadSaveFile(obj) {
	console.log(obj)
	let that = this;
	let success = obj.success;
	let fail = obj.fail;
	let complete = obj.complete;
	let id = "";
	let url = obj.url;
	let result = '';
	if (obj.id) {
		id = obj.id;
	} else {
		id = url;
	}

  // console.info("%s 开始下载。。。", obj.url);
  wx.downloadFile({
    url: obj.url,
    success: function(res) {
      console.log(res)
      wx.saveFile({
        tempFilePath: res.tempFilePath,
        success: function(result) {
          result.id = id;
          if (success) {
            wx.saveImageToPhotosAlbum({
              filePath: result.savedFilePath,
              success(res) {
                console.log(res)
                success(result);
              },
              fail(res) {
                console.log(res)
              },
              complete(res) {
                console.log(res)
                complete(res)
              }
            })
          }
        },
        fail: function(e) {
          console.info("保存一个文件失败");
          if (fail) {
            fail(e);
          }
        }
      })
    },
    fail: function(e) {
      console.info("下载一个文件失败");
      if (fail) {
        fail(e);
      }
    }
  })
	
}
/**
 * 多文件下载并且保存，强制规定，必须所有文件下载成功才算返回成功
 */
function downloadSaveFiles(obj) {
	// console.info("准备下载。。。");
	let that = this;
	let success = obj.success; //下载成功
	let fail = obj.fail; //下载失败
	let urls = obj.urls; //下载地址 数组，支持多个 url下载 [url1,url2]
	let savedFilePaths = new Map();
	let urlsLength = urls.length; // 有几个url需要下载
	wx.showLoading({
		title: '图片下载中',
    mask: true
	})
	for (let i = 0; i < urlsLength; i++) {

    downloadSaveFile({
      url: urls[i],
      success: function(res) {
        console.dir(res);
        //一个文件下载保存成功
        let savedFilePath = res;
        savedFilePaths.set(i, savedFilePath);
        console.log("savedFilePath:%s", savedFilePath);
        if (savedFilePaths.size == urlsLength) {
          console.log(savedFilePaths.size + 'and ' + urlsLength) //如果所有的url 才算成功
          if (success) {
            console.log(success)
            wx.hideLoading()
            success(savedFilePaths)
          }
        }
      },
      fail: function(e) {
        console.info("下载失败");
        if (fail) {
          fail(e);
        }
      },
      complete: function(e){
        console.log(e)
        let savedFilePath = e;
        savedFilePaths.set(i, savedFilePath);
        if (savedFilePaths.size == urlsLength){
            wx.hideLoading()
          }
        app.globalData.clickFlag = false
      }
    })
  }
}
module.exports = {
	downloadSaveFiles: downloadSaveFiles
}


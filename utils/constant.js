//url相关
//base urls 
//const BASE_URL = "https://a.zhenxianghaitao.com/oat"
const BASE_URL = "https://f1f11926.ngrok.io"
const IMG_BASE = "https://a.zhenxianghaitao.com/storage/newthumbs/"
const IMG_BASE_THUMB = "https://a.zhenxianghaitao.com/storage/thumbs/"
const IMG_BANNER = "https://a.zhenxianghaitao.com/storage/"

// functional urls
// system setting
const GET_CLIENTID = BASE_URL+"/api/client/getClientId/"
const GET_TASKS = BASE_URL+"/api/task/getTasks"
module.exports = {
    BASE_URL: BASE_URL,   
    IMG_BASE: IMG_BASE,
	IMG_BANNER: IMG_BANNER,
	GET_CLIENTID: GET_CLIENTID,
	GET_TASKS,
}
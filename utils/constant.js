//url相关
//base urls 
//const BASE_URL = "https://a.zhenxianghaitao.com/oat"

const BASE_URL = "https://7c12c393.ngrok.io"


const IMG_BASE = "https://a.zhenxianghaitao.com/storage/newthumbs/"
const IMG_BASE_THUMB = "https://a.zhenxianghaitao.com/storage/thumbs/"
const IMG_BANNER = "https://a.zhenxianghaitao.com/storage/"

// functional urls
// system setting
const GET_CLIENTID = BASE_URL + "/api/client/getClientId/"
const GET_REWARD = BASE_URL + "/api/reward"
const UPDATE_REWARD = BASE_URL + "/api/reward-update"
const TEST = BASE_URL + "/api/client/1"
const GET_TASKS = BASE_URL + "/api/task"
const UPDATE_CLIENT = BASE_URL + "/api/client/update-profile"

module.exports = {
    BASE_URL,
    IMG_BASE,
    IMG_BANNER,
    GET_CLIENTID,
    GET_TASKS: GET_TASKS,
    TEST,
    GET_REWARD,
    UPDATE_CLIENT
}
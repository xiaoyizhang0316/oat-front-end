//url相关
//base urls 
//const BASE_URL = "https://a.zhenxianghaitao.com/oat"

const BASE_URL = "https://7c12c393.ngrok.io/api"


const IMG_BASE = "https://a.zhenxianghaitao.com/storage/newthumbs/"
const IMG_BASE_THUMB = "https://a.zhenxianghaitao.com/storage/thumbs/"
const IMG_BANNER = "https://a.zhenxianghaitao.com/storage/"

// functional urls

//reward related
const GET_REWARD = BASE_URL + "/reward/"
const CREATE_REWARD = BASE_URL + "/reward"
const UPDATE_REWARD = BASE_URL+"/reward-update"
const GET_REWARD_BY_TASKID_AND_CLIENT = BASE_URL +"/getRewardByTaskIdAndClient/"
//task related
const GET_TASKS = BASE_URL + "/task"

//client related
const GET_CLIENTID = BASE_URL + "/client/getClientId/"
const UPDATE_CLIENT = BASE_URL + "/client/update-profile"

const TEST = BASE_URL + "/client/1"

module.exports = {
    BASE_URL,
    IMG_BASE,
    IMG_BANNER,
    GET_CLIENTID,
    GET_TASKS: GET_TASKS,
    TEST,
    GET_REWARD,
    UPDATE_CLIENT,
	UPDATE_REWARD,
	CREATE_REWARD,
	GET_REWARD_BY_TASKID_AND_CLIENT,
	}
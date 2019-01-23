//url相关
//base urls 
const BASE_URL = "https://a.zhenxianghaitao.com/api"


//const BASE_URL = "https://5a9176b1.ngrok.io/oat/public/api"



const IMG_BASE = "https://a.zhenxianghaitao.com/storage/newthumbs/"
const IMG_BASE_THUMB = "https://a.zhenxianghaitao.com/storage/thumbs/"
const IMG_BANNER = "https://a.zhenxianghaitao.com/storage/"

// functional urls


//reward related
const GET_REWARD = BASE_URL + "/reward/"
const GET_REWARDS = BASE_URL + "/reward"
const CREATE_REWARD = BASE_URL + "/reward"
const UPDATE_REWARD = BASE_URL + "/reward-update"
const GET_REWARD_BY_TASKID_AND_CLIENT = BASE_URL + "/getRewardByTaskIdAndClient/"
const CLAIM_REWARD = BASE_URL + "/reward-claim/"
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
	CLAIM_REWARD,
	GET_REWARDS
}

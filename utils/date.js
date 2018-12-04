function parseDate (str) {
  var temp = str.split(' ')[0];
  var result = temp.split('-')[0] + '年' + temp.split('-')[1] + '月' + temp.split('-')[2] + '日';
  return result
}

function parseArrayDate (array) {
  array.forEach(function(task){
    task.start_at = parseDate(task.start_at)
    task.finish_at = parseDate(task.finish_at)
  })//console.log(array)
}

function parseRewardDate (array) {
  array.forEach(function (task) {
    task.finish_at = parseDate(task.oat_task.finish_at)
  })
}




module.exports = {
  parseArrayDate,
  parseRewardDate
}
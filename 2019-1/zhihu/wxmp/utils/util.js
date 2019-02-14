/**
 * 星期中文映射
 */
const day = ['日', '一', '二', '三', '四', '五', '六']

/**
 * 数字字符串日期格式化
 * '20180617' -> '6月17日 星期日'
 * @param { String } date 数字字符串表示的日期
 * @return { String } 格式化后的日期
 */
function formatDate (date) {
  let d = new Date()
  d.setFullYear(Number.parseInt(date.substr(0, 4)))
  d.setMonth(Number.parseInt(date.substr(4, 2)) - 1)
  d.setDate(Number.parseInt(date.substr(6, 2)))
  return (d.getMonth() + 1) + '月' + d.getDate() + '日 星期' + day[d.getDay()]
}

/**
 * 时间戳格式化
 * 1530692082 -> '07-04 16:14'
 * @param { Number } time 时间戳
 * @return { String } 格式化后的时间字符串
 */
function formatTime (time) {
  let d = new Date(time * 1000)
  let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
  let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
  let hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
  let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
  return month + '-' + date + ' ' + hour + ':' + min
}

module.exports = {
  formatDate: formatDate,
  formatTime: formatTime
}

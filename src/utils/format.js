/**
 *  补零函数
*/
export const addZero = (value) => {
  if (value <= 9) {
    return '0' + value
  } else {
    return value
  }
}

/**
 *  将当前时间格式化
 *  @param none
 *  @return YYYYmmddHHMMSS 20210501102245
 */
export const formatCurrentDate = () => {
  let date = new Date()
  let YYYY = date.getFullYear().toString()
  let mm = addZero((date.getMonth() + 1).toString())
  let dd = addZero(date.getDate().toString())
  let HH = addZero(date.getHours().toString())
  let MM = addZero(date.getMinutes().toString())
  let SS = addZero(date.getSeconds().toString())
  return YYYY + mm + dd + HH + MM + SS
}
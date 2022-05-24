/**
 * @author YangLing
 * @date 2022/5/24 2:29 PM
 */
import dayjs from "dayjs"

/**
 * 日期格式化方法
 * @param time
 * @param format
 * @returns {string}
 */
const format = (time = "",format = "YYYY-MM-DD")=>{
  return dayjs(time).format(format)
}

export default  format

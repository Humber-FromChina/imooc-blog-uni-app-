import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(rTime)

/**
 * 转化成相对时间
 * @param { * } val 
 */
export function relativeTime(val) {
	return dayjs().to(dayjs(val))
}

/**
 * 将字符串转化成以k千为单位的字符
 * @param { String } val
 */
export function hotNumber(val) {
	const num = parseInt(val)
	if (num < 1000) return val
	val += ''
	return val.substring(0, val.length - 3) + 'k'
}

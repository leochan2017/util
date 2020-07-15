// Author: Leo
// Last update: 2020.07.15

/** 获取当前浏览器UA信息 */
function _getUA() {
  return typeof navigator !== 'undefined' && ((navigator && (navigator.userAgent || navigator.swuserAgent)) || '')
}

/** 获取当前是否钉钉环境 */
export function isDD() {
  return /DingTalk/i.test(_getUA())
}

/** 格式化日期 */
export function formatDateTime(timeObj, fmt) {
  var o = {
    'M+': timeObj.getMonth() + 1, //月份
    'd+': timeObj.getDate(), //日
    'h+': timeObj.getHours(), //小时
    'm+': timeObj.getMinutes(), //分
    's+': timeObj.getSeconds(), //秒
    'q+': Math.floor((timeObj.getMonth() + 3) / 3), //季度
    S: timeObj.getMilliseconds() //毫秒
  }

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (timeObj.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}

/** 时间戳转日期 */
export function timeStamp2Text(timeStamp, format = 'yyyy-MM-dd hh:mm') {
  if (!timeStamp || typeof timeStamp !== 'number') return ''
  return formatDateTime(new Date(timeStamp), format)
}

/**
 * 轮询程序
 * 当条件成立，才执行回调
 * 失败 N 次后，执行失败回调
 *
 * @param {String} conditions 成立条件表达式
 * @param {Number} interval 间隔多少毫秒, 默认200
 * @param {Number} timeout (运行)超时次数, 默认50
 *
 */
export function pollFunction(conditions, interval = 200, timeout = 50) {
  return new Promise((resolve, reject) => {
    let num = 0
    let t = setInterval(() => {
      num = num + 1
      if (num >= timeout) {
        reject(`超时,表达式不成立: ${conditions}`)
        return
      }

      if (!conditions) return
      clearInterval(t)
      resolve(`表达式成立: ${conditions}`)
    }, interval)
  })
}

/** 获取当前经纬度 */
export function getLocation(cb, http) {
  // async
  navigator.geolocation.getCurrentPosition(res => {
    // console.log('res', res)
    const { coords } = res
    if (typeof cb === 'function') cb(coords)
  })
}

/**
 * 根据两点间经纬度坐标，计算两点间距离，单位为米
 *
 * @param lng1 起始点经度
 * @param lat1 起始点纬度
 * @param lng2 终点经度
 * @param lat2 终点纬度
 * @return  直线距离，以米为单位
 */
export function calcLinearDistance(lng1, lat1, lng2, lat2) {
  const EARTH_RADIUS = 6378137

  const rad = d => {
    return (d * Math.PI) / 180.0
  }

  const radLat1 = rad(lat1)
  const radLat2 = rad(lat2)
  const a = radLat1 - radLat2
  const b = rad(lng1) - rad(lng2)
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * EARTH_RADIUS
  s = Math.round(s * 10000) / 10000
  return s
}

/** 节流 */
export function throttle(method, delay = 2000, time = 1000) {
  var timeout,
    startTime = +new Date()
  return function () {
    var context = this,
      args = arguments,
      curTime = +new Date()
    clearTimeout(timeout)
    // 如果达到了规定的触发时间间隔，触发 handler
    if (curTime - startTime >= time) {
      method.apply(context, args)
      startTime = curTime
    } else {
      // 没达到触发间隔，重新设定定时器
      timeout = setTimeout(method, delay)
    }
  }
}

/** 强赋值 */
export function superCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/** 通过 名字 + 下标 + 随机串生成的key，用于v-for */
export function generateKey(name = '', index = '') {
  return `key-${name}-${index}-${new Date().getTime().toString(36)}`
}

/** 提取汉字 */
export function getChinese(strValue) {
  if (strValue !== null && strValue !== '') {
    const reg = /[\u4e00-\u9fa5]/g
    return strValue.match(reg).join('')
  } else {
    return ''
  }
}

/**
 * 按字节计算字符串长度
 * @param bytes 字节数
 * @returns
 */
export function byteLength(str) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    // UTF8编码一个中文按3个字节算（GBK编码一个中文按2个字节）
    len += str.charCodeAt(i) > 255 ? 3 : 1
    // len += str.replace(/[^\x00-\xff]/g, 'xxx').length
  }
  return len
}

/**
 * 按字节截取字符串
 * @param bytes 字节数
 * @return s
 */
export function subStringByBytes(str, bytes) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    // UTF8编码一个中文按3个字节算（GBK编码一个中文按2个字节
    len += str.charCodeAt(i) > 255 ? 3 : 1
    if (len > bytes) {
      return str.substring(0, i) + '...'
    }
  }
  return str
}

/**
 * 指定数组对象排序的比较函数
 * @param {Object} property 传入对象属性
 * 示例: arr = arr.sort(Util.compare('count'))
 */
export function compare(property) {
  return function (obj1, obj2) {
    const value1 = obj1[property]
    const value2 = obj2[property]
    // return value1 - value2 // 升序
    return value2 - value1 // 降序
  }
}

/** 跳转去飞书扫码页 */
export function goToLarkLoginPage(appid) {
  const { protocol, host, pathname } = location
  const redirect_uri = encodeURIComponent(`${protocol}//${host}${pathname}`)
  const url = `https://open.feishu.cn/open-apis/authen/v1/index?redirect_uri=${redirect_uri}&app_id=${appid}`

  // 子龙给的旧接口
  // const url = `https://open.feishu.cn/connect/qrconnect/page/sso/?redirect_uri=${redirect_uri}&app_id=${appid}`

  // console.log('去飞书', url)
  location.href = url
}

// export function otherAIP() {
//   return xxx
// }

// 为了让 import leoutil from 'leoutil' 生效
export default { isDD, formatDateTime, timeStamp2Text, pollFunction, getLocation, calcLinearDistance, throttle, superCopy, generateKey, getChinese, byteLength, subStringByBytes, compare, goToLarkLoginPage }

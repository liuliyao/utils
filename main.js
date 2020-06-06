
/**
 * 获取查询参数
 * @param {String} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 统计字节
 * @param {String} str
 * @returns {Number}
 */
export function byteLength(str) {
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * 深拷贝
 * @param {Object} object
 * @returns {Object}
 */
export function deepClone(object) {
  if (!object && typeof object !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = object.constructor === Array ? [] : {}
  Object.keys(object).forEach(keys => {
    if (object[keys] && typeof object[keys] === 'object') {
      targetObj[keys] = deepClone(object[keys])
    } else {
      targetObj[keys] = object[keys]
    }
  })
  return targetObj
}

/**
 * UUID
 * @returns {String}
 */
export function getUUID() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * 设置sessionStorage
 * @param {String} key
 * @param {*} value
 */
export function sessionStorageSet(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取sessionStorage
 * @param {String} key
 * @returns {*}
 */
export function sessionStorageGet(key) {
  return window.sessionStorage.getItem(key)
    ? JSON.parse(window.sessionStorage.getItem(key))
    : ''
}

/**
 * 移除sessionStorage
 * @param {String} key
 */
export function sessionStorageRemove(key) {
  window.sessionStorage.removeItem(key)
}

/**
 * 设置localStorage
 * @param {String} key
 * @param {*} value
 */
export function localStorageSet(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取localStorage
 * @param {String} key
 * @returns {*}
 */
export function localStorageGet(key) {
  return window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : ''
}

/**
 * 移除localStorage
 * @param {String} key
 */
export function localStorageRemove(key) {
  window.sessionStorage.removeItem(key)
}

/**
 * 个位数前加零
 * @param  {String | Number} val
 * @returns {String | Number}
 */
export function zerofill(val) {
  return val >= 10 ? val : '0' + val
}

/**
 * 格式化时间
 * @param {Number} time 时间戳
 * @param {Number} type 格式化类型
 * @param {Number} separate 分隔符
 * @returns {String}
 */
export function formatDate(time, type, separate = '-') {
  const checkTime = parseInt(time)
  if (isNaN(checkTime)) return time
  const date = new Date(parseInt(time))
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()
  switch (type) {
    case 0: // 03-15
      return `${zerofill(month)}${separate}${zerofill(day)}`
    case 1: // 11:12
      return `${zerofill(hours)}${separate}${zerofill(minutes)}`
    case 2: // 2017-03-15
      return `${year}${separate}${zerofill(month)}${separate}${zerofill(day)}`
    case 3: // 2017-03-15 11:12
      return `${year}${separate}${zerofill(month)}${separate}${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}`
    case 4: // 03-15 11:12
      return `${zerofill(month)}${separate}${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}`
    case 5: // 2017年03月15日
      return `${year}年${zerofill(month)}月${zerofill(day)}日`
    default:
      // 2017-03-15 11:12:13
      return `${year}${separate}${zerofill(month)}${separate}${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
  }
}

/**
 * 千分位格式化
 * @param {Number} num
 * @returns {String}
 */
export function toThousandslsFilter(num) {
  return ('' + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}

/**
 * 过滤数字(支持负数)和小数点以外的所有特殊字符
 * @param {String} str
 * @returns {String}
 */
export function filterSpecStr(str) {
  return str || str === 0 ? ((str[0] === '-' ? '-' : '') + String(str).replace(/[^\d\.]/g, '')) : ''
}

/**
 * 判断是否为IE浏览器
 */
export function IEVersion() {
  const userAgent = navigator.userAgent
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 7
    } else if (fIEVersion === 8) {
      return 8
    } else if (fIEVersion === 9) {
      return 9
    } else if (fIEVersion === 10) {
      return 10
    } else {
      return 6 // IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' // edge
  } else if (isIE11) {
    return 11 // IE11
  } else {
    return -1 // 不是ie浏览器
  }
}

/**
 * 异步校验表单
 * @param {Object} form
 */
export const validateFormPromise = function(form) {
  return new Promise(resolve => {
    form.validate(res => {
      resolve(res)
    })
  })
}

/**
 * 对象数组快速去重
 * @param {Array} arr
 * @param {String} key
 */
export const filterArr = (arr, key) => {
  const obj = {}
  const result = arr.reduce((cur, next) => {
    obj[next[key]] ? '' : obj[next[key]] = true && cur.push(next)
    return cur
  }, [])
  return result
}

/**
 * 获取指定日期(字符串类型)到当前时间的天数
 * @param {Date} sDate1
 */
export const dateDiff = (sDate1) => {
  const date2 = new Date()
  const date1 = new Date(Date.parse(sDate1.replace(/-/g, '/')))
  const iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24)
  return iDays
}

/**
 * 数据除法转换
 * @param {String} data
 * @param {Number} division
 */
export const dataDivision = (data, division = 100) => {
  return data && !isNaN(data) ? data / division : ''
}

/**
 * 数据乘法转换
 * @param {String} data
 * @param {Number} multiplication
 */
export const dataMultiplication = (data, multiplication = 100, digit = 2) => {
  if ((data || data === 0) && !isNaN(data)) {
    return (data * multiplication).toFixed(digit)
  } else {
    return ''
  }
}

/**
 * 保留小数位数
 * @param {String} data
 * @param {Number} division
 * @param {Number} digit
 */
export const keepTwoDecimals = (data, division = 100, digit = 2) => {
  if ((data || data === 0) && !isNaN(data)) {
    return (data / division).toFixed(digit)
  } else {
    return ''
  }
}

/** 时间戳转日期 */
const timeStamp2Text = (timeStamp, format = 'yyyy-MM-dd') => {
  if (!timeStamp || typeof timeStamp !== 'number') return ''
  return new Date(timeStamp).Format(format)
}

const test = () => {
  alert('test')
}

export { timeStamp2Text, test }

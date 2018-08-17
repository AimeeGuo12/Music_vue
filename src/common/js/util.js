// 返回最小最大值（包含最大最小值）中的随机数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 洗牌函数 得到一个打乱后的数组
export function shuffle(arr) {
  let _arr = arr.slice() // 使不影响arr 无副作用
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
// 截流函数 对某个函数做截流会返回一个新的函数，新的函数会延时执行要截流的函数
export function debounce(func, delay) { //对func截流
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

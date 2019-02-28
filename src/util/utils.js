/**
 * 颜色比例尺
 * 返回一个颜色比例尺函数
 */
export const colour = (() => {
  // 定义一个序数颜色比例尺
  const scale = d3.scale.category20c()
  return (num) => scale(num)
})()

// 数组扁平化
export const flatten = (arr, result = []) => {
  for (let item of arr) {
    if (Array.isArray(item))
      flatten(item, result)
    else
      result.push(item)
  }
  return result
}

// 将字符串变为json可以使用的对象
export const tojson = (str) => {
  str = JSON.parse(`{${str}}`)
  return str
}




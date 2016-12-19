/**
 * Created by Administrator on 2016/12/19 0019.
 */
export function formatDate(data,fmt){
  //data为传入进来的时间对象
  //fmt是要转换的格式
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace( RegExp.$1,(data.getFullYear() + '').substring(4 - regExp.$1.length));
  }

  let o = {
    'M+':date.getMonth() + 1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
       let str = o[k] + '';
       fmt = fmt.replace(RegExp.$1,(regExp.$1.length===1)?str:padLeftZero(str));
    }
    return fmt;
  }

  function padLeftZero (str) {
    return ('00'+str).substr(str.length)
  }
}

/**
 * Created by zl on 16/10/16.
 *
 * 浏览器相关
 */

/*
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
      (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
          (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

if (Sys.ie) document.write('IE: ' + Sys.ie);
if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
if (Sys.opera) document.write('Opera: ' + Sys.opera);
if (Sys.safari) document.write('Safari: ' + Sys.safari);*/

/**
 * 判断是否为微信内置浏览器
 * @returns {boolean}
 */
const getIsWx = () => {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
    return true
  } else {
    return false
  }
}

/**
 *
 */
const Agent = {
  get isWx () {
    return getIsWx()
  },

  get userAgent () {
    return window.navigator.userAgent
  }
}

/**
 *
 */
export {
  Agent
}

/**
 * Created by jun on 2016/8/23.
 */

import {debug} from '../util/environment'

// var SEVER_URL = debug ? 'http://app.ichangtou.com.cn' : 'http://m.ichangtou.net'
// SEVER_URL 开发 dev 测试 app 上线 m
var SEVER_URL = debug ? 'http://dev.ichangtou.com.cn' : 'http://app.ichangtou.com.cn'

const API_TOKEN = debug ? 'XX:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e' : 'XX:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e'

const CONTENT_TYPE = 'application/json; charset=utf-8'

//const D_PLUS_ID = debug ? 'da168f4458633q92c79b' : 'ea16565d66171ebe26f4'
const D_PLUS_ID = debug ? 'da168f4458633q92c79b' : 'da168f4458633q92c79b'

const WX_APPID = debug ? 'wx7cf8dd5d80048e42' : 'wxd6c823882698f217'

export {
  SEVER_URL,
  API_TOKEN,
  CONTENT_TYPE,
  D_PLUS_ID,
  WX_APPID
}

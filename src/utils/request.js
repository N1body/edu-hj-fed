import axios from 'axios'
import store from '@/store'
import router from '@/router'
import qs from 'qs'
import { Message } from 'element-ui'

const request = axios.create({
  // 配置选项
  // baseURL
  baseURL: 'http://eduboss.lagounews.com'
  // timeout
})

// token是否正在刷新
let isRefreshing = false
// 请求队列 存储正在刷新时导致无法做出响应的请求 token刷新后会陆续发送队列中的请求
let waitingRequests = []

// 添加请求拦截器
request.interceptors.request.use(config => {
  const user = store.state.user
  // 如果config、config.headers、user、user.access_token 存在则设置请求头部
  if (config?.headers && user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, err => Promise.reject(err))

// 添加响应拦截器
request.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, err => {
  if (err.response) {
    // 收到了响应
    // 超出 2xx 范围的状态码都会触发该函数。
    // 获取响应状态码
    const { status } = err.response
    if (status === 401) { // 401表示token无效
      // 先判断 user 是否登录
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(err)
      }
      // 如果 user 存在则尝试刷新 token

      // 先判断是否已经刷新过
      if (!isRefreshing) {
        // 未刷新则发出刷新请求
        isRefreshing = true
        // 返回刷新 token 请求的 Promise 结果
        return refreshToken().then(res => {
          if (!res.data.success) {
            // 刷新不成功则抛出错误
            throw new Error('刷新 Token 失败')
          }
          // 刷新成功重新设置用户的信息
          store.commit('setUser', res.data.content)
          // 刷新成功后将再刷新期间存储的请求重新发出
          waitingRequests.forEach(rs => rs())
          // 重置请求队列
          waitingRequests = []
          // 把失败的请求重新发出
          return request(err.config)
        }).catch(err => {
          // 捕获刷新失败的错误 并清除登录用户 重新跳转
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          // 最后不管成没成功都结束刷新状态
          isRefreshing = false
        })
      }

      // 如果正在刷新 那么先将这个请求借助 Promise 存入队列中
      return new Promise(resolve => {
        // 并且保证这个 Promise 一直初一Pending状态（即不调用resolve）
        // 然后将该 resolve 放入请求队列中
        // resolve 中放入此次的错误请求
        waitingRequests.push(resolve(request(err.config)))
      })
    }
    else if (status === 400) {
      Message.error('请求参数错误')
    }
    else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    }
    else if (status === 404) {
      Message.error('请求资源不存在')
    }
    else if (status >= 500) {
      Message.error('服务端开小差了，请联系管理员')
    }
  }
  else if (err.request) {
    // 发出了请求 未收到响应
    Message.error('请求超时，请刷新重试')
  }
  else {
    // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败: ${err.message}`)
  }
  return Promise.reject(err)
})

// 封装跳转登录页面请求 
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 重新封装一个刷新用户token的请求
function refreshToken () {
  return axios.post('/front/user/refresh_token', qs.stringify({
    refreshtoken: store.state.user.refresh_token
  }))
}

export default request
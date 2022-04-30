import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 保存用户数据 解析localStorage中的用户数据
const state = {
  user: JSON.parse(window.localStorage.getItem('user'))
}

// 响应组件中的动作
const actions = {}

// 修改state中的数据
const mutations = {
  // 添加用户数据
  setUser(state, payload) {
    // 将用户字符串数据转化为对象
    state.user = JSON.parse(payload)
    // 将用户数据保存在在 localStorage 中
    window.localStorage.setItem('user', payload)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})

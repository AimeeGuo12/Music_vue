import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // mutation日志

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 调试工具 开发模式时返回true

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 严格模式 开发环境时使用
  plugins: debug ? [createLogger()] : []
})

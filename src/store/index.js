// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: {},
    formId: ''
  },
  getters: {
    userInfo : state => state.userInfo,
    formId : state => state.formId
  },
  mutations: {
    set_token: (state, token) => {
      const obj = state
      obj.token = token
    },
    set_userInfo: (state, info) => {
      const obj = state
      obj.userInfo = info
    },
    set_formId: (state, formid) => {
      const obj = state
      obj.formId = formid
    }
  },
  actions: {
    get_formId: () => {
      
    }
  }
})

export default store

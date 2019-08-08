import store from '../store'
import { baseUrl } from './config'
import Toast from 'vant-weapp/dist/toast/toast'
export function request (url, data = {}, base = baseUrl) {
  const token = store.state.token ? store.state.token : ''
  const formIds = store.state.formId
  // console.log(token)
  store.commit('set_formId', '')
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${base}/${url}`, // 仅为示例，并非真实的接口地址
      data: JSON.stringify(data),
      header: {
        'content-type': 'text/plain', // 默认值
        'Access-Token': `${token}`,
        'formId': formIds
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        const data = res.data
        if (data.resultCode === '0000000') {
          resolve(data.returnData)
        } else {
          Toast(data.resultDesc)
          reject(res)
        }
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

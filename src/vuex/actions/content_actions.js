import * as types from '../mutation_types'
import { setMsg } from '../../tool'
import Vue from 'vue'
export const setContent = ({ dispatch, state }, tag, callback) => {
  if (state.content[tag]) return false
  Vue.http({
    url: '/api/v1/topics',
    method: 'GET',
    params: {
      page: 0,
      limit: 20,
      tab: tag === 'index' ? '' : tag
    }
  }).then(res => {
    let data = JSON.parse(res.data)
    if (data.success) {
      dispatch(types.SET_CONTENT, tag, data.data)
    } else {
      callback(setMsg(false, data.error_msg))
    }
  }).catch(err => {
    console.log(err)
    callback(setMsg(false, '接口调用出错'))
  })
}

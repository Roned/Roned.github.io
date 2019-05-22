import axios from 'axios'

const service = axios.create({
  baseURL: '',   // api的base_url
  timeout: 10000                                                                      // 请求超时时间
})
const classcontrolAddService = {}

classcontrolAddService.loadAll = function (
  params) {
  return service({
    url: '/loadList',
    method: 'post',
    data: params
  })
}
export default classcontrolAddService
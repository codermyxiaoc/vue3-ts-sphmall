import request from './request'

export function reqcommoditylist(data: object) {
  return request({
    url: '/list',
    method: 'post',
    data
  })
}
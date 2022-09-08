import request from "./request"; 
import reqmock from './mock'
export function reqBaseCategoryList() {
  return request({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}
export function reqbanner() {
  return reqmock({
    url: '/banner',
  })
}
export function reqfloor() {
  return reqmock({
    url: '/floor'
  })
}
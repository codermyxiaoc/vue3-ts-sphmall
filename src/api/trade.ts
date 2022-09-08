import request from "./request";
export function reqtradedata() {
  return request({
    url: '/order/auth/trade',
    method: 'get'
  })
}
export function reqsubmitorder(tradeNo:string,data:object) {
  return request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
  })
}
export function reqcreateNative(orderId:any) {
  return request({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })
}
export function reqPayStatus(orderId:string) {
  return request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
  })
}
export function reqorderdata(page:number,limit:number) {
  return request({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
  })
}
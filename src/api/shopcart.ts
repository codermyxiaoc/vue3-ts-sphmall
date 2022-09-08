import request from "./request";

export function reqcartList() {
  return request({
    url: '/cart/cartList',
    method: 'get'
  })
}
export function requpdatacheckcart(skuID:number,isChecked:number) {
  return request({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: 'get'
  })
}
export function requdeletecart(skuId:number) {
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}
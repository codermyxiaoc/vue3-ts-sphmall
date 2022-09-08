import request from "./request";
export function reqdetalidata(skuId:number) {
  return request({
    url: `/item/${skuId}`,
    method: 'get'
  })
}
export function reqaddorupdatacart(skuId:any,skuNum:any) {
  return request({
    url: `/cart/addToCart/${ skuId }/${ skuNum }`,
    method: 'post'
  })
}

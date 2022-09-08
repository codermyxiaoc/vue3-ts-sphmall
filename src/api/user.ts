import  request from './request'
export function getcode(phone:string) {
  return request({
    url: '/user/passport/sendCode/phone',
    method: 'get',
    data: {
      phone
    }
  })
}
export function reqregister(phone:string,code:string,password:string) {
  return request({
    url: '/user/passport/register',
    method: 'post',
    data: {
      phone,
      code,
      password
    }
  })
}
export function reqlogin(phone:string,password:string) {
  return request({
    url: '/user/passport/login',
    method: 'post',
    data: {
      phone,
      password
    }
  })
}
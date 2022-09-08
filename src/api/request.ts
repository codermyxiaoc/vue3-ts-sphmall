import axios from 'axios'
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

export default function(config: object) {
  const request = axios.create({
    baseURL: '/api',
    timeout: 5000
  })
request.interceptors.request.use((config:any) => {
  nprogress.start()
  if(localStorage.getItem('uuid')) {
    config.headers.userTempId = localStorage.getItem('uuid')
  }
  if(localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
  }
  return config
})

request.interceptors.response.use((resolve) => {
  nprogress.done()
  return resolve.data
}, err => {
  console.log(err);
  
})
  return request(config)
}
import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css"

export default function (config : object) {
  const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
  })
  requests.interceptors.request.use(config => {
    nProgress.start()
    return config
  })
  requests.interceptors.response.use(result => {
    nProgress.done()
    return result.data
  }, err => {
    console.log(err);
  })
  return requests(config)
}
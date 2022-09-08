import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import store from './store/index'
import mitt from 'mitt'
import 'swiper/css/swiper.min.css'
import './mock/mockServe'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { getuuid } from './utils/uudi_token'
const bus = mitt()
getuuid()
const app = createApp(App)
app.config.globalProperties.$bus = bus
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

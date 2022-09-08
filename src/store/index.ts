import { createStore } from 'vuex'
import home from './home'
import detali from './detali'
import shopcart from './shopcart'
import user from './user'
import drade from './trade'
const modules = {
  home,
  detali,
  shopcart,
  user,
  drade
}
const store = createStore({
  modules
})

export default  store
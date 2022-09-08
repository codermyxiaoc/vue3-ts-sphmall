import { reqdetalidata } from '@/api/detali'
import { reqcartList, requpdatacheckcart, requdeletecart } from '../api/shopcart'
import { reqaddorupdatacart } from '../api/detali'
const state = {
  cartlist: []
}
const getters = {
  getischex(state:any) {
    return state.cartlist.every((item:any) => item.isChecked === 1)
  }
}
const mutations = {
  GETCARELIST(state:any,list:Array<object>) {
    state.cartlist = list
  }
}
const actions = {
  async getcartlist({commit}:any) {    
   const result:any = await reqcartList()
   if(result.code === 200) {
     commit('GETCARELIST',result.data[0].cartInfoList)
   }
  },
  getischexall({state}:any,chex:number) {
    const promiseall:any[] = []
    state.cartlist.forEach((item:any)=> {
      const peomise = requpdatacheckcart(item.skuId,chex)
      promiseall.push(peomise)
    });
    return Promise.all(promiseall)
  },
  getischex({ state }: any, item:any) {
    const chex = item.isChecked == 1 ? 0 : 1;
    return requpdatacheckcart(item.skuId, chex)
  },
  deletecart({state}:any,skuId:any) {
    return requdeletecart(skuId)
  },
  deletecartall({dispatch,state}:any) {
    const promiseall:any[] = []
    state.cartlist.forEach((item:any) => {
      if(item.isChecked == 1) {
        const promise =  dispatch('deletecart',item.skuId)
        promiseall.push(promise)
      }
    })
    return Promise.all(promiseall)
  },
  reqaddorupdatacart({ state }: any, { skuId, skuNum }:any) {    
    return reqaddorupdatacart(skuId,skuNum)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
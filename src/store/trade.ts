import  { reqtradedata } from '../api/trade' 
const state = { 
  trade: {}
}
const getters = {
  userAddressList(state:any) {
    return state.trade.userAddressList
  },
  detailArrayList(state:any) {
    return state.trade.detailArrayList
  }
}
const mutations = {
  GETTRADEDATA(state:any,data:object) {
    state.trade = data
  }
}
const actions = {
  async gettradedata({commit}:any) {
    const result:any = await reqtradedata()
    if(result.code) {
      result.data.userAddressList[0].isDefault = 1
      commit('GETTRADEDATA',result.data)
    }
  }
} 
export default {
  state,
  getters,
  mutations,
  actions
}
import { getuuid } from '../utils/uudi_token'
import { reqdetalidata } from '../api/detali'
const state = {
  detalidata: {},
  uuid: getuuid()
}
const getters = {

}
const mutations = {
  GETDETALIDATA(state:any,data:object) {
    state.detalidata = data
  }
}
const actions = {
  async getdetalidata({ commit }:any, id: number) {
    const result:any = await reqdetalidata(id)
    if(result.code === 200) {
      commit('GETDETALIDATA',result.data)
    }    
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
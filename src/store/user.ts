import { getcode, reqregister, reqlogin } from '../api/user'
const state = {
  userinfo: {}
}
const getters = {

}
const mutations = {
  GETUSERINFO(state: any, data: object) {
    state.userinfo = data
  }
}
const actions = {
  getcode({ state }: any, phone: string) {
    return getcode(phone)
  },
  reqregister({ state }: any, { phone, code, password }: any) {
    return reqregister(phone, code, password)
  },
  async reqlogin({ commit }: any, { phone, password }: any) {
    const result: any = await reqlogin(phone, password)
    if (result.code === 200) {
      localStorage.setItem('token',result.data.token)
      localStorage.setItem('name',result.data.name)
      commit('GETUSERINFO', result.data);
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }

  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
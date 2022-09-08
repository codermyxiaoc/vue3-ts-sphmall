import { reqBaseCategoryList } from '../api/home'

interface newstate {
  CategoryList: Array<object>
}
interface content {
  commit: any
}

const state:newstate = {
  CategoryList: []
}
const getters = {

}
const mutations = {
  GTECATEGORTLIST(state: newstate ,list : Array<object>) {
    state.CategoryList = list.splice(1,15)
  }
}
const actions = {
  async getBaseCategoryList({commit} : content) {
    const result:any = await reqBaseCategoryList()
    if(result.code === 200) {
      commit('GTECATEGORTLIST', result.data) 
    }
  },
  

}

export default {
  state,
  getters,
  mutations,
  actions
}
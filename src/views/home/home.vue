<template>
  <div>
    <type-nav></type-nav>
    <list-container></list-container>
    <today-recommend></today-recommend>
    <commodity-rank></commodity-rank>
    <commodity-like></commodity-like>
    <commodity-floor v-for="(item,index) in floorlist" :key="index" :list="item"></commodity-floor>
    <commodity-brand></commodity-brand>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import TypeNav from 'components/TypeNav/TypeNav.vue';
import ListContainer from './childrencomps/ListContainer/ListContainer.vue'
import TodayRecommend from './childrencomps/TodayRecommend/TodayRecommend.vue'
import CommodityRank from './childrencomps/CommodityRank/CommodityRank.vue'
import CommodityLike from './childrencomps/CommodityLike/CommodityLike.vue';
import CommodityFloor from './childrencomps/CommodityFloor/CommodityFloor.vue';
import CommodityBrand from './childrencomps/CommodityBrand/CommodityBrand.vue'
import { reqfloor } from '../../api/home'
export default defineComponent({
  components: {
    TypeNav,
    ListContainer,
    TodayRecommend,
    CommodityRank,
    CommodityLike,
    CommodityFloor,
    CommodityBrand
  },
  name: 'homeVue',
  setup () {
    const floorlist = reactive<any[]>([])
    reqfloor().then((res:any) => {
      if(res.code === 200) {
        floorlist.push(...res.data)
      }
    })
    return {
      floorlist
    }
  }
})
</script>

<style scoped>

</style>
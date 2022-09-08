<template>
  <div>
    <header-nav></header-nav>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderNav from 'components/HeaderNav/HeaderNav.vue';
import PageFooter from 'components/PageFooter/PageFooter.vue';
import { useStore } from 'vuex'
import { onMounted } from 'vue'
export default defineComponent({
  components: {
    HeaderNav,
    PageFooter
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('getBaseCategoryList')
    })
    return {}
  }
})
</script>

<style scoped>

</style>
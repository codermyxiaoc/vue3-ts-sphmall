<template>
  <div>
    <type-nav :isshow="true" :startshow="false"></type-nav>
    <attr-list></attr-list>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import TypeNav from "@/components/TypeNav/TypeNav.vue";
import AttrList from "./childrencomps/AttrList/AttrList.vue";


export default defineComponent({
  name: "searchVue",
  components: {
    TypeNav,
    AttrList,
  },
  setup() {

    return {
    };
  },
});
</script>

<style scoped></style>

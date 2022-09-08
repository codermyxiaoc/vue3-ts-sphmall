<template>
  <div class="swiper-container" id="mySwiper" ref="swiperhtml">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in imglist" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref, nextTick } from "vue";
import swiper from "swiper";
interface list {
  id: number;
  imgUrl: string;
}
export default defineComponent({
  name: "SwiperVue",
  component: {},
  props: {
    imglist: {
      type: Array as PropType<list[]>,
      default() {
        return [];
      },
    },
  },
  
  setup(props:any) {
    const swiperhtml = ref<HTMLElement | null>(null);
      watch(props.imglist,() => {
        nextTick(() => {
          
        new swiper(swiperhtml.value!, {
          loop: true,
           autoplay:true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
      })
    return {
      swiperhtml,
    };

  },
});
</script>

<style scoped></style>

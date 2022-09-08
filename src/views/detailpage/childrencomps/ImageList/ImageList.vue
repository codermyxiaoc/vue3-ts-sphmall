<template>
  <div class="swiper-container" ref="swiperhtml">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in imglist" :key="index">
        <img :src="item.imgUrl" :class="{active: index==currentindex}" @click="clickimg(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, nextTick, getCurrentInstance } from "vue";
import swiper from "swiper";
export default defineComponent({
  props: {
    imglist: {
      type: Array as PropType<any>,
      default() {
        return [];
      },
    },
  },
  setup(props: any) {
    const swiperhtml = ref<HTMLElement | null>();
    const currentindex = ref(0) 
    const inc = getCurrentInstance()
    const bus = inc?.appContext.config.globalProperties.$bus
    watch(
      () => props.imglist,
      () => {
        nextTick(() => {
          new swiper(swiperhtml.value!, {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView: 3,
            slidesPerGroup: 3,
          });
        });
      },
      { immediate: true }
    );
    const clickimg = (index:number) => {
      currentindex.value = index
      
      bus.emit("changeindex", index)
    }
    return {
      swiperhtml,
      currentindex,
      clickimg
  };
  }
});
</script>

<style scoped lang="less">

.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }
  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>

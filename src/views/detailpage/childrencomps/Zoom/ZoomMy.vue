<template>
  <div class="spec-preview">
    <img :src="objimg.imgUrl" />
    <div class="event" @mousemove="handlre"></div>
    <div class="big" >
      <img :src="objimg.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, getCurrentInstance, computed } from 'vue'

export default defineComponent({
  props: {
    imglist: {
      type: Array as PropType<any[]>,
      default() {
        return []
      }
    }
  },
  setup(props:any) {
    const index = ref<number>(0)
    const inc = getCurrentInstance()
    const bus = inc?.appContext.config.globalProperties.$bus
    const big = ref<any>(null)
    const mask = ref<any>(null)
    const handlre = (event:any) => {
      let x = event.offsetX - mask.value?.offsetWidth / 2
      let y = event.offsetY - mask.value?.offsetHeight /2
         if(x <= 0) {
        x = 0
      }
      if(x >= mask.value?.offsetWidth) {
        x = mask.value?.offsetWidth
      }
      if (y <= 0) {
        y = 0
      }
      if (y >= mask.value?.offsetHeight) {
        y = mask.value?.offsetHeight
      }
      mask.value.style.left = x + 'px'
      mask.value.style.top = y + 'px' 
      big.value.style.left = -2 * x + 'px'
      big.value.style.top = -2 * y + 'px' 
    }
    const objimg = computed(() => {
      return props.imglist[index.value] || {}
    }) 
    bus.on('changeindex', (i:number) => {
      index.value = i
    })
    return {
      handlre,
      big,
      mask,
      objimg
    }
}
})
</script>

<style scoped lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>
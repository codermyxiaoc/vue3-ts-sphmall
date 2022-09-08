<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartlist" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" :checked="item.isChecked == 1" @click="ischex(item)" name="chk_list">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler(item.skuNum > 1 ? -1: 0, item.skuId)">-</a>
            <input autocomplete="off" type="number" :value="item.skuNum" minnum="1" class="itxt" @change="change($event,item)">
            <a href="javascript:void(0)" class="plus" @click="handler(1,item.skuId)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delcart(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" :checked="allchex" @change="isallchex($event)" type="checkbox" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delcartall ">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{cartlist.length}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{sumprice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from 'vuex'
export default defineComponent({
  name: "shopcartVue",
  setup() {
    const store  = useStore()
    const getdata = () => {
      store.dispatch('getcartlist')
    }
    getdata()
    const cartlist = computed(() => {
      return store.state.shopcart.cartlist
    })
    const allchex = computed(() => {
    return store.getters.getischex
       
    })
    const isallchex = async (event:any | null) => {
    try {
      await store.dispatch('getischexall', event.target.checked ? 1 : 2) 
      getdata()
    } catch (error:any) {
      alert(error.message)
    }
     
    }
    const ischex = async(item:any) => {
      const result:any = await store.dispatch('getischex',item)
      if(result.code === 200) {
        getdata()
      }
    }
    const delcart = async (id:number) => {
      const result:any = await store.dispatch('deletecart',id)
      if(result.code === 200) {
        getdata()
      }
    }
    const delcartall = async () => {
      try {
        await store.dispatch('deletecartall')
        getdata()
      } catch (error:any) {
        alert(error.message)
      }
    }
    const sumprice = computed(() => {
      let price = 0
      cartlist.value.forEach((item:any) => {
      if(item.isChecked == 1) {
        price += item.skuPrice * item.skuNum
      }
      });
      return price
    })
    const handler = (skuNum:number,skuId:number) => {
      store.dispatch('reqaddorupdatacart',{skuNum,skuId}).then((res:any) => {
        if(res.code === 200) {
          getdata()
        }        
      })
    }
    const change = (event:any,item:any) => {
      const skuNum = (isNaN(1 * event.target.value) ? 0 : 1 * event.target.value < 1 ? 1 : 1 * event.target.value) - item.skuNum
      handler(skuNum,item.skuId)
    }
    return {
      cartlist,
      allchex,
      isallchex,
      ischex,
      delcart,
      delcartall,
      sumprice,
      handler,
      change
    };
  },
});
</script>

<style scoped lang="less">
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 7%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 32%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 13%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

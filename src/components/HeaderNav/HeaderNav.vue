<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!username">
            <span>请</span>
            <a @click="gologin">登录</a>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{username}}</a>
            <a class="register" @click="exitlogin">退出</a>
          </p>
        </div>
        <div class="typeList">
          <a @click="$router.push('/center/myorder')">我的订单</a>
          <a @click="$router.push('/shopcart')">我的购物车</a>
          <a>我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="">
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="inputvalue" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goseaech">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref , getCurrentInstance} from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  setup () {
    const inc = getCurrentInstance()
    const bus = inc?.appContext.config.globalProperties.$bus
    const router = useRouter()
    const route = useRoute()
    const inputvalue = ref()
    const username = ref<string | null>(null)
    const goseaech = () => {
      const config = {
        name: 'search',
        params: {
          keyword: inputvalue.value || undefined
        },
        query: { }
      }
      if(route.query.categoryName) {
        config.query = route.query
      }
      router.push(config)
      bus.on('clear',() => {
        inputvalue.value = ''
        
      })
    }
    const gologin = () => {
      router.push({
        path: '/login'
      })
    }
    const getusername = () => {
      username.value = localStorage.getItem('name')
    }
    getusername()
    bus.on('loginsuccess', () => {
      getusername()
    })
    const exitlogin = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      getusername()
    }
    return {
      goseaech,
      inputvalue,
      gologin,
      username,
      exitlogin
   }
  }
})
</script>

<style scoped lang="less">

.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
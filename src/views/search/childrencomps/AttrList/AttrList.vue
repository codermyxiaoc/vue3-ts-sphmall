<template>
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-if="reqdata.categoryName">{{reqdata.categoryName}}<i @click="removectaegoyname()">×</i>
          </li>
          <li class="with-x" v-if="reqdata.keyword">{{reqdata.keyword}}<i @click="removekeyword">×</i></li>
          <li class="with-x" v-if="reqdata.trademark">{{ reqdata.trademark.split(':')[1] }}<i
              @click="removetrademark">×</i></li>
          <li class="with-x" v-for="(item, index) in reqdata.props" :key="item.split(':')[0]">{{ item.split(':')[1] }}<i
              @click="removeprops(index)">×</i>
          </li>
        </ul>
      </div>
      <!--selector-->
      <selector :attrs-list="categorydata.attrsList" :trademark-list="categorydata.trademarkList"
        @tradeMatkHandler="tradeMatkHandler" @attrinfo="attrinfo">
      </selector>
      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{active:isbut}" @click="synthesize">
                <a v-if="isAscOrDesc">综合<i v-show="isbut">⬆</i></a>
                <a v-else>综合<i v-show="isbut">⬇</i></a>
              </li>
              <li :class="{active: !isbut}" @click="sales">
                <a v-if="isAscOrDesc">价格<i v-show="!isbut">⬆</i></a>
                <a v-else>价格<i v-show="!isbut">⬇</i></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="item in categorydata.goodsList" :key="item">
              <div class="list-wrap">
                <div class="p-img">
                  <a target="_blank" @click="godetali(item.id)"><img :src="item.defaultImg" /></a>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>&nbsp;{{item.price}}</i>
                  </strong>
                </div>
                <div class="attr">
                  <a target="_blank" href="item.html"
                    title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{item.title}}</a>
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a target="_blank" class="sui-btn btn-bordered btn-danger" @click="godetali(item.id)">加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="fr page">
          <div class="sui-pagination clearfix">
            <el-pagination v-model:currentPage="currentpage" v-model:page-size="pagesize" :small="true"
              :disabled="false" :background="true" layout="prev, pager, next, jumper" :total="total"
              @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
      <!--hotsale-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, getCurrentInstance, computed} from 'vue'
import Selector from '../selector/Selector.vue'
import { dataface } from '../../../../interface/searchdata'
import {  useRoute, useRouter } from 'vue-router'
import { reqcommoditylist } from '../../../../api/search'
export default defineComponent({
  props: {
    list: Object,
    default() {
      return {}
    }
  },
  components: {
    Selector
  },
  setup () {
    const inc = getCurrentInstance()
    const bus = inc?.appContext.config.globalProperties.$bus
    const route = useRoute()
    const router = useRouter()
    const reqdata : dataface = reactive({
      category1Id: "",
      category2Id: "",
      category3Id: "",
      categoryName: "",
      keyword: route.params.keyword as any,
      order: "1:desc",
      pageNo: 1,
      pageSize: 3,
      props: [],
      trademark: "",
    });
    const currentpage = ref(1)
    const pagesize = ref(6)
    const total = ref(0)
    const isAscOrDesc = ref<Boolean>(true)
    const categorydata = reactive<any>({})
    
    const handleCurrentChange = (page:number) => {
      reqdata.pageNo = page
      getdata()
    }
    const handleSizeChange = (size:number) => {
      reqdata.pageSize = size
      getdata()
    }
    const getdata = async () => {
      Object.assign(reqdata,route.query,route.params)
      const result:any = await reqcommoditylist(reqdata)
      currentpage.value = result.data.pageNo
      pagesize.value = result.data.pageSize
      total.value = result.data.total
      if(result.code === 200) {
        for(var key in result.data)
        categorydata[key] = result.data[key]
      }
    }
    getdata()
    const tradeMatkHandler = (item:any) => {
      reqdata.trademark = item.tmId + ':' + item.tmName
      getdata()
    }
    const attrinfo = (item:any) => {
      let flag = false
      if (reqdata.props.indexOf(item) === -1) {
        if(reqdata.props.length === 0) {
          reqdata.props.push(item)
        }
        reqdata.props.forEach(value => {
          if (value.split(':')[0] == item.split(':')[0]) {
              flag = true
            return
          }
        })
        if (flag) {
          reqdata.props.splice(reqdata.props.indexOf(item), 1, item)
        } else {
          reqdata.props.push(item)
        }
      }
      getdata()
    }
    const removectaegoyname = () => {
      reqdata.categoryName = undefined
      router.push({
        name: 'search',
        params: route.params
      })
      removeid()
      /* getdata()  */
    }
    const removekeyword =() => {
      reqdata.keyword = ''
      router.push({
        name: 'search',
        query: route.query
      })
      bus.emit('clear')
    }
    const removetrademark = () => {
      reqdata.trademark = undefined
      getdata()
    }
    const removeprops = (index:number) => {
      reqdata.props.splice(index,1)
      getdata()
    }
    const removeid = () => {
      reqdata.category1Id = undefined
      reqdata.category2Id = undefined
      reqdata.category3Id = undefined
    }
    const synthesize = () => {
      if (reqdata.order?.split(':')[0] == '1') {
        if (reqdata.order?.split(':')[1] == 'desc') {
          reqdata.order = '1:asc'
          isAscOrDesc.value = false
        } else {
          reqdata.order = '1:desc'
          isAscOrDesc.value = true
        }
      } else {
       reqdata.order = '1:desc' 
        isAscOrDesc.value = true
      }
      
      getdata()
    }
    const sales = () => {
      if (reqdata.order?.split(':')[0] == '2') {
        if (reqdata.order?.split(':')[1] == 'desc') {
          reqdata.order = '2:asc'
          isAscOrDesc.value = false
        } else {
          reqdata.order = '2:desc'
          isAscOrDesc.value = true
        }
      } else {
        reqdata.order = '2:desc'
        isAscOrDesc.value = true
      }
      getdata()
    }
    const isbut = computed(() => {
      return reqdata.order?.split(':')[0] == '1'
    })
    const godetali = (skuId:number) => {
      router.push({
        path: '/detail',
        query: {
          skuId
        }
      })
    }
    watch(() => router.currentRoute.value.fullPath,() => {
      getdata()
      removeid()
    })
    return {
      currentpage,
      pagesize,
      handleCurrentChange,
      handleSizeChange,
      reqdata,
      total,
      categorydata,
      tradeMatkHandler,
      attrinfo,
      removectaegoyname,
      removekeyword,
      removetrademark,
      removeprops,
      synthesize,
      sales,
      isbut,
      isAscOrDesc,
      godetali
    }
  }
})
</script>

<style scoped lang="less">

.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

   

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;
          text-align: center;
        }
      }
    }

    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;

      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }

      .hot-list {
        padding: 15px;

        ul {
          display: flex;

          li {
            width: 25%;
            height: 100%;

            .list-wrap {

              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }

              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }

              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }

              .price {
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
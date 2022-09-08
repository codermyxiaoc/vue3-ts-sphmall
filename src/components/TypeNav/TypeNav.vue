<template>
  <div class="type-nav">
    <div @mouseleave="leave">
      <div class="container">
        <h2 class="all" @mouseenter="isdatashow">全部商品分类</h2>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <transition @before-enter="EnterFrom" @enter="EnterActive" @leave="leaveActive">
          <div class="sort" v-show="datashow" @click="gosearch">
            <div class="all-sort-list2">
              <div class="item" v-for="(item1, index) in list" :key="item1.categoryId">
                <h3 @mousemove="move(index)" :class="{ active: index === currentindex }">
                  <a :data-categoryName="item1.categoryName" :data-category1Id="item1.categoryId">{{ item1.categoryName
                    }}</a>
                </h3>
                <div class="item-list clearfix" v-show="index === currentindex">
                  <div class="subitem" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-category2Id="item2.categoryId" :data-categoryName="item2.categoryName">{{
                          item2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                          <a :data-category3Id="item3.categoryId" :data-categoryName="item3.categoryName">{{
                            item3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from 'vue-router'
import animation from '../../hooks/animation'
export default defineComponent({
  props: {
    isshow: {
      type: Boolean,
      default: false,
    },
    startshow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const list = computed(() => store.state.home.CategoryList);
    const currentindex = ref(-1);
    const datashow = ref(props.startshow);
    const move = (index: number) => {
      
      
      currentindex.value = index;
    };
    const leave = () => {
      currentindex.value = -1;
      if (props.isshow) {
        datashow.value = false;
      }
    };
    const isdatashow = () => {
      datashow.value = true;
    };
    const animfunc = animation()
    const gosearch = (event:any) => {
      const { categoryname, category1id, category2id, category3id } = event.target.dataset
      const config:any = {
        path: '/search',
        params:{},
        query:{}
      }
      if(categoryname) {
        config.query.categoryName = categoryname
        if(category1id) {
          config.query.category1Id = category1id
        }
        if(category2id){
          config.query.category2Id = category2id
        }
        if(category3id){
          config.query.category3Id = category3id
        }
        if(route.params.keyword) {
          config.params.keyword = route.params.keyword
        }
        router.push(config)
      }
    }
    return {
      list,
      currentindex,
      move,
      leave,
      datashow,
      isdatashow,
      ...animfunc,
      gosearch
    };
  },
});
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            /* display: none; */
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .active {
    background-color: skyblue;
  }
}
</style>

<template>
    <div class="goodsinfo-container">
<!--      小球-->
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>

      <!--  轮播图界面-->
      <div>
        <swipe :lunbotu ="lunbotu"  :isfull="false"></swipe>
      </div>

<!--  商品购买界面-->
      <div class="mui-card">
        <div class="mui-card-header">{{ goodsinfo.title }}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="price">
              市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
            </p>
            <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            </p>
          </div>
        </div>
      </div>

<!--商品参数界面-->
      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品货号：{{ goodsinfo.goods_no }}</p>
            <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
            <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        </div>
      </div>

    </div>
</template>

<script>
  import swipe from  "../subcomponents/swipe.vue"
  // 导入 数字选择框 组件
  import numbox from "../subcomponents/goodsinfo_numbox.vue";
    export default {
        name: "goodsinfo",
      data(){
          return{
            id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
            lunbotu: [], // 轮播图的数据
            goodsinfo: {}, // 获取到的商品的信息
            ballFlag: false, // 控制小球的隐藏和显示的标识符
            selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
          }
      },
      created() {
        this.getLunbotu();
        this.getGoodsInfo();
      },
      methods:{
        getLunbotu(){
          this.$http.get("api/getthumimages/" + this.id)
            .then(response => {
              if(response.body.status === 0){
                response.body.message.forEach(item => {
                  item.img = item.src;
                })
                this.lunbotu = response.body.message;
              }
            })
        },
        getGoodsInfo(){
          // 获取商品的信息
          this.$http.get("api/goods/getinfo/" + this.id).then(result => {
            if (result.body.status === 0) {
              this.goodsinfo = result.body.message[0];
            }
          });
        },
        goDesc(id) {
          // 点击使用编程式导航跳转到 图文介绍页面
          this.$router.push({ name: "godesc", params: { id } });
        },
        goComment(id) {
          // 点击跳转到 评论页面
          this.$router.push({ name: "gocomment", params: { id } });
        },
        addToShopCar(){
          // 添加到购物车
          this.ballFlag = !this.ballFlag;
          // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
          // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
          var goodsinfo = {
            id: this.id,
            count: this.selectedCount,
            price: this.goodsinfo.sell_price,
            selected: true
          };
          // 调用 store 中的 mutations 来将商品加入购物车
          this.$store.commit("addToCar", goodsinfo);
        },
        beforeEnter(el) {
          el.style.transform = "translate(0, 0)";
        },
        enter(el, done) {
          el.offsetWidth;
          const ballPosition = this.$refs.ball.getBoundingClientRect();
          const badgePosition = document.getElementById("badge").getBoundingClientRect();
          const xDist = badgePosition.left - ballPosition.left;
          const yDist = badgePosition.top - ballPosition.top;
          //注意扩展符
          el.style.transform = `translate(${xDist}px, ${yDist}px)`;
          el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
          done()
        },
        afterEnter(el){
          this.ballFlag = !this.ballFlag
        },
        getSelectedCount(count){
          this.selectedCount = count;
          console.log("父组件拿到的数量值为： " + this.selectedCount);
        }

      },
      components:{
          swipe,
        numbox
      }
    }
</script>

<style scoped>

  .goodsinfo-container{
    background-color: #ccc;
    overflow: hidden;
    /*    解决塌陷问题*/
  }

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;}
  .mui-card-footer button {
    margin: 15px 0;
  }
  .ball{
    width: 15px;
    height: 15px;
    border-radius:50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }

</style>

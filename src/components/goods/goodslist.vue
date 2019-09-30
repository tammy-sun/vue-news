<template>
  <!--在网页中，有2种跳转方式:
    1,以a标签的方式跳转.叫标签跳转，上面的router就是a标签的跳转形式
    2.以代码的形式跳转，使用window。location.href 的形式，叫做编程式导航,vue-router中有介绍 也就是用JS代码进行编程
      通过给上面绑定个点击事件，然后定义事件，能达到同样的效果，-->

  <div class="goodslist container">
      <div class="good-list" v-for="item in list" :key="item.id"  @click="goodetail(item.id)">
        <img :src="item.img_url" alt="">
        <h1 class="title" >{{item.title}}</h1>
        <div class="info">
          <div class="price">
            <span class="new">￥{{ item.sell_price }}</span>
            <span class="old">￥{{ item.market_price }}</span>
          </div>
          <div class="sell">
            <span >热卖中</span>
            <span >剩余{{item.stock_quantity}}件</span>
          </div>
        </div>
      </div>
      <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        name: "goodslist",
      data(){
          return{
            pageindex:1,  //分页的页数
            list:[]      //存放商品列表的数组
          }
      },
      created() {
          this.getGoodsList()
      },
      methods:{
        getGoodsList(){
          this.$http.get("api/getgoods?pageindex="+this.pageindex)
            .then(response =>{
              if(response.body.status === 0){
                this.list = this.list.concat(response.body.message)
              }
            })
        },
        getmore(){
          this.pageindex ++;
          this.getGoodsList()
        },
        goodetail(id){
          this.$router.push("/home/goodsinfo/"+id)
          //    使用js的形式进行路有导航
          //    注意：一定要区分 this.$route 和 this.$touter 这2个对象
          //    注意：this.$route 是路由【参数对象】，所有路由中的参数，params。query 都属于他
          //    注意：this.$router 是一个路由【导航对象，用它可以方便的使用JS代码，实现
          //    路由的前进，后退，跳转到新的URL地址】
          // console.log(this); 可以查看所有router属性
        }
      }
    }
</script>
<style scoped>
    .goodslist{
      padding: 5px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

    }
    .goodslist .good-list{
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 4px 0;
      padding: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 293px;
      }
    .goodslist .good-list img{
      width: 100%;
    }
    .goodslist .good-list h1{
      font-size: 14px;
    }
    .info{
      background-color: #eee;
    }
    .info .price{
      font-size: 12px;
      color: red;
    }
    .info .price .old{
       text-decoration: line-through;
      margin-left: 10px;

     }
    .info .sell{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
</style>

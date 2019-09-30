<template>
    <div class="photoinfo">
      <h3 >{{ photoinfo.title }}</h3>
      <p class="subtitle">
        <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
        <span>点击：{{ photoinfo.click }}次</span>
      </p>
      <hr>
<!--      存放缩略图-->
      <div class="thumbs">
        <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
      </div>

<!--      文字内容-->
      <div class="content" v-html="photoinfo.content"></div>

<!--      放个评论组件-->
      <comment :id="id"></comment>
    </div>
</template>

<script>
  import  comment from "../subcomponents/comment.vue"
    export default {
        name: "photoinfo",
      data(){
          return{
            id: this.$route.params.id , // 从路由中获取到的 图片Id
            photoinfo:{},  // 图片详情
            list: []  // 缩略图的数组
          }
      },
      created() {
          this.getPhotoInfo()
          this.getThumbs()
      },
      methods:{
        getPhotoInfo(){
          // 获取图片的详情
          this.$http.get("api/getimageInfo/"+this.id)
            .then(response =>{
              if(response.body.status === 0){
                this.photoinfo = response.body.message[0]
              }
          })
        },
        getThumbs() {
          // 获取缩略图
          this.$http.get("api/getthumimages/" + this.id).then(result => {
            if (result.body.status === 0) {
              // 循环每个图片数据，补全图片的宽和高
              result.body.message.forEach(item => {
                item.w = 600;
                item.h = 400;
              });
              // 把完整的数据保存到 list 中
              this.list = result.body.message;
            }
          });
        }
      },
      components:{
        comment
      }
    }
</script>

<style scoped>
  .photoinfo{
    padding: 3px;
  }
  .photoinfo  h3{
    color: #26a2ff;
    font-size: 12px;
    text-align: center;
    margin: 15px 0;
  }
  .photoinfo   .subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 10px;
  }
  .content {
    font-size: 10px;
    line-height: 30px;
  }
  .thumbs img{
    margin: 2px;
    box-shadow: 0 0 8px #999;
  }
</style>

<template>
    <div class="newsinfo-container" >
      <h3 class="title">{{photoinfo.title}}</h3>
      <p class='mui-ellipsis'>
        <span>发表时间 ：{{photoinfo.add_time | dataFormat }}</span>
        <span>点击：{{photoinfo.click}}</span>
      </p>

      <hr>
<!--      文字内容区-->
      <div class="content" v-html="photoinfo.content"></div>
      <!--      包含图片的内容区-->
<!--      <div class="thumbs">-->
<!--        <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100"  :key="item.src">-->
<!--      </div>-->

<!--    插入评论组件-->
      <comment  :id="id" ></comment>

    </div>

</template>

<script>
  import comment from "../subcomponents/comment.vue"
    export default {
        name: "newsinfo",
      data(){
          return{
            photoinfo:{},
            list:[],
            id:this.$route.params.id
          }
      },
      created() {
          this.getPhotoInfo()
      },
      methods:{
        getPhotoInfo(){
          this.$http.get("api/getimageInfo/" + this.id)
            .then(response=>{
              if (response.body.status === 0){
                this.photoinfo = response .body.message[0]
              }
            })
        }
      },
      components:{
          comment
      }
    }
</script>

<style scoped>
  .newsinfo-container{
    padding: 0 4px;
  }
  .newsinfo-container .title{
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    /*color: red;*/
  }
  .newsinfo-container .mui-ellipsis{
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .newsinfo-container .content img{
    width: 100%;
  }
</style>

<template>
  <div class="cmt-container">
    <h3 class="title">发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
        </div>
      </div>

    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>

  import { Toast } from "mint-ui"
    export default {
        name: "comment",
        props:["id"],
      data(){
          return{
            pageIndex: 1, // 默认展示第一页数据
            msg:"",    // 评论输入的内容
            comments:[]  // 所有的评论数据
          }
      },
      created() {
          this.getComments()
      },
      methods:{
        getComments() {
          // 获取评论
          this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
            .then(response => {
              if (response.body.status === 0) {
                this.comments = this.comments.concat(response.body.message);
              } else {
                Toast("获取评论失败！");
              }
            });
        },
        getMore(){
          //加载更多
          this.pageIndex ++;
          this.getComments()
        },
        postComment(){
          // 校验是否为空内容
          if(this.msg.trim().length == 0){
            return Toast("请填写评论")
          }
          // 发表评论
          // 参数1： 请求的URL地址
          // 参数2： 提交给服务器的数据对象 { content: this.msg }
          // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
          this.$http.post("api/postcomment/" + this.id, {content: this.msg.trim()})
            .then(response=>{
              if(response.body.status === 0){
                var cmt = {
                  user_name: "匿名用户",
                  add_time: Date.now(),
                  content: this.msg.trim()
                };
                this.comments.unshift(cmt)
                this.msg=""
              }
            })
        }
      }
    }
</script>

<style scoped>
  .cmt-container .title{
    text-align: center;
  }
  .cmt-container h3 {
    font-size: 18px;
  }
  .cmt-container   textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-container     .cmt-list {
    margin: 5px 0;
  }
  .cmt-container   .cmt-list   .cmt-item {
    font-size: 13px;
  }
  .cmt-container   .cmt-list   .cmt-item    .cmt-title {
    line-height: 30px;
    background-color: #ccc;
  }
  .cmt-container   .cmt-list   .cmt-item   .cmt-body {
    line-height: 35px;
    text-indent: 2em;
  }
</style>

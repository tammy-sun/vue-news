<template>
  <div class="godesc">
    <h3> {{ info.title}}</h3>
    <hr>
    <div  class="content" v-html="info.content"></div>
  </div>
    
</template>

<script>
    export default {
        name: "godesc",
      data(){
          return{
            info:{}, // 图文数据
          }
      },
      created() {
          this.getgodesc();
      },
      methods:{
        getgodesc(){
          this.$http.get("api/goods/getdesc/" + this.$route.params.id)
            .then(response => {
              if(response.body.status === 0){
                this.info = response.body.message[0]
              }
            })
        }
      }
    }
</script>

<style >
.godesc {
  padding: 4px;
}
.godesc    h3 {
  font-size: 16px;
  color: #226aff;
  text-align: center;
  margin: 15px 0;
}
.godesc  .content img{
  width: 100%;
}
</style>

<template>
    <div class="gocomment">
      <comment :id="this.$route.params.id"></comment>
    </div>
</template>

<script>
  import comment from "../subcomponents/comment.vue"
    export default {
        name: "gocomment",
      components:{
          comment
      }
    }
</script>

<style scoped>

</style>

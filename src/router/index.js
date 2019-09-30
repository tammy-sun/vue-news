import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import VueResource from 'vue-resource'
Vue.use(VueResource)


// 导入对应的路由组件
import home from '../components/tabbar/Home'
import member from "../components/tabbar/member.vue"
import search from "../components/tabbar/search.vue"
import shopcar from "../components/tabbar/shopcar.vue"
import newslist from "../components/news/newslist.vue"
import newsinfo from  "../components/news/newsinfo.vue"
import photolist from  "../components/photos/photolist.vue"
import photoinfo from  "../components/photos/photoinfo.vue"
import goodslist from  "../components/goods/goodslist.vue"
import goodsinfo from  "../components/goods/goodsinfo.vue"
import godesc from  "../components/goods/godesc.vue"
import gocomment from  "../components/goods/gocomment.vue"



export default new Router({
  routes: [
    {path:"/",redirect:"/home"},
    {path:"/home",component:home},
    {path:"/member",component:member},
    {path:"/search",component:search},
    {path:"/shopcar",component:shopcar},
    {path:"/home/newslist",component:newslist},
    {path:"/home/newsinfo/:id",component:newsinfo},
    {path:"/home/photolist/",component:photolist},
    {path:"/home/photoinfo/:id",component:photoinfo},
    {path:"/home/goodslist",component:goodslist},
    {path:"/home/goodsinfo/:id",component:goodsinfo},
    {path:"/home/godesc/:id",component:godesc,name:"godesc"},
    {path:"/home/gocomment/:id",component:gocomment,name:"gocomment"}
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

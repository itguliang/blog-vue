import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EditBlog from './views/EditBlog.vue'
import BlogDetail from './views/BlogDetail.vue'
import VideoPlay from './views/VideoPlay.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/video-play',
      name: 'VideoPlay',
      component: VideoPlay
    },
    {
      path: '/edit-blog',
      name: 'EditBlog',
      component: EditBlog
    },
    {
      path: '/blog-detail/:blogId',
      name: 'BlogDetail',
      component: BlogDetail
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import New from '@/components/New'
import Ask from '@/components/Ask'
import Show from '@/components/Show'
import Jobs from '@/components/Jobs'
import User from '@/components/User'
import Post from '@/components/Post'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/show',
    name: 'Show',
    component: Show
  },
  {
    path: '/ask',
    name: 'Ask',
    component: Ask
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  {
    path: '/user/:userinfo',
    name: 'user',
    component: User,
    props: true
  },
  {
    path: '/post/:postinfo',
    name: 'postInfo',
    component: Post,
    props: true
  }
]

export default new Router({
  routes,
  mode: 'history'
})

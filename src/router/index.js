import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件,懒加载方式
const Login = ()=>import('components/common/Login.vue')
const Home = ()=>import('views/home/Home.vue')
const News = ()=>import('views/news/News.vue')
const Elegant = ()=>import('views/elegant/Elegant.vue')
const Search = ()=>import('views/search/Search.vue')
const Down = ()=>import('views/down/Down.vue')
const Rules = ()=>import('views/rules/Rules.vue')
const Application = ()=>import('views/application/Application.vue')
const Edu = ()=>import('views/edu/Edu.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/edu',
    component:Edu,
    redirect:'/home',
    children:[
      {
        path:'/home',
        component:Home
      },
      {
        path:'/news',
        component:News
      },
      {
        path:'/elegant',
        component:Elegant
      },
      {
        path:'/search',
        component:Search
      },
      {
        path:'/down',
        component:Down
      },
      {
        path:'/rules',
        component:Rules
      },
      {
        path:'/application',
        component:Application
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

const Game = () => import(/* webpackChunkName: "game-route" */ '@/views/Game.vue')
// const Home = () => import('@/views/Home.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/tic-tac-toe',
    name: 'tic-tac-toe',
    component: Game
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router

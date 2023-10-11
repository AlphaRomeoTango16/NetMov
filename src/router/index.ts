import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MoviesList from '../views/MoviesList.vue'
import FavList from '../views/FavList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/category/:id',
    name: 'category',
    component: MoviesList
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: FavList
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

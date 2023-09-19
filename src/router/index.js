import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import { ROUTES_PATHS } from '@/constants'
import RandomCocktail from '@/pages/RandomCocktail.vue'
import SingleCocktail from '@/pages/SingleCocktail.vue'

const routes = [
  {
    path: ROUTES_PATHS.HOME,
    component: Home
  },
  {
    path: ROUTES_PATHS.RANDOM_COCKTAIL,
    component: RandomCocktail
  },
  {
    path: ROUTES_PATHS.SINGLE_COCKTAIL,
    component: SingleCocktail
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes
})

export default router

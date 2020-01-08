import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Middlewares from '../middlewares/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/auth/Login.vue'),
    meta: { middlewares: [Middlewares.guest] }
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/auth/Register.vue'),
    meta: { middlewares: [Middlewares.guest] }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/pages/Dashboard.vue'),
    meta: { middlewares: [Middlewares.auth] }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index]
  if (!nextMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMidd = nextCheck(context, middleware, index + 1)

    nextMiddleware({ ...context, next: nextMidd })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middlewares) {
    const middleware = Array.isArray(to.meta.middlewares)
      ? to.meta.middlewares
      : [to.meta.middlewares]

    const ctx = {
      from,
      next,
      router,
      to
    }

    const nextMiddleware = nextCheck(ctx, middleware, 1)
    return middleware[0]({ ...ctx, next: nextMiddleware })
  }
  return next()
})
export default router

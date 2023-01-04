import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../firebase/initFirebase'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("../views/RegisterView.vue")
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: () => import("../views/SignInView.vue")
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

  router.beforeEach((to, from, next) => {
    if((to.path === '/sign-in' || to.path === '/register') && auth.currentUser ) {
      next('/');
      return;
    }
    if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
      next('/sign-in');
      return;
    }
    next();
  })
  

export default router

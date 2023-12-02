import TheHome from "@/components/TheHome";
import PusherHome from "@/components/PushToRally/PusherHome";
import ImportHome from "@/components/Import/ImportHome";
import CompareHome from "@/components/Compare/CompareHome";
import UserAuth from "@/components/Login/UserAuth";
import {createRouter, createWebHistory} from "vue-router";
import {store} from "@/store/store";
import MicroSiloHome from "@/components/MicroSilo/MicroSiloHome";

export const routes = [
  {
    path: '/',
    component: TheHome,
  },
  {
    path: '/login',
    component: UserAuth,
  },
  {
    path: '/export',
    component: PusherHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/silo',
    component: ImportHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/compare',
    component: CompareHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/microsilo',
    component: MicroSiloHome,
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach(function(to, from, next){
    console.log(`Login on page:`)
    console.log(from)
    console.log(to)
    console.log(`is logged in ?`)
    console.log(store.getters['auth/isLoggedIn'])
    if (to.meta.requiresAuth && !store.getters['auth/isLoggedIn']){
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    else if (to.path === '/login' && store.getters['auth/isLoggedIn']){
      next()
    }
    else {
      next()
    }
  }
);

// Router.beforeEach(function(to, from, next){
//   if (to.meta.requiresAuth && !this.$store.getters['auth/isLoggedIn']){
//     next('/login');
//   }
// })
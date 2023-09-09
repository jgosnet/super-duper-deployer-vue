import TheHome from "@/components/TheHome";
import PusherHome from "@/components/PushToRally/PusherHome";
import ImportHome from "@/components/Import/ImportHome";
import CompareHome from "@/components/Compare/CompareHome";
import UserAuth from "@/components/Login/UserAuth";

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
    path: '/import',
    component: ImportHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/compare',
    component: CompareHome,
    meta: { requiresAuth: true }
  }
]

// Router.beforeEach(function(to, from, next){
//   if (to.meta.requiresAuth && !this.$store.getters['auth/isLoggedIn']){
//     next('/login');
//   }
// })
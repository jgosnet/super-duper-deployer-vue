import TheHome from "@/components/TheHome";
import PusherHome from "@/components/PushToRally/PusherHome";
import ImportHome from "@/components/Import/ImportHome";
import CompareHome from "@/components/Compare/CompareHome";

export const routes = [
  {
    path: '/',
    component: TheHome
  },
  {
    path: '/export',
    component: PusherHome
  },
  {
    path: '/import',
    component: ImportHome
  },
  {
    path: '/compare',
    component: CompareHome
  }
]

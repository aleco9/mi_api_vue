import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "area" */ '../views/Area.vue')
  },
  {
    path: '/area/:id',
    name: 'areaUpdate',
    component: () => import(/* webpackChunkName: "areaUpdate" */ '../views/AreaUpdate.vue')
  },
  {
    path: '/empleado',
    name: 'emplead',
    meta: {
      requireAuth: false,
      verificarRol: true,
      rol: 'admin',
      precondicion:"area"
    },
    component: () => import(/* webpackChunkName: "emplead" */ '../views/Empleado.vue')
  },
  {
    path: '/empleado/:id',
    name: 'empleado',
    component: () => import(/* webpackChunkName: "empleadoUpdate" */ '../views/EmpleadoUpdate.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some((record) => record.meta.requireAuth)){
    if(null === localStorage.getItem('auth') || 'false' == localStorage.getItem('auth')){
      next({name: "home"});
    }
  }
  next();
});

export default router


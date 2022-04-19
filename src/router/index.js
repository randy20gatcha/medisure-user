import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Register from '../views/Register.vue';
import Portal from '../views/Portal.vue';
import ClientView from '../views/ClientView.vue';
import { getUserState } from '@/firebase';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView    
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/portal',
    name: 'portal',
    component: Portal   
  },
  {
    path: '/clientView',
    name: 'clientView',
    component: ClientView    
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from) => {
  const isAuth = await getUserState();
   if(!isAuth && to.name !== 'home') {
     return { name: 'portal'}
   } 
})

export default router

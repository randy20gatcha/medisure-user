import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Register from '../views/Register.vue';
import Portal from '../views/Portal.vue';
import HrView from '../views/HrView.vue';
import ForCompany from '../components/ForCompany.vue';
import ForClient from '../components/ForClient.vue';
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
    path: '/hrView',
    name: 'hrView',
    component: HrView    
  },
  {
    path: '/forCompany/:userId',
    name: 'forCompany',
    component: ForCompany,  
  },
  {
    path: '/forClient/:userId',
    name: 'forClient',
    component: ForClient
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from) => {
  const isAuth = await getUserState();
   if(!isAuth && from.name === 'home') {
     return { name: 'home'}
   } 
})

export default router

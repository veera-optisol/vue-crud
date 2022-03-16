import { createRouter, createWebHistory } from 'vue-router';
import UsersList from '../components/pages/UsersList.vue';
import UserCreate from '../components/users/UserCreate.vue';
import UserDetails from '../components/pages/UserDetails.vue';

const routes = [
  { path: '/', redirect: '/users' },
  {
    path: '/users',
    name: 'users',
    component: UsersList
  },
  {
    props: true,
    path: '/users/:userId',
    name: 'userDetail',
    component: UserDetails
  },
  {
    path: '/create-user',
    name: 'UserCreate',
    component: UserCreate
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

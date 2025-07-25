import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from './components/LoginForm.vue';

import UserPage from './components/UserPage.vue';
import UserDetail from './components/UserDetail.vue';
import UserDashboard from './components/UserDashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginForm,
    },
    {
      path: '/dashboard',
      name: 'UserDashboard',
      component: UserDashboard,
    },
    {
      path: '/users',
      name: 'Users',
      component: UserPage,
    },
    {
      path: '/users/:id',
      name: 'UserDetail',
      component: UserDetail,
      props: true,
    },
  ],
}); 
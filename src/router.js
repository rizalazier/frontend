import Vue from 'vue';
import Router from 'vue-router';
import LoginForm from './components/LoginForm.vue';

const Dashboard = { template: '<div><h2>Dashboard</h2><p>Protected content goes here.</p></div>' };

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
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
}); 
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import VueResouse from 'vue-resource';


import './common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResouse);

let routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
 });
/* eslint-disable no-new */
new Vue({
  template: '<App/>',
  components: { App },
  router: router
}).$mount('#app');

router.push('/goods');


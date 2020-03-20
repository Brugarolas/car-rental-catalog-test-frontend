import Vue from 'vue';
import VueRouter from 'vue-router';
import VueShared from '@/js/utils/vue-shared';
import VueFilters from '@/js/utils/vue-filters';
import App from '@/js/App';
import { BASE_URL } from '@/js/constants';
import store from '@/js/store';
import routes from '@/js/routes';

Vue.use(VueRouter);
Vue.use(VueShared);
Vue.use(VueFilters);

const router = new VueRouter({ routes, base: BASE_URL, mode: 'history' });

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});

export default app;

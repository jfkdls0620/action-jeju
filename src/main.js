import Vue from 'vue'
import App from './App.vue'
import { router } from './routes/index'
import axios from 'axios'

import '@/assets/css/general.css'

//Validation 체크를 위한 import
import Vuelidate from "vuelidate/src";

//alert,
import VueSimpleAlert from "vue-simple-alert";

//naver map
import naver from 'vue-naver-maps';

import store from "./store/index";

import {VueHammer} from "vue2-hammer"

//import moment from 'vue-moment/dist/vue-moment'

import moment from 'moment';
import 'moment/locale/ko';

Vue.use(Vuelidate);
Vue.use(VueSimpleAlert);
Vue.use(VueHammer);
Vue.use(require('vue-moment'), {
  moment
})

Vue.use(naver,{
  clientID: 'lv550rkczj',
  useGovAPI: false,
})

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

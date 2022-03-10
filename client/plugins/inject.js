import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
import vuescroll from 'vuescroll';
import 'animate.css';

Vue.component('multiselect', Multiselect)
Vue.component('Modal', VueModal)
Vue.use(vuescroll)

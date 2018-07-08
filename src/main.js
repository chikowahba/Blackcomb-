import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router';
import { routes } from './routes.js';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});


// export let axios =  axios.create({
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + localStorage.token
//   }
// });
// export const eventBus = new Vue({
//     methods: {
//         changeAge(age) {
//             this.$emit('ageWasEdited', age);
//         }
//     }
// });

window.App = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

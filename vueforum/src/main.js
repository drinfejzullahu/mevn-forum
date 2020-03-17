import Vue from "vue";
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import firebase from "firebase/app";

import router from "./router";
import store from "./store";

import axios from "axios";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyB68fFl6DFuOuZTEjpVL08D5gRTirZ0TzY",
  authDomain: "vueforum-app.firebaseapp.com",
  databaseURL: "https://vueforum-app.firebaseio.com",
  projectId: "vueforum-app",
  storageBucket: "vueforum-app.appspot.com",
  messagingSenderId: "422689475769",
  appId: "1:422689475769:web:67a129037ec98368d5df68",
  measurementId: "G-G8T143BMHR"
};

firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

// let app;

// firebase.auth().onAuthStatusChanged(user => {
//   console.log(user);
//   if (!app) {
//     app = new Vue({
//       store,
//       router,
//       render: h => h(App)
//     }).$mount("#app");
//   }
// });

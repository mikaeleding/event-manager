import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import { store } from "./store"
import DateFilter from "./date"
import * as firebase from 'firebase'

Vue.config.productionTip = false;

Vue.filter('date', DateFilter)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC6DqMlGdvkcTZ-qFOdaSiexjDnkBeaBpQ',
      authDomain: 'event-organizer-4c625.firebaseapp.com',
      databaseURL: 'https://event-organizer-4c625.firebaseio.com',
      projectId: 'event-organizer-4c625',
      storageBucket: 'event-organizer-4c625.appspot.com',
      messagingSenderId: '703527438227',
      appId: '1:703527438227:web:47d82fa1e4a86b61'
    })
  }
}).$mount("#app");

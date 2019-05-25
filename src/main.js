import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import { store } from "./store"
import DateFilter from "./date"
import * as firebase from 'firebase'
import AlertComp from './components/Shared/Alert.vue'
import EditMeetupDetails from "./components/Meetup/EditMeetupDetailsDialog.vue"
import RegisterDialog from './components/Meetup/RegisterDialog.vue'
Vue.config.productionTip = false;

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComp)
Vue.component('app-edit-details', EditMeetupDetails)
Vue.component('app-meetup-register', RegisterDialog)

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
      storageBucket: 'gs://event-organizer-4c625.appspot.com',
      messagingSenderId: '703527438227',
      appId: '1:703527438227:web:47d82fa1e4a86b61'
    })
    //get users from firebase
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const userData = {
          id: user.uid,
          email: user.email,
          registeredMeetups: [],
          fbKeys: {}
        }
        console.log(userData.id)
        store.dispatch('setUser', userData)
      } else {
        console.log('No user is signed in.')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount("#app");

import Vue from "vue"
import Vuelidate from "vuelidate"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import dateFilter from "@/filter/date.filter"
import currencyFilter from "@/filter/currency.filter"
import messagePlugin from "@/utils/message.plugin"
import Loader from "@/components/app/Loader"
import "./registerServiceWorker"
import "materialize-css/dist/js/materialize.min"

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

Vue.use(messagePlugin)
Vue.config.productionTip = false
Vue.filter("date", dateFilter)
Vue.filter("currency", currencyFilter)
Vue.use(Vuelidate)
Vue.component("Loader", Loader)

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDO80oeGtic2i_eWbmBUMn2CqrdBSxrgvA",
  authDomain: "vue-finance-34d79.firebaseapp.com",
  databaseURL: "https://vue-finance-34d79.firebaseio.com",
  projectId: "vue-finance-34d79",
  storageBucket: "vue-finance-34d79.appspot.com",
  messagingSenderId: "189392031748",
  appId: "1:189392031748:web:394e9501cbc04b8a6ea551",
  measurementId: "G-66XJVQLBVR"
})
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app")
  }
})
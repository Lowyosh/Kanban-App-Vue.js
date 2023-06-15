import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

export default {
    data() {
      return {
        objectClass: true
      };
    },
    methods: {
      toggleObject() {
        this.objectClass = !this.objectClass;
      }
    }
  };
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios';
import router from './routes/router.js';

axios.defaults.baseURL = 'https://api.spotify.com/v1';

createApp(App).use(router).mount('#app')

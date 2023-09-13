import './assets/main.css'
import './assets/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios"


function AxiosPlugin() {
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_APP_GATEWAY_URL
    })
    axiosInstance.interceptors.request.use(function (config) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        config.headers["Authorization"] = 'Bearer ' + import.meta.env.VITE_APP_STRAPI_TOKEN;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    return {
        axios : axiosInstance
    }
}
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(AxiosPlugin)
app.use(pinia)
app.use(router)

app.mount('#app')

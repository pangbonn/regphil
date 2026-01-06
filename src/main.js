import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// ล้าง service worker เก่าถ้ามี
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}

createApp(App).mount('#app')


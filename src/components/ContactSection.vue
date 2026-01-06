<template>
  <section class="py-20 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white flex items-center">
        <span class="w-2 h-10 bg-primary rounded-full mr-4"></span>
        {{ t('contactTitle') }}
      </h2>
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('contactDepartment') }}</h3>
            <h4 class="text-lg font-medium text-primary mb-4">{{ t('contactFaculty') }}</h4>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t('contactAddress') }}
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-icons-round">phone</span>
              </div>
              <div>
                <span class="block text-sm font-bold text-gray-900 dark:text-white">{{ t('phone') }}</span>
                <a href="tel:0983875997" class="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">098-387-5997</a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-icons-round">email</span>
              </div>
              <div>
                <span class="block text-sm font-bold text-gray-900 dark:text-white">{{ t('email') }}</span>
                <a href="mailto:sampapi1974@gmail.com" class="text-gray-600 dark:text-gray-400 text-sm hover:text-primary transition-colors">sampapi1974@gmail.com</a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-icons-round">language</span>
              </div>
              <div>
                <span class="block text-sm font-bold text-gray-900 dark:text-white">{{ t('website') }}</span>
                <a href="https://regphil.mcu.ac.th" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 text-sm hover:text-primary transition-colors">regphil.mcu.ac.th</a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-icons-round">share</span>
              </div>
              <div class="flex gap-2 pt-1">
                <a 
                  href="https://web.facebook.com/philosopymcu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-gray-500 hover:text-[#1877F2] transition-colors"
                  title="Facebook"
                >
                  <i class="material-icons-round">facebook</i>
                </a>
                <a 
                  href="https://www.youtube.com/@%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%A1%E0%B8%88%E0%B8%A3%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%81%E0%B8%A5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-gray-500 hover:text-[#FF0000] transition-colors"
                  title="YouTube"
                >
                  <i class="material-icons-round">smart_display</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg relative h-[400px] md:h-[500px]">
          <div 
            ref="mapContainer" 
            class="w-full h-full rounded-2xl"
            id="google-map"
          ></div>
          <!-- Map Info Overlay with Image -->
          <div class="absolute top-4 left-4 right-4 md:right-auto md:w-80 bg-white dark:bg-surface-dark rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <div class="mb-3">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-1">{{ t('contactDepartment') }}</h3>
              <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ t('contactAddress') }}
              </p>
            </div>
            <div class="rounded-lg overflow-hidden mb-3">
              <img 
                src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzlKg1aG-vXW_MNTmG5fGZOI3OOlLdFt5ttE3MW4MlrbukLmavDqfgoXwobjrnOMQQdDAJtpDkY8NivMA7zzXb7HEcZGs0BFuY2O0m1OLaGRLOFiwVDr3fy1fm8pq_p6knK0Slkzw=w408-h276-k-no" 
                :alt="t('contactDepartment')"
                class="w-full h-auto object-cover"
              />
            </div>
            <a 
              :href="googleMapsUrl" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-full bg-primary text-gray-900 text-xs py-2 px-4 rounded-lg font-bold hover:bg-primary-darker hover:text-white transition-all text-center flex items-center justify-center gap-2"
            >
              <span class="material-icons-round text-base">map</span>
              {{ t('openInMaps') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const mapContainer = ref(null)

// พิกัดที่กำหนด
const lat = 14.191392
const lng = 100.634531

// Google Maps URL สำหรับเปิดใน Google Maps
const googleMapsUrl = computed(() => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
})

onMounted(() => {
  // รอให้ Google Maps API โหลดเสร็จ
  const initMap = () => {
    if (window.google && window.google.maps && mapContainer.value) {
      const location = { lat, lng }
      
      const map = new window.google.maps.Map(mapContainer.value, {
        center: location,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        disableDefaultUI: true,
        gestureHandling: 'cooperative'
      })

      // เพิ่ม marker
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: t('contactDepartment') + ' ' + t('contactFaculty'),
        animation: window.google.maps.Animation.DROP
      })
    }
  }

  // ตรวจสอบว่า Google Maps API โหลดแล้วหรือยัง
  if (window.google && window.google.maps) {
    initMap()
  } else {
    // รอให้ Google Maps API โหลดเสร็จ
    const checkGoogleMaps = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(checkGoogleMaps)
        initMap()
      }
    }, 100)
  }
})
</script>


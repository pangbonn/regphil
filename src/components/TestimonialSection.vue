<template>
  <section class="bg-gray-900 py-16 text-center relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    <div class="relative z-10 max-w-4xl mx-auto px-4">
      <!-- Slider Container -->
      <div class="relative">
        <!-- Testimonials -->
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="min-w-full px-4"
            >
              <div class="inline-block p-1 rounded-full bg-gradient-to-tr from-primary to-purple-500 mb-6">
                <img 
                  :alt="testimonial.author" 
                  class="w-20 h-20 rounded-full border-4 border-gray-900 object-cover" 
                  :src="testimonial.image"
                />
              </div>
              <p class="text-2xl md:text-3xl text-white font-display font-light leading-relaxed mb-6">
                "{{ testimonial.quote }}"
              </p>
              <div class="text-primary font-medium">
                {{ testimonial.author }}
                <span class="block text-gray-500 text-sm mt-1">{{ testimonial.role }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button 
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          aria-label="Previous"
        >
          <span class="material-icons-round">chevron_left</span>
        </button>
        <button 
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          aria-label="Next"
        >
          <span class="material-icons-round">chevron_right</span>
        </button>

        <!-- Dots Indicator -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-2 h-2 rounded-full transition-all',
              currentIndex === index 
                ? 'bg-primary w-8' 
                : 'bg-white/30 hover:bg-white/50'
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, currentLang } = useI18n()
const currentIndex = ref(0)

const testimonials = computed(() => {
  const th = [
    {
      quote: 'การศึกษาศาสนาเปรียบเทียบเปิดโลกทัศน์ให้กว้างขวาง ทำให้เข้าใจความแตกต่างและอยู่ร่วมกันอย่างมีความสุข',
      author: 'ดร.สมชาย ใจดี',
      role: 'ศิษย์เก่า ภาควิชาศาสนาและปรัชญา',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53EfmTe_aKbCQZi3OqD0r6wHAdYGnX7KuI7pe9ibZlgEmVsE3u6DQOn-j4P6Y5Lai_7NnCzntPm-_SgRkNq8RYdH2QJyZ6iNb8mdlktiemrfpFqlrqaCn4OytBZ-fn8cZddhEA2cvKKpYyS4LsW2hv7cs9iHDbCiG3VLeV4NP_ubZ5T4yDv0r8inwgj-1py-PA_05bMi64XaKJBBFviAdo4Lgs5YVQyfVDjhz7jtJ6b8LqIQsem23igvg4l8CbH7Slg0FgJyPBocD'
    },
    {
      quote: 'หลักสูตรนี้ช่วยให้ฉันเข้าใจศาสนาต่างๆ อย่างลึกซึ้ง และสามารถนำไปประยุกต์ใช้ในงานวิจัยได้เป็นอย่างดี',
      author: 'ดร.สมหญิง วิไล',
      role: 'อาจารย์ประจำภาควิชา',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53EfmTe_aKbCQZi3OqD0r6wHAdYGnX7KuI7pe9ibZlgEmVsE3u6DQOn-j4P6Y5Lai_7NnCzntPm-_SgRkNq8RYdH2QJyZ6iNb8mdlktiemrfpFqlrqaCn4OytBZ-fn8cZddhEA2cvKKpYyS4LsW2hv7cs9iHDbCiG3VLeV4NP_ubZ5T4yDv0r8inwgj-1py-PA_05bMi64XaKJBBFviAdo4Lgs5YVQyfVDjhz7jtJ6b8LqIQsem23igvg4l8CbH7Slg0FgJyPBocD'
    },
    {
      quote: 'การเรียนที่นี่ไม่เพียงแต่ให้ความรู้ แต่ยังปลูกฝังจิตวิญญาณแห่งการเข้าใจและเคารพความแตกต่าง',
      author: 'ดร.วิชัย สุขใจ',
      role: 'ศิษย์เก่า ปริญญาเอก',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53EfmTe_aKbCQZi3OqD0r6wHAdYGnX7KuI7pe9ibZlgEmVsE3u6DQOn-j4P6Y5Lai_7NnCzntPm-_SgRkNq8RYdH2QJyZ6iNb8mdlktiemrfpFqlrqaCn4OytBZ-fn8cZddhEA2cvKKpYyS4LsW2hv7cs9iHDbCiG3VLeV4NP_ubZ5T4yDv0r8inwgj-1py-PA_05bMi64XaKJBBFviAdo4Lgs5YVQyfVDjhz7jtJ6b8LqIQsem23igvg4l8CbH7Slg0FgJyPBocD'
    }
  ]

  const en = [
    {
      quote: 'Comparative religious studies opens up a broad perspective, enabling understanding of differences and harmonious coexistence',
      author: 'Dr. Somchai Jaidee',
      role: 'Alumni, Department of Religion and Philosophy',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53EfmTe_aKbCQZi3OqD0r6wHAdYGnX7KuI7pe9ibZlgEmVsE3u6DQOn-j4P6Y5Lai_7NnCzntPm-_SgRkNq8RYdH2QJyZ6iNb8mdlktiemrfpFqlrqaCn4OytBZ-fn8cZddhEA2cvKKpYyS4LsW2hv7cs9iHDbCiG3VLeV4NP_ubZ5T4yDv0r8inwgj-1py-PA_05bMi64XaKJBBFviAdo4Lgs5YVQyfVDjhz7jtJ6b8LqIQsem23igvg4l8CbH7Slg0FgJyPBocD'
    },
    {
      quote: 'This program helped me understand different religions deeply and apply this knowledge effectively in my research',
      author: 'Dr. Somying Wilai',
      role: 'Faculty Member',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53EfmTe_aKbCQZi3OqD0r6wHAdYGnX7KuI7pe9ibZlgEmVsE3u6DQOn-j4P6Y5Lai_7NnCzntPm-_SgRkNq8RYdH2QJyZ6iNb8mdlktiemrfpFqlrqaCn4OytBZ-fn8cZddhEA2cvKKpYyS4LsW2hv7cs9iHDbCiG3VLeV4NP_ubZ5T4yDv0r8inwgj-1py-PA_05bMi64XaKJBBFviAdo4Lgs5YVQyfVDjhz7jtJ6b8LqIQsem23igvg4l8CbH7Slg0FgJyPBocD'
    },
    {
      quote: 'Studying here not only provides knowledge but also cultivates the spirit of understanding and respecting differences',
      author: 'Dr. Wichai Sukjai',
      role: 'Alumni, Ph.D.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53EfmTe_aKbCQZi3OqD0r6wHAdYGnX7KuI7pe9ibZlgEmVsE3u6DQOn-j4P6Y5Lai_7NnCzntPm-_SgRkNq8RYdH2QJyZ6iNb8mdlktiemrfpFqlrqaCn4OytBZ-fn8cZddhEA2cvKKpYyS4LsW2hv7cs9iHDbCiG3VLeV4NP_ubZ5T4yDv0r8inwgj-1py-PA_05bMi64XaKJBBFviAdo4Lgs5YVQyfVDjhz7jtJ6b8LqIQsem23igvg4l8CbH7Slg0FgJyPBocD'
    }
  ]

  return currentLang.value === 'th' ? th : en
})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? testimonials.value.length - 1 : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

let autoPlayInterval = null

onMounted(() => {
  // Auto-play every 5 seconds
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
})

onUnmounted(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
})
</script>


<template>
  <div class="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 min-h-screen">
    <!-- Staff Page -->
    <Staff v-if="currentPage === 'staff'" />
    
    <!-- Calendar Page -->
    <Calendar v-else-if="currentPage === 'calendar'" />
    
    <!-- News Page -->
    <News v-else-if="currentPage === 'news'" />
    
    <!-- News Detail Page -->
    <NewsDetail v-else-if="currentPage === 'news-detail'" />
    
    <!-- Home Page -->
    <template v-else>
      <Navbar />
      <HeroHeader />
      <AboutSection />
      <ProgramsSection />
      <HomeNewsSection />
      <ContactSection />
      <TestimonialSection />
      <!-- <CTASection /> -->
      <Footer />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroHeader from './components/HeroHeader.vue'
import AboutSection from './components/AboutSection.vue'
import ProgramsSection from './components/ProgramsSection.vue'
import HomeNewsSection from './components/HomeNewsSection.vue'
import ContactSection from './components/ContactSection.vue'
import TestimonialSection from './components/TestimonialSection.vue'
import CTASection from './components/CTASection.vue'
import Footer from './components/Footer.vue'
import Staff from './pages/Staff.vue'
import Calendar from './pages/Calendar.vue'
import News from './pages/News.vue'
import NewsDetail from './pages/NewsDetail.vue'

const currentPage = ref('home')

const updatePage = () => {
  const hash = window.location.hash
  if (hash === '#staff') {
    currentPage.value = 'staff'
  } else if (hash === '#calendar' || hash === '#/calendar') {
    currentPage.value = 'calendar'
  } else if (hash === '#news' || hash === '#/news') {
    currentPage.value = 'news'
  } else if (hash === '#news-detail' || hash === '#/news-detail' || hash.startsWith('#news/')) {
    currentPage.value = 'news-detail'
  } else {
    currentPage.value = 'home'
  }
}

onMounted(() => {
  updatePage()
  window.addEventListener('hashchange', updatePage)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updatePage)
})
</script>


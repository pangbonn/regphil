<template>
  <div class="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 min-h-screen">
    <Navbar />
    <CalendarSection />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import CalendarSection from '../components/CalendarSection.vue'
import Footer from '../components/Footer.vue'
</script>


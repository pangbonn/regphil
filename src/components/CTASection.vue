<template>
  <section class="relative py-24">
    <img 
      alt="Students" 
      class="absolute inset-0 w-full h-full object-cover" 
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK4GVlOTt0D6XUuviS5M2Sf49uIVS9qeVXLYVwOR7FRP0C52XEDMFz8fqpgvzU67ZARYmRFB1ubboNcy6NxrWvjqnKMPEWYrKxnki4SXfHJkg5DYhwnynb1rl_NQfLV_eW5IHGtW6ksPhlrFT--CaBTrUarv--SpEqDzoaJmlj4MCgNXyrVuvf1AU7Dh-KN415ldDEJXCh3CNMATlCNG6S5vYjho29v2xNQ-jFjG4_pkWr_Ng5fdLbTCE8gtU5wvdHB8J7YmhzmHyf"
    />
    <div class="absolute inset-0 bg-gray-900/70"></div>
    <div class="relative z-10 max-w-3xl mx-auto px-4 text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
        {{ t('ctaTitle') }} <span class="text-primary">{{ t('ctaFamily') }}</span>
      </h2>
      <p class="text-xl text-gray-300 mb-10 font-light">{{ t('ctaDescription') }}</p>
      <div class="relative max-w-xl mx-auto">
        <input 
          v-model="searchQuery"
          class="w-full pl-6 pr-14 py-4 rounded-full bg-white/90 backdrop-blur text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-2xl transition-all" 
          :placeholder="t('ctaPlaceholder')" 
          type="text"
          @keyup.enter="handleSearch"
        />
        <button 
          class="absolute right-2 top-2 bottom-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-darker transition-colors"
          @click="handleSearch"
        >
          <span class="material-icons-round">search</span>
        </button>
      </div>
      <div class="mt-8 flex justify-center gap-6 text-sm text-gray-400 font-medium">
        <a class="hover:text-primary transition-colors" href="#">{{ t('allPrograms') }}</a>
        <a class="hover:text-primary transition-colors" href="#">{{ t('apply') }}</a>
        <a class="hover:text-primary transition-colors" href="#">{{ t('scholarships') }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // Add search functionality here
  }
}
</script>


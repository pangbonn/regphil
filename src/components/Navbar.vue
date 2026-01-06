<template>
  <nav class="sticky top-0 z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex items-center gap-3">
          <div class="w-16 h-16 flex items-center justify-center">
            <img 
              src="/imgs/logo_web.png" 
              alt="MCU Logo" 
              class="w-full h-full object-contain"
            />
          </div>
          <div class="flex flex-col">
            <span class="font-display font-bold text-xl text-gray-900 dark:text-white leading-none">MCU</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">Dept. of Religion & Philosophy</span>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-6">
          <div class="flex space-x-6">
            <a class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#home">{{ t('home') }}</a>
            <!-- <a class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">{{ t('about') }}</a>
            <a class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">{{ t('programs') }}</a> -->
            <a class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#news">{{ t('news') }}</a>
            <a class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#calendar">{{ t('calendar') }}</a>
            <a class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#staff">{{ t('staff') }}</a>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full p-1">
              <button 
                @click="setLang('th')"
                :class="['px-3 py-1 rounded-full text-xs font-bold transition-all', isThai ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary']"
              >
                TH
              </button>
              <button 
                @click="setLang('en')"
                :class="['px-3 py-1 rounded-full text-xs font-bold transition-all', isEnglish ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary']"
              >
                EN
              </button>
            </div>
            <!-- <a class="px-5 py-2 bg-primary text-gray-900 font-bold rounded-full hover:bg-primary-darker hover:text-white transition-all shadow-md whitespace-nowrap" href="#">
              {{ t('contact') }}
            </a> -->
          </div>
        </div>
        <div class="md:hidden flex items-center">
          <button 
            @click="toggleMenu"
            class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
          >
            <span class="material-icons-round text-3xl">{{ isMenuOpen ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>
      <!-- Mobile Menu -->
      <div 
        v-if="isMenuOpen"
        class="md:hidden border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark"
      >
        <div class="px-4 pt-2 pb-4 space-y-3">
          <a 
            @click="closeMenu"
            class="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium py-2" 
            href="#home"
          >
            {{ t('home') }}
          </a>
          <a 
            @click="closeMenu"
            class="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium py-2" 
            href="#news"
          >
            {{ t('news') }}
          </a>
          <a 
            @click="closeMenu"
            class="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium py-2" 
            href="#calendar"
          >
            {{ t('calendar') }}
          </a>
          <a 
            @click="closeMenu"
            class="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium py-2" 
            href="#staff"
          >
            {{ t('staff') }}
          </a>
          <div class="pt-2 border-t border-border-light dark:border-border-dark">
            <div class="flex items-center bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-full p-1">
              <button 
                @click="setLang('th')"
                :class="['px-3 py-1 rounded-full text-xs font-bold transition-all', isThai ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary']"
              >
                TH
              </button>
              <button 
                @click="setLang('en')"
                :class="['px-3 py-1 rounded-full text-xs font-bold transition-all', isEnglish ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary']"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, setLang, isThai, isEnglish } = useI18n()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>


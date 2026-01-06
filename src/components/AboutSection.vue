<template>
  <section class="py-20 bg-background-light dark:bg-background-dark">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white relative inline-block">
        {{ t('aboutTitle') }}
        <div class="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full w-1/2 mx-auto"></div>
      </h2>
      <div class="mt-12 flex flex-col items-center">
        <div class="w-48 h-48 mb-8 relative">
          <img 
            alt="MCU Logo" 
            class="w-full h-full object-contain drop-shadow-lg hover:scale-105 transition-all duration-500" 
            src="/imgs/logo_web.png"
          />
        </div>
        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
          {{ t('aboutDescription') }}
        </p>
        <p class="mt-4 text-sm text-gray-400 dark:text-gray-500 italic">
          {{ t('aboutNote') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>


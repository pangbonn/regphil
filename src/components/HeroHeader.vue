<template>
  <header class="relative h-[500px] w-full overflow-hidden">
    <img 
      alt="University Building" 
      class="absolute inset-0 w-full h-full object-cover" 
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy6eaHr1MykIwiwXtj7VwR4yuETG_tbZBqtSx_DrPAhCfSyvui1shp4SDv9HvZ0VZ8XF_YwRe9XftMxp0YjRywqcZgUM4o2gx-mKwQ9QgI3yRyMOifR3GSLw9Z-AQ9KplEHuMXCiElYNHrcA4gQjTsGYaNdowM2FmCq377UwiFbxeLcQamh83uIf6QEr-mV8p5TXC1extrmzDPoOWdJsR5XtVSC_0ykHg0_xkHxU1Qwpe2XYSk0oSrQydYjx9OQxt2AiLHQxPTWPp9"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
    <div class="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
      <span class="text-primary font-display font-medium tracking-widest uppercase mb-2">{{ t('faculty') }}</span>
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
        {{ t('department') }}<br/>
        <span class="text-primary text-2xl md:text-4xl mt-2 block">{{ t('university') }}</span>
      </h1>
      <p class="text-xl text-gray-200 font-light max-w-2xl border-l-4 border-primary pl-4">
        {{ t('tagline') }}
      </p>
    </div>
  </header>
  <div class="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
    <div class="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
      <span>{{ t('breadcrumbHome') }}</span>
      <span class="mx-2">/</span>
      <span>{{ t('breadcrumbAbout') }}</span>
      <span class="mx-2">/</span>
      <span class="text-primary font-medium">{{ t('breadcrumbCurrent') }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>


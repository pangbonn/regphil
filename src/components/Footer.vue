<template>
  <footer class="bg-surface-dark text-white pt-16 pb-8 border-t-4 border-primary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 class="font-bold text-lg mb-4 text-primary">{{ t('education') }}</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerPrograms') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerInternational') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerPractice') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerAdmission') }}</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-4 text-primary">{{ t('research') }}</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerArticles') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerJournal') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerLibrary') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerAsean') }}</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-4 text-primary">{{ t('service') }}</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerCommunity') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerDharma') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerCamp') }}</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-4 text-primary">{{ t('aboutUs') }}</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerHistory') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerCalendar') }}</a></li>
            <li><a class="hover:text-white transition-colors" href="#">{{ t('footerStaff') }}</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 flex items-center justify-center">
            <img 
              src="/imgs/logo_web.png" 
              alt="MCU Logo" 
              class="w-full h-full object-contain"
            />
          </div>
          <span class="text-sm text-gray-400">{{ t('footerCopyright') }}</span>
        </div>
        <div class="flex space-x-4">
          <a class="text-gray-400 hover:text-white" href="#">
            <i class="material-icons-round">facebook</i>
          </a>
          <a class="text-gray-400 hover:text-white" href="#">
            <i class="material-icons-round">smart_display</i>
          </a>
          <a class="text-gray-400 hover:text-white" href="#">
            <i class="material-icons-round">podcasts</i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>


<template>
  <section class="py-20 bg-surface-light dark:bg-surface-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white flex items-center">
        <span class="w-2 h-10 bg-primary rounded-full mr-4"></span>
        {{ t('programsTitle') }}
      </h2>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/4 space-y-2">
          <button 
            :class="[
              'w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex justify-between items-center',
              activeTab === 'fields' 
                ? 'bg-primary text-gray-900 shadow-lg transform scale-105' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
            @click="activeTab = 'fields'"
          >
            {{ t('fieldsTitle') }}
            <span class="material-icons-round" v-if="activeTab === 'fields'">arrow_forward_ios</span>
          </button>
          <button 
            :class="[
              'w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex justify-between items-center',
              activeTab === 'bachelor' 
                ? 'bg-primary text-gray-900 shadow-lg transform scale-105' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
            @click="activeTab = 'bachelor'"
          >
            {{ t('bachelor') }}
            <span class="material-icons-round" v-if="activeTab === 'bachelor'">arrow_forward_ios</span>
          </button>
          <button 
            :class="[
              'w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex justify-between items-center',
              activeTab === 'master' 
                ? 'bg-primary text-gray-900 shadow-lg transform scale-105' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
            @click="activeTab = 'master'"
          >
            {{ t('master') }}
            <span class="material-icons-round" v-if="activeTab === 'master'">arrow_forward_ios</span>
          </button>
          <button 
            :class="[
              'w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex justify-between items-center',
              activeTab === 'certificate' 
                ? 'bg-primary text-gray-900 shadow-lg transform scale-105' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
            @click="activeTab = 'certificate'"
          >
            {{ t('certificate') }}
            <span class="material-icons-round" v-if="activeTab === 'certificate'">arrow_forward_ios</span>
          </button>
          <button 
            :class="[
              'w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex justify-between items-center',
              activeTab === 'doctorate' 
                ? 'bg-primary text-gray-900 shadow-lg transform scale-105' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
            @click="activeTab = 'doctorate'"
          >
            {{ t('doctorate') }}
            <span class="material-icons-round" v-if="activeTab === 'doctorate'">arrow_forward_ios</span>
          </button>
        </div>
        <div class="w-full md:w-3/4">
          <div class="bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-border-light dark:border-border-dark shadow-sm min-h-[400px]">
            <!-- Fields Content -->
            <div v-if="activeTab === 'fields'">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {{ t('fieldsSubtitle') }} <span class="text-primary text-lg font-normal">(Dept. of Religion & Philosophy)</span>
              </h3>
              <p class="mb-6 font-semibold text-gray-700 dark:text-gray-300">{{ t('fieldsDescription') }}</p>
              <ul class="grid md:grid-cols-2 gap-4">
                <li 
                  v-for="(field, index) in fields" 
                  :key="index"
                  class="flex items-start p-3 hover:bg-white dark:hover:bg-surface-dark rounded-lg transition-colors"
                >
                  <span class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mr-3">
                    {{ index + 1 }}
                  </span>
                  <span class="text-gray-600 dark:text-gray-300">
                    {{ field.name }} <br/>
                    <span class="text-xs text-gray-400">({{ field.english }})</span>
                  </span>
                </li>
              </ul>
              
            </div>

            <!-- Bachelor Content -->
            <div v-else-if="activeTab === 'bachelor'">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {{ t('bachelor') }} <span class="text-primary text-lg font-normal">(B.A. in Buddhism)</span>
              </h3>
              <p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ t('bachelorDescription') }}
              </p>
              <div class="space-y-4">
                <div class="bg-white dark:bg-surface-dark p-4 rounded-lg">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t('duration') }}</h4>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('bachelorDuration') }}</p>
                </div>
                <div class="bg-white dark:bg-surface-dark p-4 rounded-lg">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t('credits') }}</h4>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('bachelorCredits') }}</p>
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                <button 
                  @click="downloadDocument('bachelor')"
                  class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-darker text-gray-900 hover:text-white font-bold rounded-full transition-all shadow-md"
                >
                  <span class="material-icons-round">download</span>
                  {{ t('downloadDocument') }}
                </button>
              </div>
            </div>

            <!-- Master Content -->
            <div v-else-if="activeTab === 'master'">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {{ t('master') }} <span class="text-primary text-lg font-normal">(M.A. in Buddhism)</span>
              </h3>
              <p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ t('masterDescription') }}
              </p>
              <div class="space-y-4">
                <div class="bg-white dark:bg-surface-dark p-4 rounded-lg">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t('duration') }}</h4>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('masterDuration') }}</p>
                </div>
                <div class="bg-white dark:bg-surface-dark p-4 rounded-lg">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t('credits') }}</h4>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('masterCredits') }}</p>
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                <button 
                  @click="downloadDocument('master')"
                  class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-darker text-gray-900 hover:text-white font-bold rounded-full transition-all shadow-md"
                >
                  <span class="material-icons-round">download</span>
                  {{ t('downloadDocument') }}
                </button>
              </div>
            </div>

            <!-- Certificate Content -->
            <div v-else-if="activeTab === 'certificate'">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {{ t('certificate') }} <span class="text-primary text-lg font-normal">(Certificate Program)</span>
              </h3>
              <p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ t('certificateDescription') }}
              </p>
              <div class="space-y-4">
                <div class="bg-white dark:bg-surface-dark p-4 rounded-lg">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t('duration') }}</h4>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('certificateDuration') }}</p>
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                <button 
                  @click="downloadDocument('certificate')"
                  class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-darker text-gray-900 hover:text-white font-bold rounded-full transition-all shadow-md"
                >
                  <span class="material-icons-round">download</span>
                  {{ t('downloadDocument') }}
                </button>
              </div>
            </div>

            <!-- Doctorate Content -->
            <div v-else-if="activeTab === 'doctorate'">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {{ t('doctorate') }} <span class="text-primary text-lg font-normal">(Ph.D. in Buddhism)</span>
              </h3>
              <p class="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ t('doctorateDescription') }}
              </p>
              <div class="space-y-4">
                <div class="bg-white dark:bg-surface-dark p-4 rounded-lg">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t('duration') }}</h4>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('doctorateDuration') }}</p>
                </div>
                <div class="bg-white dark:bg-surface-dark p-4 rounded-lg">
                  <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ t('credits') }}</h4>
                  <p class="text-gray-600 dark:text-gray-300">{{ t('doctorateCredits') }}</p>
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                <button 
                  @click="downloadDocument('doctorate')"
                  class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-darker text-gray-900 hover:text-white font-bold rounded-full transition-all shadow-md"
                >
                  <span class="material-icons-round">download</span>
                  {{ t('downloadDocument') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const activeTab = ref('fields')

const downloadDocument = (type) => {
  // กำหนด URL ของเอกสารตามประเภท
  const documentUrls = {
    fields: '',
    bachelor: 'https://acd.mcu.ac.th/wp-content/uploads/2023/06/65-%E0%B8%A1%E0%B8%84%E0%B8%AD2-%E0%B8%9E%E0%B8%98.%E0%B8%9A.%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%8D%E0%B8%B2-%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%9E%E0%B8%97%E0%B8%98%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C.pdf',
    master: 'https://acd.mcu.ac.th/wp-content/uploads/2024/01/65-%E0%B8%A1%E0%B8%84%E0%B8%AD2-%E0%B8%9E%E0%B8%98.%E0%B8%A1.%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B9%80%E0%B8%9B%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%9A%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B8%A2%E0%B8%9A-%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%9E%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C.pdf',
    certificate: 'https://drive.google.com/file/d/1Erys36diVJuYm9JC-8sR64Eab3hevKLu/view',
    doctorate: 'https://drive.google.com/file/d/1Erys36diVJuYm9JC-8sR64Eab3hevKLu/view'
  }
  
  const url = documentUrls[type] || '/documents/default.pdf'
  
  // สร้าง link element เพื่อดาวน์โหลด
  const link = document.createElement('a')
  link.href = url
  link.download = `${type}-program.pdf`
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // หรือใช้ window.open สำหรับเปิดในแท็บใหม่
  // window.open(url, '_blank')
}

const fields = computed(() => [
  { name: t('field1'), english: 'Comparative Religion' },
  { name: t('field2'), english: 'Eastern and Western Philosophy' },
  { name: t('field3'), english: 'Buddhism and Modern Sciences' },
  { name: t('field4'), english: 'Ethics and Peace Studies' },
  { name: t('field5'), english: 'Sociology of Religion' },
  { name: t('field6'), english: 'Inter-religious Dialogue' },
])
</script>


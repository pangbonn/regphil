<template>
  <header class="relative bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-12 overflow-hidden">
    <div class="absolute inset-0 bg-primary/5 opacity-50 dark:opacity-10"></div>
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
    <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('newsTitle') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
          {{ t('newsDescription') }}
        </p>
      </div>
    </div>
  </header>
  <div class="bg-white/50 dark:bg-surface-dark/50 border-b border-border-light dark:border-border-dark backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
      <a class="hover:text-primary transition-colors" href="#home">{{ t('breadcrumbHome') }}</a>
      <span class="mx-2">/</span>
      <span class="text-primary font-medium">{{ t('news') }}</span>
    </div>
  </div>
  <div class="bg-background-light dark:bg-background-dark sticky top-20 z-40 border-b border-border-light dark:border-border-dark backdrop-blur-sm bg-opacity-95">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div class="flex items-center overflow-x-auto w-full lg:w-auto no-scrollbar gap-2">
          <button
            @click="activeCategory = 'all'"
            :class="[
              'whitespace-nowrap px-4 py-2 rounded-full font-bold shadow-sm transition-all text-sm',
              activeCategory === 'all'
                ? 'bg-primary text-gray-900 ring-2 ring-primary/50'
                : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 border border-gray-200 dark:border-gray-700'
            ]"
          >
            {{ t('all') }}
          </button>
          <button
            @click="activeCategory = 'announcement'"
            :class="[
              'whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors text-sm border border-gray-200 dark:border-gray-700',
              activeCategory === 'announcement'
                ? 'bg-primary text-gray-900 ring-2 ring-primary/50'
                : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50'
            ]"
          >
            {{ t('newsCategoryAnnouncement') }}
          </button>
          <button
            @click="activeCategory = 'academic'"
            :class="[
              'whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors text-sm border border-gray-200 dark:border-gray-700',
              activeCategory === 'academic'
                ? 'bg-primary text-gray-900 ring-2 ring-primary/50'
                : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50'
            ]"
          >
            {{ t('newsCategoryAcademic') }}
          </button>
          <button
            @click="activeCategory = 'scholarship'"
            :class="[
              'whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors text-sm border border-gray-200 dark:border-gray-700',
              activeCategory === 'scholarship'
                ? 'bg-primary text-gray-900 ring-2 ring-primary/50'
                : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50'
            ]"
          >
            {{ t('newsCategoryScholarship') }}
          </button>
        </div>
        <div class="flex items-center gap-3 w-full lg:w-auto">
          <div class="relative flex-grow lg:w-64">
            <input
              v-model="searchQuery"
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent text-sm shadow-sm"
              :placeholder="t('search')"
              type="text"
            />
            <span class="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">search</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <main class="flex-grow py-12 bg-background-light dark:bg-background-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 auto-rows-fr">
        <article
          v-for="n in 6"
          :key="n"
          :class="[
            'group relative bg-surface-light dark:bg-surface-dark rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full animate-pulse',
            n === 1 ? 'lg:col-span-2 md:flex-row' : ''
          ]"
        >
          <div :class="[
            'relative overflow-hidden bg-gray-200 dark:bg-gray-700',
            n === 1 ? 'md:w-3/5 h-64 md:h-auto' : 'h-60'
          ]">
          </div>
          <div :class="[
            'p-6 flex flex-col flex-grow',
            n === 1 ? 'md:w-2/5 lg:p-8' : ''
          ]">
            <div class="flex items-center mb-4">
              <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
            <div class="space-y-3 mb-4">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div v-if="n === 1" class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
            <div class="space-y-2 mb-6">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
            <div class="mt-auto">
              <div v-if="n === 1" class="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div v-else class="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-gray-800">
                <div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      <!-- News Articles -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 auto-rows-fr">
        <article
          v-for="(article, index) in filteredNews"
          :key="index"
          :class="[
            'group relative bg-surface-light dark:bg-surface-dark rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full',
            index === 0 ? 'lg:col-span-2 md:flex-row' : ''
          ]"
        >
          <div :class="[
            'relative overflow-hidden',
            index === 0 ? 'md:w-3/5 h-64 md:h-auto' : 'h-60'
          ]">
            <img
              v-if="article.image"
              :alt="article.title"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              :src="article.image"
            />
            <div v-else class="absolute inset-0 w-full h-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              <span class="material-icons-round text-6xl text-gray-300 group-hover:scale-110 transition-transform duration-300">article</span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
            <span
              class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1"
              :class="getCategoryColorClass(article.category)"
            >
              <span class="w-2 h-2 rounded-full" :class="getCategoryDotColor(article.category)"></span>
              {{ getCategoryLabel(article.category) }}
            </span>
          </div>
          <div :class="[
            'p-6 flex flex-col flex-grow relative',
            index === 0 ? 'md:w-2/5 lg:p-8 justify-center' : 'justify-between'
          ]">
            <div class="flex items-center text-xs font-medium text-gray-400 mb-4 gap-2">
              <span class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                <span class="material-icons-round text-sm text-primary">event</span>
                {{ formatDate(article.date) }}
              </span>
            </div>
            <h3 :class="[
              'font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors',
              index === 0 ? 'text-2xl' : 'text-lg'
            ]">
              {{ article.title }}
            </h3>
            <p :class="[
              'text-gray-500 dark:text-gray-400 text-sm mb-6 font-light leading-relaxed',
              index === 0 ? 'line-clamp-3' : 'line-clamp-3'
            ]">
              {{ article.description }}
            </p>
            <div class="mt-auto">
              <a
                v-if="index === 0"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all group/btn"
                href="#news-detail"
              >
                {{ t('readMore') }}
                <span class="material-icons-round text-base transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
              </a>
              <div
                v-else
                class="pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center"
              >
                <a class="text-primary font-bold text-sm flex items-center gap-1 group/link hover:underline decoration-2 underline-offset-4" href="#news-detail">
                  {{ t('readMore') }}
                </a>
                <span class="text-xs text-gray-400 flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                  <span class="material-icons-round text-sm">visibility</span>
                  {{ formatViews(article.views) }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2">
        <button
          @click="currentPage > 1 && currentPage--"
          :disabled="currentPage === 1"
          class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <span class="material-icons-round">chevron_left</span>
        </button>
        <template v-if="totalPages <= 7">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors',
              currentPage === page
                ? 'bg-primary text-gray-900 shadow-md ring-2 ring-primary/20'
                : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            {{ page }}
          </button>
        </template>
        <template v-else>
          <button
            v-if="currentPage > 3"
            @click="currentPage = 1"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors',
              'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            1
          </button>
          <span v-if="currentPage > 4" class="w-10 text-center text-gray-400">...</span>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors',
              currentPage === page
                ? 'bg-primary text-gray-900 shadow-md ring-2 ring-primary/20'
                : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            {{ page }}
          </button>
          <span v-if="currentPage < totalPages - 3" class="w-10 text-center text-gray-400">...</span>
          <button
            v-if="currentPage < totalPages - 2"
            @click="currentPage = totalPages"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors',
              'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            {{ totalPages }}
          </button>
        </template>
        <button
          @click="currentPage < totalPages && currentPage++"
          :disabled="currentPage === totalPages"
          class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <span class="material-icons-round">chevron_right</span>
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, currentLang } = useI18n()
const activeCategory = ref('all')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 6
const isLoading = ref(true)

const news = computed(() => [
  {
    title: currentLang.value === 'th' ? 'เปิดรับสมัครนิสิตใหม่ สาขาวิชาศาสนาเปรียบเทียบ ประจำปีการศึกษา 2567' : 'New Student Admissions Open for Comparative Religion Program, Academic Year 2024',
    description: currentLang.value === 'th' ? 'ภาควิชาศาสนาและปรัชญา คณะพุทธศาสตร์ ขอเชิญผู้สนใจเข้าศึกษาต่อในระดับปริญญาตรี โท และเอก เพื่อสร้างบัณฑิตที่มีความรู้คู่คุณธรรม...' : 'The Department of Religion and Philosophy, Faculty of Buddhism, invites interested applicants to study at the bachelor\'s, master\'s, and doctoral levels to create graduates with knowledge and virtue...',
    category: 'announcement',
    date: '2024-01-12',
    views: 1250,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlkZ5Q9PUwqPCKiWQQOBXgXwczjJnjKDOK56JBInOy1CDcWvcsKm6E9bxFeqhHq8_BMjK0vcr0k-n6ctPCiOeANozPwIC5myu6XAVlm8YfLjU9INW_Oc3aJCBpPGLDnKHCuxp025JTrr1P5EFyjyC6aKUnVQpX8snK-Vv2hMqEYtBa4dtPIxsbBiy5HtXgk-h56J_vdu0pJQadQky68i33lFyJSO36SPGY4Flec8sZcDpXFRxmT8eJ8yTuJVWvVFjJXnLL1HsLjAKL'
  },
  {
    title: currentLang.value === 'th' ? 'ขอเชิญร่วมงานเสวนาวิชาการ "ศาสนากับโลกยุคดิจิทัล"' : 'Invitation to Academic Seminar "Religion and the Digital World"',
    description: currentLang.value === 'th' ? 'พบกับมุมมองจากผู้นำทางศาสนาและนักวิชาการชั้นนำระดับประเทศ ในการถกเถียงและหาแนวทางปรับตัว...' : 'Meet perspectives from religious leaders and leading national academics in discussing and finding ways to adapt...',
    category: 'academic',
    date: '2024-01-10',
    views: 850,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj6SsvmZZcszDZbjLVfW4mRwgDRg-yZcAnHj1rwGCdFtabmpj8Q7-CzL1nstT0X2t5YXPbMUIt8RfztsLSJDZr_VH7uVmI_H66_1ok0oRvCbNvt_EPrQnimJtkR3vMqZdGdB0dsP6tkT6-ZbkXfI1FpPpk8hpp33dBoQOO127AC8ntF1bkkW9UuhFH9j3MnBC6OP4M0WM19BcKehUhW3yMGFSHnyJLS4VRFAIGA-3UR9moeAf6sxhE7NJ3U73-hoXrhyXNl6XT1qZ3'
  },
  {
    title: currentLang.value === 'th' ? 'ประกาศทุนสนับสนุนการวิจัยทางพระพุทธศาสนาและปรัชญา' : 'Announcement of Research Grants for Buddhist Studies and Philosophy',
    description: currentLang.value === 'th' ? 'เปิดรับข้อเสนอโครงการวิจัยสำหรับคณาจารย์และนิสิตบัณฑิตศึกษาที่สนใจทำวิจัย...' : 'Open for research project proposals for faculty and graduate students interested in conducting research...',
    category: 'scholarship',
    date: '2024-01-05',
    views: 542,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7rqBjHCrh1ixsgShSjF8tPBAXVYecyiSpw-fTKFZxG83vdgV6GTljw2RNBbFtJ5naEa9DEpsQtAqi3nPvPdm-LyNoDQlK5-CcnVTnPruXtyLzZexFOUFPRjGv6222ckqKp-uujmgu-u7_22yLJmxum62wN-ZLjnrG5wDQv1tA9i1R7gKA1DUHyqpVi0XVZ56nQKO2ao5n2DQ45auGmrS5f6QdyHfjZDmzuMt25zhzUZHvR45paUaNW4tdkf6NJAeHSzAlizBRvNz'
  },
  {
    title: currentLang.value === 'th' ? 'ภาพบรรยากาศโครงการ "จิตอาสาพัฒนาวัด" ณ วัดธรรมกาย' : 'Photos from "Volunteer Temple Development" Project at Wat Dhammakaya',
    description: currentLang.value === 'th' ? 'นิสิตภาควิชาศาสนาและปรัชญาร่วมใจบำเพ็ญประโยชน์ ทำความสะอาดและบูรณะศาสนสถาน...' : 'Students from the Department of Religion and Philosophy joined together to perform merit, cleaning and renovating religious sites...',
    category: 'student',
    date: '2023-12-28',
    views: 2100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK4GVlOTt0D6XUuviS5M2Sf49uIVS9qeVXLYVwOR7FRP0C52XEDMFz8fqpgvzU67ZARYmRFB1ubboNcy6NxrWvjqnKMPEWYrKxnki4SXfHJkg5DYhwnynb1rl_NQfLV_eW5IHGtW6ksPhlrFT--CaBTrUarv--SpEqDzoaJmlj4MCgNXyrVuvf1AU7Dh-KN415ldDEJXCh3CNMATlCNG6S5vYjho29v2xNQ-jFjG4_pkWr_Ng5fdLbTCE8gtU5wvdHB8J7YmhzmHyf'
  },
  {
    title: currentLang.value === 'th' ? 'ประกาศตารางสอบปลายภาค ประจำภาคเรียนที่ 2/2566' : 'Final Exam Schedule Announcement for Semester 2/2023',
    description: currentLang.value === 'th' ? 'นิสิตสามารถตรวจสอบรายชื่อวิชา วันเวลา และสถานที่สอบได้ที่เว็บไซต์คณะพุทธศาสตร์...' : 'Students can check course names, dates, times, and exam locations on the Faculty of Buddhism website...',
    category: 'announcement',
    date: '2023-12-20',
    views: 3500,
    image: null
  },
  {
    title: currentLang.value === 'th' ? 'การบรรยายพิเศษ "ปรัชญาตะวันออกในโลกสมัยใหม่"' : 'Special Lecture "Eastern Philosophy in the Modern World"',
    description: currentLang.value === 'th' ? 'สรุปเนื้อหาการบรรยายพิเศษจากผู้เชี่ยวชาญด้านปรัชญาญี่ปุ่น ว่าด้วยการประยุกต์ใช้แนวคิดเซน...' : 'Summary of special lecture content from Japanese philosophy expert on applying Zen concepts...',
    category: 'academic',
    date: '2023-12-15',
    views: 450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy6eaHr1MykIwiwXtj7VwR4yuETG_tbZBqtSx_DrPAhCfSyvui1shp4SDv9HvZ0VZ8XF_YwRe9XftMxp0YjRywqcZgUM4o2gx-mKwQ9QgI3yRyMOifR3GSLw9Z-AQ9KplEHuMXCiElYNHrcA4gQjTsGYaNdowM2FmCq377UwiFbxeLcQamh83uIf6QEr-mV8p5TXC1extrmzDPoOWdJsR5XtVSC_0ykHg0_xkHxU1Qwpe2XYSk0oSrQydYjx9OQxt2AiLHQxPTWPp9'
  }
])

const filteredNews = computed(() => {
  let filtered = news.value

  // Filter by category
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(item => item.category === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = news.value
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(item => item.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }
  return Math.ceil(filtered.length / itemsPerPage)
})

const getCategoryLabel = (category) => {
  const labels = {
    announcement: t('newsCategoryAnnouncement'),
    academic: t('newsCategoryAcademic'),
    scholarship: t('newsCategoryScholarship'),
    student: currentLang.value === 'th' ? 'กิจกรรมนิสิต' : 'Student Activities'
  }
  return labels[category] || category
}

const getCategoryDotColor = (category) => {
  const colors = {
    announcement: 'bg-primary',
    academic: 'bg-purple-500',
    scholarship: 'bg-blue-500',
    student: 'bg-green-500'
  }
  return colors[category] || 'bg-gray-500'
}

const getCategoryColorClass = (category) => {
  return 'text-gray-900'
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.getMonth()
  
  if (currentLang.value === 'th') {
    const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    const year = date.getFullYear() + 543
    return `${day} ${monthNames[month]} ${year}`
  } else {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const year = date.getFullYear()
    return `${monthNames[month]} ${day}, ${year}`
  }
}

const formatViews = (views) => {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k`
  }
  return views.toString()
}

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Reset to page 1 when filter changes
watch([activeCategory, searchQuery], () => {
  currentPage.value = 1
})

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

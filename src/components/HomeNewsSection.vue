<template>
  <section class="py-20 bg-background-light dark:bg-background-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center">
          <span class="w-2 h-10 bg-primary rounded-full mr-4"></span>
          {{ t('newsAndActivities') }}
        </h2>
        <a 
          class="text-primary hover:text-primary-darker font-medium flex items-center gap-1 transition-colors" 
          href="#news"
        >
          {{ t('viewAll') }} <span class="material-icons-round text-lg">arrow_forward</span>
        </a>
      </div>
      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="n in 3"
          :key="n"
          class="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-border-light dark:border-border-dark animate-pulse"
        >
          <div class="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
          </div>
          <div class="p-6">
            <div class="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-5 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div class="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </article>
      </div>
      
      <!-- News Articles -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="(item, index) in homeNews"
          :key="index"
          class="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-border-light dark:border-border-dark group cursor-pointer"
          @click="goToNewsDetail"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              v-if="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :src="item.image"
            />
            <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span class="material-icons-round text-4xl text-gray-400">article</span>
            </div>
            <div
              class="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full"
              :class="getBadgeClass(item.category)"
            >
              {{ getCategoryLabel(item.category) }}
            </div>
          </div>
          <div class="p-6">
            <span class="text-xs text-gray-400 mb-2 block">{{ formatDate(item.date) }}</span>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
              {{ item.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, currentLang } = useI18n()
const isLoading = ref(true)

const homeNews = computed(() => [
  {
    title: currentLang.value === 'th' 
      ? 'เปิดรับสมัครนิสิตสาขาวิชาศาสนาเปรียบเทียบ ประจำปีการศึกษา 2567'
      : 'Student Admissions Open for Comparative Religion Program, Academic Year 2024',
    description: currentLang.value === 'th'
      ? 'ขอเชิญผู้สนใจเข้าศึกษาต่อในระดับปริญญาตรี-โท-เอก ด้านศาสนาและปรัชญา...'
      : 'Inviting interested applicants to study at bachelor\'s, master\'s, and doctoral levels in religion and philosophy...',
    category: 'announcement',
    date: '2024-01-12',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlkZ5Q9PUwqPCKiWQQOBXgXwczjJnjKDOK56JBInOy1CDcWvcsKm6E9bxFeqhHq8_BMjK0vcr0k-n6ctPCiOeANozPwIC5myu6XAVlm8YfLjU9INW_Oc3aJCBpPGLDnKHCuxp025JTrr1P5EFyjyC6aKUnVQpX8snK-Vv2hMqEYtBa4dtPIxsbBiy5HtXgk-h56J_vdu0pJQadQky68i33lFyJSO36SPGY4Flec8sZcDpXFRxmT8eJ8yTuJVWvVFjJXnLL1HsLjAKL'
  },
  {
    title: currentLang.value === 'th'
      ? 'ขอเชิญร่วมงานเสวนาวิชาการ "ศาสนากับโลกยุคดิจิทัล"'
      : 'Invitation to Academic Seminar "Religion and the Digital World"',
    description: currentLang.value === 'th'
      ? 'พบกับมุมมองจากผู้นำทางศาสนาและนักวิชาการในการปรับตัวของศาสนา...'
      : 'Meet perspectives from religious leaders and academics on religion\'s adaptation...',
    category: 'academic',
    date: '2024-01-10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj6SsvmZZcszDZbjLVfW4mRwgDRg-yZcAnHj1rwGCdFtabmpj8Q7-CzL1nstT0X2t5YXPbMUIt8RfztsLSJDZr_VH7uVmI_H66_1ok0oRvCbNvt_EPrQnimJtkR3vMqZdGdB0dsP6tkT6-ZbkXfI1FpPpk8hpp33dBoQOO127AC8ntF1bkkW9UuhFH9j3MnBC6OP4M0WM19BcKehUhW3yMGFSHnyJLS4VRFAIGA-3UR9moeAf6sxhE7NJ3U73-hoXrhyXNl6XT1qZ3'
  },
  {
    title: currentLang.value === 'th'
      ? 'ประกาศทุนสนับสนุนการวิจัยทางพระพุทธศาสนาและปรัชญา'
      : 'Announcement of Research Grants for Buddhist Studies and Philosophy',
    description: currentLang.value === 'th'
      ? 'สำหรับคณาจารย์และนิสิตบัณฑิตศึกษาที่สนใจทำวิจัยด้านศาสนธรรมเพื่อสังคม...'
      : 'For faculty and graduate students interested in conducting research on religious principles for society...',
    category: 'scholarship',
    date: '2024-01-05',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7rqBjHCrh1ixsgShSjF8tPBAXVYecyiSpw-fTKFZxG83vdgV6GTljw2RNBbFtJ5naEa9DEpsQtAqi3nPvPdm-LyNoDQlK5-CcnVTnPruXtyLzZexFOUFPRjGv6222ckqKp-uujmgu-u7_22yLJmxum62wN-ZLjnrG5wDQv1tA9i1R7gKA1DUHyqpVi0XVZ56nQKO2ao5n2DQ45auGmrS5f6QdyHfjZDmzuMt25zhzUZHvR45paUaNW4tdkf6NJAeHSzAlizBRvNz'
  }
])

const getCategoryLabel = (category) => {
  const labels = {
    announcement: currentLang.value === 'th' ? 'รับสมัคร' : 'Admissions',
    academic: currentLang.value === 'th' ? 'สัมมนา' : 'Seminar',
    scholarship: currentLang.value === 'th' ? 'ทุนวิจัย' : 'Research Grant'
  }
  return labels[category] || category
}

const getBadgeClass = (category) => {
  const classes = {
    announcement: 'bg-primary text-gray-900',
    academic: 'bg-purple-500 text-white',
    scholarship: 'bg-blue-500 text-white'
  }
  return classes[category] || 'bg-gray-500 text-white'
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.getMonth()
  
  if (currentLang.value === 'th') {
    const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    const year = date.getFullYear() + 543
    return `${day} ${monthNames[month]} ${year}`
  } else {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const year = date.getFullYear()
    return `${monthNames[month]} ${day}, ${year}`
  }
}

const goToNewsDetail = () => {
  window.location.hash = '#news-detail'
}

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>


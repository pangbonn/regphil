<template>
  <header class="relative bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-12 overflow-hidden">
    <div class="absolute inset-0 bg-primary/5 opacity-50 dark:opacity-10"></div>
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
    <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('newsDetailTitle') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
          {{ t('newsDetailSubtitle') }}
        </p>
      </div>
    </div>
  </header>
  <div class="bg-white/50 dark:bg-surface-dark/50 border-b border-border-light dark:border-border-dark backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
      <a class="hover:text-primary transition-colors" href="#home">{{ t('breadcrumbHome') }}</a>
      <span class="mx-2">/</span>
      <a class="hover:text-primary transition-colors" href="#news">{{ t('news') }}</a>
      <span class="mx-2">/</span>
      <span class="text-primary font-medium truncate">{{ article.title }}</span>
    </div>
  </div>
  <main class="flex-grow py-8 md:py-12 bg-background-light dark:bg-background-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <!-- Main Content -->
        <div class="lg:col-span-8">
          <article class="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
            <div class="relative h-64 md:h-96 w-full overflow-hidden">
              <img 
                v-if="article.image"
                :alt="article.title" 
                class="w-full h-full object-cover"
                :src="article.image"
              />
              <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span class="material-icons-round text-6xl text-gray-400">article</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-6 left-6 md:left-10">
                <span class="bg-primary text-gray-900 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg mb-3 inline-block">
                  {{ getCategoryLabel(article.category) }}
                </span>
              </div>
            </div>
            <div class="p-6 md:p-10">
              <div class="mb-8 border-b border-border-light dark:border-border-dark pb-6">
                <h1 class="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                  {{ article.title }}
                </h1>
                <div class="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
                  <div class="flex items-center gap-2">
                    <span class="material-icons-round text-primary text-lg">event</span>
                    <span>{{ formatDate(article.date) }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-icons-round text-primary text-lg">person</span>
                    <span>{{ t('by') }} {{ article.author }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-icons-round text-primary text-lg">visibility</span>
                    <span>{{ formatViews(article.views) }} {{ t('views') }}</span>
                  </div>
                </div>
              </div>
              <div class="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p class="lead text-lg md:text-xl font-light text-gray-600 dark:text-gray-300 mb-8 border-l-4 border-primary pl-4 italic">
                  {{ article.excerpt }}
                </p>
                <div v-html="article.content"></div>
                
                <!-- Application Schedule -->
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {{ t('applicationSchedule') }}
                </h2>
                <ul class="space-y-2 list-disc list-inside bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                  <li v-for="(schedule, index) in article.schedules" :key="index">
                    <strong>{{ schedule.round }}:</strong> {{ schedule.date }}
                  </li>
                </ul>
                
                <!-- Requirements -->
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {{ t('applicantRequirements') }}
                </h2>
                <p>{{ article.requirements }}</p>
                
                <!-- Required Documents -->
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {{ t('requiredDocuments') }}
                </h2>
                <ul class="space-y-2 mb-8">
                  <li v-for="(doc, index) in article.documents" :key="index" class="flex items-start gap-2">
                    <span class="material-icons-round text-primary text-sm mt-1">check_circle</span>
                    <span>{{ doc }}</span>
                  </li>
                </ul>
                
                <!-- Gallery Section -->
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6 flex items-center gap-3">
                  <span class="w-1.5 h-8 bg-primary rounded-full"></span>
                  {{ t('gallery') }}
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div
                    v-for="(image, index) in displayedGallery"
                    :key="index"
                    :class="[
                      'relative group overflow-hidden rounded-2xl shadow-sm cursor-pointer',
                      index === 0 ? 'col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto' : 'aspect-square'
                    ]"
                    @click="openLightbox(index)"
                  >
                    <img
                      :alt="`Gallery image ${index + 1}`"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      :src="image"
                    />
                    <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                    <div v-if="index === 0" class="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {{ t('volunteerActivity') }}
                    </div>
                    <div v-else class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span class="material-icons-round text-white drop-shadow-md">zoom_in</span>
                    </div>
                  </div>
                  <div 
                    v-if="article.gallery.length > 4"
                    class="col-span-1 relative group overflow-hidden rounded-2xl shadow-sm cursor-pointer aspect-square bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    @click="showAllGallery = true"
                  >
                    <span class="text-3xl font-bold text-primary mb-1">+{{ article.gallery.length - 4 }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ t('moreImages') }}</span>
                  </div>
                </div>
                
                <!-- All Gallery Grid -->
                <div v-if="showAllGallery" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div
                    v-for="(image, index) in article.gallery"
                    :key="index"
                    class="relative group overflow-hidden rounded-2xl shadow-sm cursor-pointer aspect-square"
                    @click="openLightbox(index)"
                  >
                    <img
                      :alt="`Gallery image ${index + 1}`"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      :src="image"
                    />
                    <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span class="material-icons-round text-white drop-shadow-md">zoom_in</span>
                    </div>
                  </div>
                </div>
                
                <!-- Lightbox Modal -->
                <div
                  v-if="lightboxOpen"
                  class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                  @click.self="closeLightbox"
                  @keyup.esc="closeLightbox"
                >
                  <button
                    @click="closeLightbox"
                    class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                  >
                    <span class="material-icons-round">close</span>
                  </button>
                  <button
                    v-if="currentImageIndex > 0"
                    @click="previousImage"
                    class="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                  >
                    <span class="material-icons-round text-2xl">chevron_left</span>
                  </button>
                  <button
                    v-if="currentImageIndex < article.gallery.length - 1"
                    @click="nextImage"
                    class="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                  >
                    <span class="material-icons-round text-2xl">chevron_right</span>
                  </button>
                  <div class="relative max-w-7xl max-h-[90vh] mx-4">
                    <img
                      :alt="`Gallery image ${currentImageIndex + 1}`"
                      class="max-w-full max-h-[90vh] object-contain rounded-lg"
                      :src="article.gallery[currentImageIndex]"
                    />
                    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
                      {{ currentImageIndex + 1 }} / {{ article.gallery.length }}
                    </div>
                  </div>
                </div>
                
                <!-- Contact CTA -->
                <div class="mt-8 p-6 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 class="font-bold text-lg text-primary-darker">{{ t('contactForMoreInfo') }}</h3>
                    <p class="text-sm">{{ article.contact }}</p>
                  </div>
                  <a 
                    class="px-6 py-3 bg-primary text-gray-900 font-bold rounded-xl shadow-md hover:bg-primary-darker hover:text-white transition-all flex items-center gap-2"
                    href="#"
                    @click.prevent="downloadDocument"
                  >
                    <span class="material-icons-round">download</span>
                    {{ t('downloadRegulations') }}
                  </a>
                </div>
              </div>
              <div class="mt-10 pt-6 border-t border-border-light dark:border-border-dark flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-gray-500 dark:text-gray-400">{{ t('tags') }}:</span>
                  <div class="flex flex-wrap gap-2">
                    <a 
                      v-for="(tag, index) in article.tags" 
                      :key="index"
                      class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full hover:bg-primary hover:text-white transition-colors"
                      href="#"
                    >
                      {{ tag }}
                    </a>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm font-bold text-gray-500 dark:text-gray-400">{{ t('share') }}:</span>
                  <button class="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                    <span class="material-icons-round text-lg">facebook</span>
                  </button>
                  <button class="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                    <span class="font-bold text-lg">X</span>
                  </button>
                  <button class="w-9 h-9 rounded-full bg-[#06C755] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                    <span class="material-icons-round text-lg">chat</span>
                  </button>
                  <button 
                    class="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm"
                    :title="t('copyLink')"
                    @click="copyLink"
                  >
                    <span class="material-icons-round text-lg">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
          
          <!-- Navigation -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <a 
              v-if="previousArticle"
              class="group p-6 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-all flex items-start gap-4"
              href="#"
            >
              <span class="material-icons-round text-3xl text-gray-300 group-hover:text-primary transition-colors">arrow_back</span>
              <div class="flex flex-col">
                <span class="text-xs text-gray-400 mb-1">{{ t('previousArticle') }}</span>
                <span class="text-sm font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                  {{ previousArticle.title }}
                </span>
              </div>
            </a>
            <a 
              v-if="nextArticle"
              class="group p-6 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-all flex items-start justify-end gap-4 text-right"
              href="#"
            >
              <div class="flex flex-col">
                <span class="text-xs text-gray-400 mb-1">{{ t('nextArticle') }}</span>
                <span class="text-sm font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                  {{ nextArticle.title }}
                </span>
              </div>
              <span class="material-icons-round text-3xl text-gray-300 group-hover:text-primary transition-colors">arrow_forward</span>
            </a>
          </div>
        </div>
        
        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-8">
          <!-- Latest News -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-sm border border-border-light dark:border-border-dark">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-primary pl-3">
                {{ t('latestNews') }}
              </h3>
              <a class="text-primary text-sm hover:underline" href="#news">{{ t('viewAll') }}</a>
            </div>
            <div class="space-y-6">
              <a 
                v-for="(item, index) in latestNews" 
                :key="index"
                class="flex gap-4 group" 
                href="#"
              >
                <div class="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
                  <img 
                    v-if="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    :src="item.image"
                  />
                  <div v-else class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span class="material-icons-round text-2xl text-gray-400">article</span>
                  </div>
                </div>
                <div class="flex flex-col justify-center">
                  <span class="text-xs text-primary font-medium mb-1">{{ formatDateShort(item.date) }}</span>
                  <h4 class="text-sm font-bold text-gray-800 dark:text-white leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {{ item.title }}
                  </h4>
                </div>
              </a>
            </div>
          </div>
          
          <!-- Categories -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-sm border border-border-light dark:border-border-dark">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-primary pl-3 mb-6">
              {{ t('newsCategories') }}
            </h3>
            <ul class="space-y-3">
              <li v-for="(category, index) in categories" :key="index">
                <a 
                  class="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-primary/10 hover:text-primary transition-colors group"
                  href="#"
                >
                  <span class="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary">{{ category.name }}</span>
                  <span class="bg-white dark:bg-gray-700 text-xs px-2 py-1 rounded-md text-gray-500 shadow-sm">{{ category.count }}</span>
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Newsletter -->
          <div class="bg-gradient-to-br from-primary/20 to-purple-100 dark:from-primary/10 dark:to-purple-900/20 rounded-3xl p-8 text-center border border-primary/20 relative overflow-hidden">
            <div class="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div class="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"></div>
            <span class="material-icons-round text-5xl text-primary mb-4 block">mail_outline</span>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ t('dontMissNews') }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {{ t('newsletterDescription') }}
            </p>
            <form class="space-y-3 relative z-10" @submit.prevent="subscribeNewsletter">
              <input
                v-model="email"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                :placeholder="t('yourEmail')"
                type="email"
              />
              <button
                class="w-full py-3 bg-primary text-gray-900 font-bold rounded-xl shadow-md hover:bg-primary-darker hover:text-white transition-all text-sm"
                type="submit"
              >
                {{ t('subscribeNewsletter') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, currentLang } = useI18n()
const email = ref('')
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)
const showAllGallery = ref(false)

// Sample article data - in real app, this would come from props or API
const article = computed(() => ({
  title: currentLang.value === 'th' 
    ? 'เปิดรับสมัครนิสิตใหม่ สาขาวิชาศาสนาเปรียบเทียบ ประจำปีการศึกษา 2567'
    : 'New Student Admissions Open for Comparative Religion Program, Academic Year 2024',
  excerpt: currentLang.value === 'th'
    ? 'ภาควิชาศาสนาและปรัชญา คณะพุทธศาสตร์ ขอเชิญผู้สนใจเข้าศึกษาต่อในระดับปริญญาตรี โท และเอก เพื่อสร้างบัณฑิตที่มีความรู้คู่คุณธรรม มีวิสัยทัศน์กว้างไกล และสามารถประยุกต์หลักธรรมทางศาสนาเพื่อแก้ไขปัญหาสังคมในยุคปัจจุบันได้อย่างมีประสิทธิภาพ'
    : 'The Department of Religion and Philosophy, Faculty of Buddhism, invites interested applicants to study at the bachelor\'s, master\'s, and doctoral levels to create graduates with knowledge and virtue, broad vision, and the ability to apply religious principles to solve contemporary social problems effectively.',
  content: currentLang.value === 'th'
    ? '<p>มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย โดยภาควิชาศาสนาและปรัชญา คณะพุทธศาสตร์ เปิดรับสมัครบุคคลทั่วไปเพื่อคัดเลือกเข้าศึกษาต่อในหลักสูตรพุทธศาสตรบัณฑิต สาขาวิชาศาสนาเปรียบเทียบ ประจำปีการศึกษา 2567 โดยมุ่งเน้นการผลิตบัณฑิตที่มีความรู้ความเข้าใจในหลักการของศาสนาต่างๆ อย่างถ่องแท้ สามารถวิเคราะห์ เปรียบเทียบ และประยุกต์ใช้ในการสร้างสันติสุขให้แก่สังคมโลก</p>'
    : '<p>Mahachulalongkornrajavidyalaya University, through the Department of Religion and Philosophy, Faculty of Buddhism, is accepting applications from the general public for admission to the Bachelor of Arts in Buddhism program, Comparative Religion major, Academic Year 2024, focusing on producing graduates with deep understanding of various religious principles, able to analyze, compare, and apply them to create peace for global society.</p>',
  category: 'announcement',
  date: '2024-01-12',
  author: currentLang.value === 'th' ? 'Admin (สำนักงานเลขานุการ)' : 'Admin (Secretariat Office)',
  views: 1200,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlkZ5Q9PUwqPCKiWQQOBXgXwczjJnjKDOK56JBInOy1CDcWvcsKm6E9bxFeqhHq8_BMjK0vcr0k-n6ctPCiOeANozPwIC5myu6XAVlm8YfLjU9INW_Oc3aJCBpPGLDnKHCuxp025JTrr1P5EFyjyC6aKUnVQpX8snK-Vv2hMqEYtBa4dtPIxsbBiy5HtXgk-h56J_vdu0pJQadQky68i33lFyJSO36SPGY4Flec8sZcDpXFRxmT8eJ8yTuJVWvVFjJXnLL1HsLjAKL',
  schedules: [
    { round: currentLang.value === 'th' ? 'รอบที่ 1 Portfolio' : 'Round 1 Portfolio', date: currentLang.value === 'th' ? '1 - 31 มกราคม 2567' : 'January 1-31, 2024' },
    { round: currentLang.value === 'th' ? 'รอบที่ 2 Quota' : 'Round 2 Quota', date: currentLang.value === 'th' ? '15 กุมภาพันธ์ - 31 มีนาคม 2567' : 'February 15 - March 31, 2024' },
    { round: currentLang.value === 'th' ? 'รอบที่ 3 Admission' : 'Round 3 Admission', date: currentLang.value === 'th' ? '1 - 15 พฤษภาคม 2567' : 'May 1-15, 2024' },
    { round: currentLang.value === 'th' ? 'รอบที่ 4 Direct Admission' : 'Round 4 Direct Admission', date: currentLang.value === 'th' ? '1 - 10 มิถุนายน 2567' : 'June 1-10, 2024' }
  ],
  requirements: currentLang.value === 'th'
    ? 'ผู้สมัครจะต้องเป็นผู้สำเร็จการศึกษาระดับมัธยมศึกษาตอนปลาย หรือเทียบเท่า หรือเป็นผู้ที่กำลังศึกษาอยู่ในชั้นปีสุดท้ายของระดับมัธยมศึกษาตอนปลาย มีผลการเรียนเฉลี่ยสะสม (GPAX) ไม่ต่ำกว่า 2.00 และมีความสนใจด้านศาสนา ปรัชญา และวัฒนธรรม'
    : 'Applicants must have completed or be in their final year of high school education or equivalent, with a cumulative GPA of at least 2.00, and have an interest in religion, philosophy, and culture.',
  documents: currentLang.value === 'th' ? [
    'สำเนาระเบียนแสดงผลการเรียน (ปพ.1)',
    'สำเนาบัตรประจำตัวประชาชน',
    'สำเนาทะเบียนบ้าน',
    'รูปถ่ายขนาด 1.5 นิ้ว จำนวน 2 รูป (ถ่ายไว้ไม่เกิน 6 เดือน)',
    'แฟ้มสะสมผลงาน (Portfolio) *สำหรับรอบที่ 1'
  ] : [
    'Copy of academic transcript (Form Por Por 1)',
    'Copy of ID card',
    'Copy of house registration',
    '2 photos (1.5 inches, taken within 6 months)',
    'Portfolio *For Round 1'
  ],
  gallery: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBK4GVlOTt0D6XUuviS5M2Sf49uIVS9qeVXLYVwOR7FRP0C52XEDMFz8fqpgvzU67ZARYmRFB1ubboNcy6NxrWvjqnKMPEWYrKxnki4SXfHJkg5DYhwnynb1rl_NQfLV_eW5IHGtW6ksPhlrFT--CaBTrUarv--SpEqDzoaJmlj4MCgNXyrVuvf1AU7Dh-KN415ldDEJXCh3CNMATlCNG6S5vYjho29v2xNQ-jFjG4_pkWr_Ng5fdLbTCE8gtU5wvdHB8J7YmhzmHyf',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBj6SsvmZZcszDZbjLVfW4mRwgDRg-yZcAnHj1rwGCdFtabmpj8Q7-CzL1nstT0X2t5YXPbMUIt8RfztsLSJDZr_VH7uVmI_H66_1ok0oRvCbNvt_EPrQnimJtkR3vMqZdGdB0dsP6tkT6-ZbkXfI1FpPpk8hpp33dBoQOO127AC8ntF1bkkW9UuhFH9j3MnBC6OP4M0WM19BcKehUhW3yMGFSHnyJLS4VRFAIGA-3UR9moeAf6sxhE7NJ3U73-hoXrhyXNl6XT1qZ3',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7rqBjHCrh1ixsgShSjF8tPBAXVYecyiSpw-fTKFZxG83vdgV6GTljw2RNBbFtJ5naEa9DEpsQtAqi3nPvPdm-LyNoDQlK5-CcnVTnPruXtyLzZexFOUFPRjGv6222ckqKp-uujmgu-u7_22yLJmxum62wN-ZLjnrG5wDQv1tA9i1R7gKA1DUHyqpVi0XVZ56nQKO2ao5n2DQ45auGmrS5f6QdyHfjZDmzuMt25zhzUZHvR45paUaNW4tdkf6NJAeHSzAlizBRvNz',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDlkZ5Q9PUwqPCKiWQQOBXgXwczjJnjKDOK56JBInOy1CDcWvcsKm6E9bxFeqhHq8_BMjK0vcr0k-n6ctPCiOeANozPwIC5myu6XAVlm8YfLjU9INW_Oc3aJCBpPGLDnKHCuxp025JTrr1P5EFyjyC6aKUnVQpX8snK-Vv2hMqEYtBa4dtPIxsbBiy5HtXgk-h56J_vdu0pJQadQky68i33lFyJSO36SPGY4Flec8sZcDpXFRxmT8eJ8yTuJVWvVFjJXnLL1HsLjAKL'
  ],
  contact: currentLang.value === 'th' 
    ? 'สำนักงานภาควิชาศาสนาและปรัชญา โทร. 035-248-000 ต่อ 8215'
    : 'Department of Religion and Philosophy Office Tel. 035-248-000 ext. 8215',
  tags: currentLang.value === 'th' 
    ? ['รับสมัครนักศึกษา', 'ปริญญาตรี', 'ปีการศึกษา 2567']
    : ['Student Admissions', 'Bachelor\'s Degree', 'Academic Year 2024']
}))

const latestNews = computed(() => [
  {
    title: currentLang.value === 'th' ? 'ขอเชิญร่วมงานเสวนาวิชาการ "ศาสนากับโลกยุคดิจิทัล"' : 'Invitation to Academic Seminar "Religion and the Digital World"',
    date: '2024-01-10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj6SsvmZZcszDZbjLVfW4mRwgDRg-yZcAnHj1rwGCdFtabmpj8Q7-CzL1nstT0X2t5YXPbMUIt8RfztsLSJDZr_VH7uVmI_H66_1ok0oRvCbNvt_EPrQnimJtkR3vMqZdGdB0dsP6tkT6-ZbkXfI1FpPpk8hpp33dBoQOO127AC8ntF1bkkW9UuhFH9j3MnBC6OP4M0WM19BcKehUhW3yMGFSHnyJLS4VRFAIGA-3UR9moeAf6sxhE7NJ3U73-hoXrhyXNl6XT1qZ3'
  },
  {
    title: currentLang.value === 'th' ? 'ประกาศทุนสนับสนุนการวิจัยทางพระพุทธศาสนาและปรัชญา' : 'Announcement of Research Grants for Buddhist Studies and Philosophy',
    date: '2024-01-05',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK7rqBjHCrh1ixsgShSjF8tPBAXVYecyiSpw-fTKFZxG83vdgV6GTljw2RNBbFtJ5naEa9DEpsQtAqi3nPvPdm-LyNoDQlK5-CcnVTnPruXtyLzZexFOUFPRjGv6222ckqKp-uujmgu-u7_22yLJmxum62wN-ZLjnrG5wDQv1tA9i1R7gKA1DUHyqpVi0XVZ56nQKO2ao5n2DQ45auGmrS5f6QdyHfjZDmzuMt25zhzUZHvR45paUaNW4tdkf6NJAeHSzAlizBRvNz'
  },
  {
    title: currentLang.value === 'th' ? 'ภาพบรรยากาศโครงการ "จิตอาสาพัฒนาวัด"' : 'Photos from "Volunteer Temple Development" Project',
    date: '2023-12-28',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK4GVlOTt0D6XUuviS5M2Sf49uIVS9qeVXLYVwOR7FRP0C52XEDMFz8fqpgvzU67ZARYmRFB1ubboNcy6NxrWvjqnKMPEWYrKxnki4SXfHJkg5DYhwnynb1rl_NQfLV_eW5IHGtW6ksPhlrFT--CaBTrUarv--SpEqDzoaJmlj4MCgNXyrVuvf1AU7Dh-KN415ldDEJXCh3CNMATlCNG6S5vYjho29v2xNQ-jFjG4_pkWr_Ng5fdLbTCE8gtU5wvdHB8J7YmhzmHyf'
  }
])

const categories = computed(() => [
  { name: t('newsCategoryAnnouncement'), count: 12 },
  { name: t('newsCategoryAcademic'), count: 8 },
  { name: currentLang.value === 'th' ? 'รับสมัครนักศึกษา' : 'Student Admissions', count: 5 },
  { name: t('newsCategoryScholarship'), count: 3 }
])

const previousArticle = computed(() => ({
  title: currentLang.value === 'th' ? 'ประกาศตารางสอบปลายภาค ประจำภาคเรียนที่ 2/2566' : 'Final Exam Schedule Announcement for Semester 2/2023'
}))

const nextArticle = computed(() => ({
  title: currentLang.value === 'th' ? 'ขอเชิญร่วมงานเสวนาวิชาการ "ศาสนากับโลกยุคดิจิทัล"' : 'Invitation to Academic Seminar "Religion and the Digital World"'
}))

const getCategoryLabel = (category) => {
  const labels = {
    announcement: t('newsCategoryAnnouncement'),
    academic: t('newsCategoryAcademic'),
    scholarship: t('newsCategoryScholarship'),
    student: currentLang.value === 'th' ? 'กิจกรรมนิสิต' : 'Student Activities'
  }
  return labels[category] || category
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

const formatDateShort = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.getMonth()
  
  if (currentLang.value === 'th') {
    const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    const year = (date.getFullYear() + 543).toString().slice(-2)
    return `${day} ${monthNames[month]} ${year}`
  } else {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const year = date.getFullYear().toString().slice(-2)
    return `${monthNames[month]} ${day}, ${year}`
  }
}

const formatViews = (views) => {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k`
  }
  return views.toString()
}

const downloadDocument = () => {
  console.log('Downloading regulations...')
  // Implement download functionality
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  // Show toast notification
  alert(t('linkCopied'))
}

const subscribeNewsletter = () => {
  console.log('Subscribing to newsletter:', email.value)
  // Implement newsletter subscription
  email.value = ''
}

const displayedGallery = computed(() => {
  return article.value.gallery.slice(0, 4)
})

const openLightbox = (index) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentImageIndex.value < article.value.gallery.length - 1) {
    currentImageIndex.value++
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (lightboxOpen.value) {
    if (e.key === 'ArrowRight') {
      nextImage()
    } else if (e.key === 'ArrowLeft') {
      previousImage()
    } else if (e.key === 'Escape') {
      closeLightbox()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.prose {
  color: rgb(55 65 81);
}

.dark .prose {
  color: rgb(209 213 219);
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
}

.prose h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(17 24 39);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .prose h2 {
    font-size: 1.5rem;
  }
}

.dark .prose h2 {
  color: rgb(255 255 255);
}

.prose ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prose li {
  line-height: 1.75;
}
</style>



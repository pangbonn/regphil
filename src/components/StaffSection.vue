<template>
  <main class="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex flex-col gap-2 mb-10 text-center sm:text-left">
      <p class="text-gray-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
        {{ t('staffTitle') }}
      </p>
      <p class="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
        {{ t('staffSubtitle') }}
      </p>
    </div>
    
    <!-- Search and Filter -->
    <div class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm p-4 sm:p-6 mb-12 border border-border-light dark:border-border-dark">
      <div class="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        <label class="flex flex-col w-full lg:max-w-[400px] h-11">
          <div class="flex w-full flex-1 items-stretch rounded-xl h-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
            <div class="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4 pr-2">
              <span class="material-icons-round text-[20px]">search</span>
            </div>
            <input
              v-model="searchQuery"
              class="flex w-full min-w-0 flex-1 bg-transparent border-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:ring-0 px-2 h-full text-sm font-normal"
              :placeholder="t('staffSearchPlaceholder')"
            />
          </div>
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            @click="activeFilter = 'all'"
            :class="[
              'flex h-9 items-center justify-center gap-x-2 rounded-full px-4 transition-colors shadow-sm',
              activeFilter === 'all'
                ? 'bg-primary text-gray-900 font-bold'
                : 'bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300 font-medium'
            ]"
          >
            <span class="material-icons-round text-[18px]">groups</span>
            <span class="text-sm">{{ t('staffFilterAll') }}</span>
          </button>
          <button
            @click="activeFilter = 'admin'"
            :class="[
              'flex h-9 items-center justify-center gap-x-2 rounded-full px-4 transition-colors',
              activeFilter === 'admin'
                ? 'bg-primary text-gray-900 font-bold'
                : 'bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300 font-medium'
            ]"
          >
            <span class="material-icons-round text-[18px]">account_tree</span>
            <span class="text-sm">{{ t('staffFilterAdmin') }}</span>
          </button>
          <button
            @click="activeFilter = 'faculty'"
            :class="[
              'flex h-9 items-center justify-center gap-x-2 rounded-full px-4 transition-colors',
              activeFilter === 'faculty'
                ? 'bg-primary text-gray-900 font-bold'
                : 'bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300 font-medium'
            ]"
          >
            <span class="material-icons-round text-[18px]">school</span>
            <span class="text-sm">{{ t('staffFilterFaculty') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Management Structure -->
    <section class="mb-20">
      <div class="flex items-center justify-center gap-3 mb-12">
        <h2 class="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold leading-tight text-center">
          {{ t('managementStructure') }}
        </h2>
      </div>
      
      <!-- Mobile Layout (Vertical Stack) -->
      <div class="md:hidden w-full pb-12">
        <div class="flex flex-col items-center px-4 gap-8">
          <!-- Head of Department -->
          <div class="flex flex-col items-center relative z-20">
            <div class="group relative w-[180px] h-[250px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img 
                alt="Head of Department"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                :src="management.head.image"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div class="absolute bottom-0 left-0 w-full p-3 flex flex-col items-center text-center">
                <span class="inline-block px-2 py-1 rounded bg-primary/90 text-gray-900 text-[10px] font-bold tracking-wide uppercase mb-1 backdrop-blur-sm shadow-sm">
                  {{ t('headOfDepartment') }}
                </span>
                <h3 class="text-sm font-bold text-white mb-0.5 leading-tight">{{ management.head.name }}</h3>
                <p class="text-gray-300 text-[10px] font-light">{{ management.head.title }}</p>
              </div>
            </div>
            <div class="h-8 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
          </div>
          
          <!-- Subordinates (Mobile: Vertical Stack) -->
          <div class="flex flex-col items-center gap-8 w-full">
            <div 
              v-for="(person, index) in management.subordinates" 
              :key="index"
              class="flex flex-col items-center relative"
            >
              <div class="h-8 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
              <div class="group relative w-[180px] h-[250px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <img 
                  :alt="person.role"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  :src="person.image"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-3 flex flex-col items-center text-center">
                  <span class="inline-block px-2 py-1 rounded bg-white/20 text-white border border-white/30 text-[10px] font-bold tracking-wide mb-1 backdrop-blur-sm">
                    {{ person.role }}
                  </span>
                  <h3 class="text-sm font-bold text-white mb-0.5 leading-tight">{{ person.name }}</h3>
                </div>
              </div>
              <div class="h-8 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
          
          <!-- Planning Head -->
          <div class="flex flex-col items-center relative">
            <div class="group relative w-[180px] h-[250px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img 
                alt="Planning Head"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                :src="management.planningHead.image"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div class="absolute bottom-0 left-0 w-full p-3 flex flex-col items-center text-center">
                <span class="inline-block px-2 py-1 rounded bg-white/20 text-white border border-white/30 text-[10px] font-bold tracking-wide mb-1 backdrop-blur-sm">
                  {{ t('planningHead') }}
                </span>
                <h3 class="text-sm font-bold text-white mb-0.5 leading-tight">{{ management.planningHead.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Layout (Tree Structure) -->
      <div class="hidden md:block w-full overflow-x-auto pb-12">
        <div class="min-w-[768px] flex flex-col items-center px-4">
          <!-- Head of Department -->
          <div class="flex flex-col items-center relative z-20">
            <div class="group relative w-[200px] h-[280px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img 
                alt="Head of Department"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                :src="management.head.image"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div class="absolute bottom-0 left-0 w-full p-4 flex flex-col items-center text-center">
                <span class="inline-block px-2 py-1 rounded bg-primary/90 text-gray-900 text-[10px] font-bold tracking-wide uppercase mb-1 backdrop-blur-sm shadow-sm">
                  {{ t('headOfDepartment') }}
                </span>
                <h3 class="text-base font-bold text-white mb-0.5 leading-tight">{{ management.head.name }}</h3>
                <p class="text-gray-300 text-xs font-light">{{ management.head.title }}</p>
              </div>
            </div>
            <div class="h-10 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
          </div>
          
          <!-- Subordinates -->
          <div class="relative flex justify-center w-full">
            <div class="absolute top-0 w-[280px] h-0.5 bg-gray-300 dark:bg-gray-700"></div>
            <div class="flex gap-10">
              <div 
                v-for="(person, index) in management.subordinates" 
                :key="index"
                class="flex flex-col items-center relative"
              >
                <div class="h-10 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
                <div class="group relative w-[240px] h-[320px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <img 
                    :alt="person.role"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    :src="person.image"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div class="absolute bottom-0 left-0 w-full p-5 flex flex-col items-center text-center">
                    <span class="inline-block px-2 py-1 rounded bg-white/20 text-white border border-white/30 text-[10px] font-bold tracking-wide mb-1 backdrop-blur-sm">
                      {{ person.role }}
                    </span>
                    <h3 class="text-lg font-bold text-white mb-0.5 leading-tight">{{ person.name }}</h3>
                  </div>
                </div>
                <div class="h-10 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
          
          <!-- Planning Head -->
          <div class="flex flex-col items-center relative w-full -mt-0.5">
            <div class="w-[280px] h-0.5 bg-gray-300 dark:bg-gray-700"></div>
            <div class="h-10 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
            <div class="group relative w-[240px] h-[320px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <img 
                alt="Planning Head"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                :src="management.planningHead.image"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div class="absolute bottom-0 left-0 w-full p-5 flex flex-col items-center text-center">
                <span class="inline-block px-2 py-1 rounded bg-white/20 text-white border border-white/30 text-[10px] font-bold tracking-wide mb-1 backdrop-blur-sm">
                  {{ t('planningHead') }}
                </span>
                <h3 class="text-lg font-bold text-white mb-0.5 leading-tight">{{ management.planningHead.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Faculty Members -->
    <section class="mb-16">
      <div class="rounded-3xl bg-gradient-to-br from-primary/10 to-transparent dark:from-white/5 dark:to-transparent p-6 sm:p-10 border border-primary/10 dark:border-white/5">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-primary shadow-sm ring-4 ring-primary/10">
              <span class="material-icons-round">school</span>
            </div>
            <div>
              <h2 class="text-gray-900 dark:text-white text-2xl font-bold leading-tight">
                {{ t('facultyMembers') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {{ t('facultySubtitle') }}
              </p>
            </div>
          </div>
          <a class="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-darker transition-colors px-4 py-2 rounded-full hover:bg-primary/10" href="#">
            {{ t('viewAll') }} <span class="material-icons-round text-lg">arrow_forward</span>
          </a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(faculty, index) in filteredFaculty"
            :key="index"
            class="group flex flex-col rounded-2xl border border-white dark:border-gray-700 bg-white dark:bg-surface-dark overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div class="aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
              <img 
                v-if="faculty.image"
                :alt="faculty.name"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                :src="faculty.image"
              />
              <div v-else class="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600">
                <span class="material-icons-round text-6xl">account_circle</span>
              </div>
            </div>
            <div class="p-5 flex flex-col gap-1 flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-darker dark:group-hover:text-primary transition-colors">
                {{ faculty.name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ faculty.position }}</p>
              <div class="my-3 h-px w-full bg-gray-100 dark:bg-gray-800"></div>
              <p class="text-xs text-gray-500 dark:text-gray-500 line-clamp-2" v-html="faculty.field"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Support Staff Section -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-8 w-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <h2 class="text-gray-900 dark:text-white text-2xl font-bold leading-tight">{{ t('supportStaff') }}</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(staff, index) in supportStaff"
          :key="index"
          class="group flex flex-row sm:flex-col items-center sm:items-start rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark overflow-hidden hover:border-primary/30 hover:shadow-md transition-all"
        >
          <div class="w-24 sm:w-full sm:h-56 shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img 
              v-if="staff.image"
              :alt="staff.name" 
              class="h-full w-full object-cover"
              :src="staff.image"
            />
            <div v-else class="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
              <span class="material-icons-round text-4xl text-gray-400">account_circle</span>
            </div>
          </div>
          <div class="p-4 flex flex-col justify-center gap-1 w-full">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{{ staff.name }}</h3>
            <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ staff.position }}</p>
            <a class="mt-2 text-xs font-bold text-primary hover:underline flex items-center gap-1" href="#">
              <span class="material-icons-round text-[14px]">mail</span> {{ t('contact') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, currentLang } = useI18n()
const searchQuery = ref('')
const activeFilter = ref('all')

const management = computed(() => ({
  head: {
    name: currentLang.value === 'th' ? 'พระเมธีวรญาณ, ผศ.ดร.' : 'พระเมธีวรญาณ, ผศ.ดร',
    role: t('headOfDepartment'),
    image: 'https://regphil.mcu.ac.th/wp-content/uploads/2024/08/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%98%E0%B8%B5%E0%B8%A7%E0%B8%A3%E0%B8%8D%E0%B8%B2%E0%B8%93-%E0%B8%9C%E0%B8%A8.%E0%B8%94%E0%B8%A3.-%E0%B8%84%E0%B8%93%E0%B8%9A%E0%B8%94%E0%B8%B5%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%9E%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C-1.png'
  },
  subordinates: [
    {
      name: currentLang.value === 'th' ? 'ผศ.ดร. สุมาลี รักดี' : 'Asst. Prof. Dr. Sumalee Rakdee',
      role: t('secretary'),
      image: 'https://regphil.mcu.ac.th/wp-content/uploads/2024/08/%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88-3.png'
    },
    {
      name: currentLang.value === 'th' ? 'รศ.ดร. วีระศักดิ์ ปัญญา' : 'Assoc. Prof. Dr. Weerasak Panya',
      role: t('academicHead'),
      image:'https://regphil.mcu.ac.th/wp-content/uploads/2022/10/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%A7%E0%B8%9B%E0%B9%84%E0%B8%8B%E0%B8%95%E0%B9%8C-1280-%C3%97-818px-2.jpg'
    }
  ],
  planningHead: {
    name: currentLang.value === 'th' ? 'ผศ.ดร. นิตยา ธรรมดี' : 'Asst. Prof. Dr. Nittaya Thamdee',
    role: t('planningHead'),
    image: 'https://regphil.mcu.ac.th/wp-content/uploads/2024/08/%E0%B8%9E%E0%B8%A1.%E0%B8%82%E0%B8%A7%E0%B8%B1%E0%B8%8D.png'
  }
}))

const facultyMembers = computed(() => [
  {
    name: currentLang.value === 'th' ? 'รศ.ดร. วีระศักดิ์ ปัญญา' : 'Assoc. Prof. Dr. Weerasak Panya',
    position: t('programChair'),
    field: currentLang.value === 'th' ? 'สาขาวิชาปรัชญาดุษฎีบัณฑิต<br />(ปรัชญาและศาสนา)' : 'Ph.D. in Philosophy<br />(Philosophy and Religion)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS_PFU0A4g8U17LqPB5DfjWJZhfGwXtF1Gt_Ux2C3ce8cXMJRsndeRMoWTMGHnsOC7xIwHsE1m28jHvFFTAA1SjeFdodbdt5LJyozDUM1yAEfiNW7_bbdvl-dWN9oDdyMHp31QAk2k1cOLnNTVaUi6zlvm1VjvIrysA5_9MFgXXIqE1DtGW7ga2jOejJUFYeDhGFHGCwG6RFKD9vB5evAasWorgnWVjhUttlFSBkQU0ZHpE0TxEqNHAYzLKnChte32S8WP6WTEklm5',
    type: 'faculty'
  },
  {
    name: currentLang.value === 'th' ? 'ผศ.ดร. นิตยา ธรรมดี' : 'Asst. Prof. Dr. Nittaya Thamdee',
    position: t('facultyMember'),
    field: currentLang.value === 'th' ? 'สาขาวิชาพุทธศาสนาและปรัชญา' : 'Buddhism and Philosophy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFNuDmgfBSH3Y1IKxh79I_EoGrTNToksC6270NylG10R4Uh5mJaVAxtSUwyl48gwFVIsKT61WvoFmYAABImTTIhD6rXKm9pqH6uqICYbc3a_JIgHZqWx1nAURiJQ-mtWNSiN7eJqwBvI_XvCllf-njnEumK0UnyNoRhzRsgPP3Qq2keWkd9nMm46Z7ve390xKDrHBd4u_FQa8x-Lko7glZUiiiXhx4sFbY9BBZADNviQ1qt1uvza2m_YB7uo6oGeILvfIDg7BWcvry',
    type: 'faculty'
  },
  {
    name: currentLang.value === 'th' ? 'ดร. พรทิพย์ สุขใจ' : 'Dr. Pornthip Sukjai',
    position: t('facultyMember'),
    field: currentLang.value === 'th' ? 'สาขาวิชาศาสนาเปรียบเทียบ' : 'Comparative Religion',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaeB65_UqjVFXMOKMFMCAP2Fslr4AMGkcjVmPAoNM3gIBdmvycG780RV8MmCk_VpNNivtYotY7jFxpz-z4sDXadaLMuViv-_I7fbjBYTYt5ckuscqS5lUfr-CAvj05c9WRcokczZpikFrFgCRpjKNp8AfcTJm76jIDx4hX0Wxm5uzayDaN1RnNIBp84NKdAqN8ll9RS_aATecuzI7iQPbnspr2koMbjSA4LgqrFF6drYKfhH5PlY7ZU8W_Ycjt07U6JJTC88nmfsRk',
    type: 'faculty'
  },
  {
    name: currentLang.value === 'th' ? 'อาจารย์ สมศักดิ์ ใจมั่น' : 'Mr. Somsak Jaiman',
    position: t('facultyMember'),
    field: currentLang.value === 'th' ? 'สาขาวิชาพุทธศาสนา' : 'Buddhism',
    image: null,
    type: 'faculty'
  }
])

const filteredFaculty = computed(() => {
  let filtered = facultyMembers.value

  // Filter by type
  if (activeFilter.value === 'admin') {
    filtered = []
  } else if (activeFilter.value === 'faculty') {
    filtered = filtered.filter(f => f.type === 'faculty')
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(f => 
      f.name.toLowerCase().includes(query)
    )
  }

  return filtered
})

const supportStaff = computed(() => [
  {
    name: currentLang.value === 'th' ? 'นายธนพล เจริญยิ่ง' : 'Mr. Thanaphon Charoenying',
    position: currentLang.value === 'th' ? 'เจ้าหน้าที่บริหารงานทั่วไป' : 'General Administration Officer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnUvBO4FjKpO-V49DYmcH4y3eswS03x5xkzJP2ScardbYds66UCjXqWSxQ8L78y8oemj9iRXHVGBmvYIQnTrBvEIYcqNrG6aOClJvyHBuc0D1vAwQLZDiM7HYzIhloF1xSgouf5TNuhxgxwVMAv-k2CpXU4J_HjIDV6x6qy07DBDTSTfrbkL2f1Pb57P6-EhvIwz71D2pt_zcjDV5GSLNircpFq_rE6XzXmp-_S7OtItHc5ET_TAY2kQIi9nLoyjV8T7E66rAPD3ZN'
  },
  {
    name: currentLang.value === 'th' ? 'นางสาวพิมพ์ใจ รักการเรียน' : 'Ms. Pimjai Rakkarnrian',
    position: currentLang.value === 'th' ? 'นักวิชาการศึกษา' : 'Academic Officer',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBksh5UeByT6-cSMbCcH5VObUkRphK7lIoeUa4O72vvDlVBZb8CzHTTDfWOj1zcLTaJr2X3Dn7frBbtKX60piM_h1XyRHvtJGKd-8agc6SWy7se5I2HXFzf7R2n4HCHdqChpQN2QO6X_Y2EPc5_Kf9Otyh9H0R6RzWLaXoFuzNUiTOPLd7SFIXC3xtJ6NQaMWFC12hGnqwhgYqJFNyaCGqcgRMhK41LVvhHGJYv9RNwh6ZSv8iOFNrr2ZBB_JD0GnQuWQRyRr7nWlk6'
  }
])
</script>


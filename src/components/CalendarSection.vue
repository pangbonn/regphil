<template>
  <header class="relative bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-12 overflow-hidden">
    <div class="absolute inset-0 bg-primary/5 opacity-50 dark:opacity-10"></div>
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
    <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('calendarTitle') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
          {{ t('calendarSubtitle') }}
        </p>
      </div>
    </div>
  </header>
  <div class="bg-white/50 dark:bg-surface-dark/50 border-b border-border-light dark:border-border-dark backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
      <a class="hover:text-primary transition-colors" href="#home">{{ t('breadcrumbHome') }}</a>
      <span class="mx-2">/</span>
      <span class="text-primary font-medium">{{ t('calendar') }}</span>
    </div>
  </div>
  <main class="flex-grow py-12 bg-background-light dark:bg-background-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <aside class="w-full lg:w-1/4 space-y-6">
          <!-- <button
            class="w-full py-3 bg-primary text-gray-900 rounded-xl font-bold shadow-md hover:bg-primary-darker hover:text-white transition-all flex items-center justify-center gap-2"
            @click="showAddEvent = true"
          >
            <span class="material-icons-round">add_circle</span>
            {{ t('addEvent') }}
          </button> -->
          
          <!-- Filter -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center">
              <span class="material-icons-round mr-2 text-primary">filter_alt</span> {{ t('filterType') }}
            </h3>
            <div class="space-y-3">
              <label 
                v-for="(filter, index) in eventFilters" 
                :key="index"
                class="flex items-center justify-between cursor-pointer group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <input 
                    v-model="filter.active"
                    class="h-5 w-5 rounded-full border-2 cursor-pointer transition-all custom-checkbox"
                    :class="{
                      'border-primary checkbox-primary': filter.color === 'primary',
                      'border-red-500 checkbox-red': filter.color === 'red',
                      'border-blue-500 checkbox-blue': filter.color === 'blue',
                      'border-green-500 checkbox-green': filter.color === 'green',
                      'border-gray-300': !filter.active
                    }"
                    type="checkbox"
                  />
                  <span 
                    class="w-3 h-3 rounded-full"
                    :class="{
                      'bg-primary': filter.color === 'primary',
                      'bg-red-500': filter.color === 'red',
                      'bg-blue-500': filter.color === 'blue',
                      'bg-green-500': filter.color === 'green'
                    }"
                  ></span>
                  <span class="text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                    {{ filter.label }}
                  </span>
                </div>
                <span 
                  class="text-xs font-bold px-2 py-1 rounded-full"
                  :class="{
                    'bg-primary/10 text-primary': filter.color === 'primary',
                    'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400': filter.color === 'red',
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400': filter.color === 'blue',
                    'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400': filter.color === 'green'
                  }"
                >
                  {{ getEventCountByType(filter.type) }}
                </span>
              </label>
            </div>
          </div>
          
          <!-- Upcoming Events -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-border-light dark:border-border-dark">
            <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-white">{{ t('upcomingEvents') }}</h3>
            <div class="space-y-4">
              <div 
                v-for="(event, index) in upcomingEvents" 
                :key="index"
                class="flex gap-3 items-start pl-3"
                :class="{
                  'border-l-2 border-primary': event.color === 'primary',
                  'border-l-2 border-red-500': event.color === 'red',
                  'border-l-2 border-blue-500': event.color === 'blue',
                  'border-l-2 border-green-500': event.color === 'green'
                }"
              >
                <div class="flex flex-col items-center min-w-[3rem]">
                  <span class="text-xs text-gray-500 uppercase font-bold">{{ event.month }}</span>
                  <span class="text-xl font-bold text-gray-900 dark:text-white">{{ event.day }}</span>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-gray-900 dark:text-white leading-tight hover:text-primary cursor-pointer">
                    {{ event.title }}
                  </h4>
                  <span 
                    class="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                    :class="{
                      'text-primary bg-primary/10': event.color === 'primary',
                      'text-red-500 bg-red-100 dark:bg-red-900/30': event.color === 'red',
                      'text-blue-500 bg-blue-100 dark:bg-blue-900/30': event.color === 'blue',
                      'text-green-500 bg-green-100 dark:bg-green-900/30': event.color === 'green'
                    }"
                  >
                    {{ event.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        <!-- Calendar -->
        <section class="w-full lg:w-3/4">
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden">
            <!-- Calendar Header -->
            <div class="p-6 border-b border-border-light dark:border-border-dark flex flex-col sm:flex-row justify-between items-center gap-4">
              <div class="flex items-center gap-4">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentMonthYear }}</h2>
                <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    @click="previousMonth"
                    class="p-1 hover:bg-white dark:hover:bg-gray-700 rounded-md shadow-sm transition-all text-gray-600 dark:text-gray-300"
                  >
                    <span class="material-icons-round">chevron_left</span>
                  </button>
                  <button
                    @click="nextMonth"
                    class="p-1 hover:bg-white dark:hover:bg-gray-700 rounded-md shadow-sm transition-all text-gray-600 dark:text-gray-300"
                  >
                    <span class="material-icons-round">chevron_right</span>
                  </button>
                </div>
                <button
                  @click="goToToday"
                  class="text-sm font-medium text-primary hover:text-primary-darker border border-primary/30 px-3 py-1 rounded-md transition-colors"
                >
                  {{ t('today') }}
                </button>
              </div>
              <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 text-sm font-medium">
                <button
                  @click="viewMode = 'month'"
                  :class="['px-4 py-1.5 rounded-md shadow-sm transition-colors', viewMode === 'month' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white']"
                >
                  {{ t('month') }}
                </button>
                <button
                  @click="viewMode = 'week'"
                  :class="['px-4 py-1.5 rounded-md transition-colors', viewMode === 'week' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white']"
                >
                  {{ t('week') }}
                </button>
                <button
                  @click="viewMode = 'list'"
                  :class="['px-4 py-1.5 rounded-md transition-colors', viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white']"
                >
                  {{ t('list') }}
                </button>
              </div>
            </div>
            
            <!-- Calendar Grid -->
            <div v-if="viewMode === 'month'" class="grid grid-cols-7 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50">
              <div 
                v-for="day in weekDays" 
                :key="day"
                class="py-3 text-center text-sm font-bold"
                :class="day === t('sun') ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'"
              >
                {{ day }}
              </div>
            </div>
            
            <div v-if="viewMode === 'month'" class="grid grid-cols-7 auto-rows-[minmax(120px,auto)] gap-px">
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                :class="[
                  'bg-surface-light dark:bg-surface-dark p-2 min-h-[120px] group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                  !day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''
                ]"
              >
                <span 
                  v-if="day.isCurrentMonth"
                  :class="[
                    'inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-medium',
                    day.isToday 
                      ? 'text-white bg-primary shadow-lg ring-2 ring-white dark:ring-gray-800 font-bold'
                      : day.isWeekend 
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                        : 'text-gray-700 dark:text-gray-300'
                  ]"
                >
                  {{ day.date }}
                </span>
                <span v-else class="text-sm">{{ day.date }}</span>
                <div v-if="day.isCurrentMonth" class="mt-2 space-y-1">
                  <div
                    v-for="(event, eventIndex) in getDayEvents(day.fullDate)"
                    :key="eventIndex"
                    :class="`px-2 py-1 text-xs rounded mb-1 border-l-2 truncate cursor-pointer hover:opacity-80 transition-opacity ${getEventColorClass(event.type)}`"
                    :title="event.title"
                  >
                    {{ event.title }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- List View -->
            <div v-if="viewMode === 'list'" class="p-6">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                      <th class="py-3 px-4 font-medium">{{ t('date') }}</th>
                      <th class="py-3 px-4 font-medium">{{ t('event') }}</th>
                      <th class="py-3 px-4 font-medium">{{ t('type') }}</th>
                      <th class="py-3 px-4 font-medium">{{ t('location') }}</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm">
                    <tr
                      v-for="(event, index) in filteredEvents"
                      :key="index"
                      class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td class="py-4 px-4 font-bold text-gray-900 dark:text-white">{{ formatDate(event.date) }}</td>
                      <td class="py-4 px-4 text-gray-700 dark:text-gray-300">{{ event.title }}</td>
                      <td class="py-4 px-4">
                        <span :class="`px-2 py-1 rounded-full text-xs font-bold ${getEventBadgeClass(event.type)}`">
                          {{ getEventTypeLabel(event.type) }}
                        </span>
                      </td>
                      <td class="py-4 px-4 text-gray-500">{{ event.location }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- Event Details Table -->
          <div class="mt-8 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ t('eventDetails') }} {{ currentMonthYear }}</h3>
              <a 
                class="text-sm text-primary hover:text-primary-darker font-medium flex items-center"
                href="#"
                @click.prevent="downloadPDF"
              >
                {{ t('downloadPDF') }} <span class="material-icons-round text-base ml-1">download</span>
              </a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                    <th class="py-3 px-4 font-medium">{{ t('date') }}</th>
                    <th class="py-3 px-4 font-medium">{{ t('event') }}</th>
                    <th class="py-3 px-4 font-medium">{{ t('type') }}</th>
                    <th class="py-3 px-4 font-medium">{{ t('location') }}</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr
                    v-for="(event, index) in filteredEvents"
                    :key="index"
                    class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td class="py-4 px-4 font-bold text-gray-900 dark:text-white">{{ formatDate(event.date) }}</td>
                    <td class="py-4 px-4 text-gray-700 dark:text-gray-300">{{ event.title }}</td>
                    <td class="py-4 px-4">
                      <span :class="`px-2 py-1 rounded-full text-xs font-bold ${getEventBadgeClass(event.type)}`">
                        {{ getEventTypeLabel(event.type) }}
                      </span>
                    </td>
                    <td class="py-4 px-4 text-gray-500">{{ event.location }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, currentLang } = useI18n()
const showAddEvent = ref(false)
const viewMode = ref('month')
const currentDate = ref(new Date())
const selectedDate = ref(new Date())

const eventFilters = ref([
  { label: t('eventTypeAcademic'), color: 'primary', active: true, type: 'academic' },
  { label: t('eventTypeExam'), color: 'red', active: true, type: 'exam' },
  { label: t('eventTypeStudent'), color: 'blue', active: true, type: 'student' },
  { label: t('eventTypeHoliday'), color: 'green', active: true, type: 'holiday' }
])

const events = computed(() => {
  const currentYear = currentDate.value.getFullYear()
  
  // Generate events for all months - always show sample events
  const eventsList = []

  // === Semester 1 ===
eventsList.push(
  {
    date: `${currentYear}-06-01`,
    title: currentLang.value === 'th' ? 'ลงทะเบียนเรียนออนไลน์ (ภาค 1)' : 'Online Registration (Semester 1)',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-06-09`,
    title: currentLang.value === 'th' ? 'เปิดภาคการศึกษา ภาค 1' : 'Semester 1 Begins',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-06-09`,
    title: currentLang.value === 'th' ? 'เพิ่ม/ถอน รายวิชา' : 'Add / Drop Courses',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-06-15`,
    title: currentLang.value === 'th' ? 'เริ่มปรับชำระค่าธรรมเนียมล่าช้า' : 'Late Payment Period Begins',
    type: 'finance',
    location: ''
  },
  {
    date: `${currentYear}-09-01`,
    title: currentLang.value === 'th' ? 'ประเมินอาจารย์ (ออนไลน์)' : 'Instructor Evaluation (Online)',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-09-25`,
    title: currentLang.value === 'th' ? 'วันสุดท้ายของการเรียนการสอน' : 'Last Day of Classes',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-10-08`,
    title: currentLang.value === 'th' ? 'สอบวัดผลปลายภาค ภาค 1' : 'Final Exam (Semester 1)',
    type: 'exam',
    location: ''
  }
)


// === Semester 2 ===
eventsList.push(
  {
    date: `${currentYear}-10-22`,
    title: currentLang.value === 'th' ? 'ลงทะเบียนเรียนออนไลน์ (ภาค 2)' : 'Online Registration (Semester 2)',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-11-02`,
    title: currentLang.value === 'th' ? 'เปิดภาคการศึกษา ภาค 2' : 'Semester 2 Begins',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-11-02`,
    title: currentLang.value === 'th' ? 'เพิ่ม/ถอน รายวิชา' : 'Add / Drop Courses',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-11-16`,
    title: currentLang.value === 'th' ? 'เริ่มปรับชำระค่าธรรมเนียมล่าช้า' : 'Late Payment Period Begins',
    type: 'finance',
    location: ''
  },
  {
    date: `${currentYear}-02-01`,
    title: currentLang.value === 'th' ? 'ประเมินอาจารย์ (ออนไลน์)' : 'Instructor Evaluation (Online)',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-02-22`,
    title: currentLang.value === 'th' ? 'วันสุดท้ายของการเรียนการสอน' : 'Last Day of Classes',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-03-08`,
    title: currentLang.value === 'th' ? 'สอบวัดผลปลายภาค ภาค 2' : 'Final Exam (Semester 2)',
    type: 'exam',
    location: ''
  }
)


// === Summer Semester ===
eventsList.push(
  {
    date: `${currentYear}-03-20`,
    title: currentLang.value === 'th' ? 'ลงทะเบียนเรียนออนไลน์ (ภาคฤดูร้อน)' : 'Online Registration (Summer)',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-04-01`,
    title: currentLang.value === 'th' ? 'เปิดภาคการศึกษา ภาคฤดูร้อน' : 'Summer Semester Begins',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-04-01`,
    title: currentLang.value === 'th' ? 'เพิ่ม/ถอน รายวิชา' : 'Add / Drop Courses',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-04-22`,
    title: currentLang.value === 'th' ? 'ประเมินอาจารย์ (ออนไลน์)' : 'Instructor Evaluation (Online)',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-04-28`,
    title: currentLang.value === 'th' ? 'วันสุดท้ายของการเรียนการสอน' : 'Last Day of Classes',
    type: 'academic',
    location: ''
  },
  {
    date: `${currentYear}-05-06`,
    title: currentLang.value === 'th' ? 'สอบวัดผลปลายภาค ภาคฤดูร้อน' : 'Final Exam (Summer)',
    type: 'exam',
    location: ''
  }
)

  
  // January events (always show for demonstration)
  // eventsList.push(
  //   { date: `${currentYear}-01-01`, title: t('eventNewYear'), type: 'holiday', location: t('publicHoliday') },
  //   { date: `${currentYear}-01-05`, title: t('eventOrientation'), type: 'student', location: '' },
  //   { date: `${currentYear}-01-08`, title: t('eventSemesterStart'), type: 'academic', location: t('allStudents') },
  //   { date: `${currentYear}-01-10`, title: t('eventDepartmentMeeting'), type: 'academic', location: '' },
  //   { date: `${currentYear}-01-11`, title: t('eventDharmaTalk'), type: 'academic', location: 'Zoom' },
  //   { date: `${currentYear}-01-16`, title: t('eventTeachersDay'), type: 'holiday', location: t('publicHoliday') },
  //   { date: `${currentYear}-01-22`, title: t('eventThesisDeadline'), type: 'exam', location: t('graduateStudents') },
  //   { date: `${currentYear}-01-26`, title: t('eventVirtueCamp'), type: 'student', location: t('mcuDharmaHall') },
  //   { date: `${currentYear}-01-27`, title: t('eventVirtueCamp'), type: 'student', location: t('mcuDharmaHall') },
  //   { date: `${currentYear}-01-28`, title: t('eventVirtueCamp'), type: 'student', location: t('mcuDharmaHall') }
  // )
  
  // February events
  // eventsList.push(
  //   { date: `${currentYear}-02-05`, title: t('eventSeminar1'), type: 'academic', location: '' },
  //   { date: `${currentYear}-02-14`, title: currentLang.value === 'th' ? 'วันมาฆบูชา' : 'Makha Bucha Day', type: 'holiday', location: t('publicHoliday') },
  //   { date: `${currentYear}-02-20`, title: currentLang.value === 'th' ? 'สอบกลางภาค' : 'Midterm Exam', type: 'exam', location: '' }
  // )
  
  // March events
  // eventsList.push(
  //   { date: `${currentYear}-03-15`, title: currentLang.value === 'th' ? 'ประชุมคณะกรรมการหลักสูตร' : 'Curriculum Committee Meeting', type: 'academic', location: '' },
  //   { date: `${currentYear}-03-25`, title: currentLang.value === 'th' ? 'สอบปลายภาค' : 'Final Exam', type: 'exam', location: '' }
  // )
  
  // // April events
  // eventsList.push(
  //   { date: `${currentYear}-04-13`, title: currentLang.value === 'th' ? 'วันสงกรานต์' : 'Songkran Festival', type: 'holiday', location: t('publicHoliday') },
  //   { date: `${currentYear}-04-15`, title: currentLang.value === 'th' ? 'เปิดภาคเรียน 1' : 'Semester 1 Start', type: 'academic', location: '' }
  // )
  
  // // May events
  // eventsList.push(
  //   { date: `${currentYear}-05-01`, title: currentLang.value === 'th' ? 'วันแรงงาน' : 'Labor Day', type: 'holiday', location: t('publicHoliday') },
  //   { date: `${currentYear}-05-10`, title: currentLang.value === 'th' ? 'วันวิสาขบูชา' : 'Visakha Bucha Day', type: 'holiday', location: t('publicHoliday') }
  // )
  
  // Always add some sample events for current date
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  
  // Add event for today if not exists
  const todayStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  // if (!eventsList.find(e => e.date === todayStr)) {
  //   eventsList.push({
  //     date: todayStr,
  //     title: currentLang.value === 'th' ? 'กิจกรรมตัวอย่างวันนี้' : 'Sample Event Today',
  //     type: 'academic',
  //     location: ''
  //   })
  // }
  
  // Add event for tomorrow
  // const tomorrow = new Date(today)
  // tomorrow.setDate(tomorrow.getDate() + 1)
  // const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`
  // if (!eventsList.find(e => e.date === tomorrowStr)) {
  //   eventsList.push({
  //     date: tomorrowStr,
  //     title: currentLang.value === 'th' ? 'กิจกรรมตัวอย่างพรุ่งนี้' : 'Sample Event Tomorrow',
  //     type: 'student',
  //     location: ''
  //   })
  // }
  
  return eventsList
})

const weekDays = computed(() => [
  t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')
])

const currentMonthYear = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const monthNames = currentLang.value === 'th' 
    ? ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  if (currentLang.value === 'th') {
    return `${monthNames[month]} ${year + 543}`
  } else {
    return `${monthNames[month]} ${year}`
  }
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()
  
  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Previous month days
  const prevMonth = new Date(year, month - 1, 0)
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const date = prevMonth.getDate() - i
    days.push({
      date,
      fullDate: new Date(year, month - 1, date),
      isCurrentMonth: false,
      isToday: false,
      isWeekend: false
    })
  }
  
  // Current month days
  for (let date = 1; date <= daysInMonth; date++) {
    const fullDate = new Date(year, month, date)
    const dayOfWeek = fullDate.getDay()
    days.push({
      date,
      fullDate,
      isCurrentMonth: true,
      isToday: fullDate.getTime() === today.getTime(),
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let date = 1; date <= remainingDays; date++) {
    days.push({
      date,
      fullDate: new Date(year, month + 1, date),
      isCurrentMonth: false,
      isToday: false,
      isWeekend: false
    })
  }
  
  return days
})

const getEventColor = (type) => {
  const colorMap = {
    academic: 'primary',
    exam: 'red',
    student: 'blue',
    holiday: 'green',
    finance: 'blue'
  }
  return colorMap[type] || 'primary'
}

const upcomingEvents = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const monthNames = currentLang.value === 'th'
    ? ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  return events.value
    .filter(event => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate >= today
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)
    .map(event => {
      const eventDate = new Date(event.date)
      const month = eventDate.getMonth()
      const day = eventDate.getDate()
      
      return {
        month: monthNames[month],
        day: day,
        title: event.title,
        type: getEventTypeLabel(event.type),
        color: getEventColor(event.type)
      }
    })
})

const filteredEvents = computed(() => {
  const activeFilters = eventFilters.value.filter(f => f.active).map(f => f.type)
  return events.value
    .filter(event => activeFilters.includes(event.type))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
})

const getEventCountByType = (type) => {
  return events.value.filter(event => event.type === type).length
}

const getDayEvents = (date) => {
  const dateStr = formatDateString(date)
  return filteredEvents.value.filter(event => event.date === dateStr)
}

const formatDateString = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
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

const getEventColorClass = (type) => {
  const colors = {
    academic: 'bg-primary/10 text-gray-900 dark:text-white border-primary',
    exam: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-500',
    student: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-500',
    holiday: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-500'
  }
  return colors[type] || colors.academic
}

const getEventBadgeClass = (type) => {
  const classes = {
    academic: 'bg-primary/20 text-primary-darker',
    exam: 'bg-red-100 text-red-800',
    student: 'bg-blue-100 text-blue-800',
    holiday: 'bg-green-100 text-green-800'
  }
  return classes[type] || classes.academic
}

const getEventTypeLabel = (type) => {
  const labels = {
    academic: t('eventTypeAcademic'),
    exam: t('eventTypeExam'),
    student: t('eventTypeStudent'),
    holiday: t('eventTypeHoliday')
  }
  return labels[type] || type
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const goToToday = () => {
  currentDate.value = new Date()
}

const downloadPDF = () => {
  // PDF download functionality
  console.log('Downloading calendar PDF...')
}
</script>

<style scoped>
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  background-color: transparent;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);
}

.checkbox-primary:checked {
  background-color: #F0A8D0;
  border-color: #F0A8D0;
}

.checkbox-red:checked {
  background-color: rgb(239 68 68);
  border-color: rgb(239 68 68);
}

.checkbox-blue:checked {
  background-color: rgb(59 130 246);
  border-color: rgb(59 130 246);
}

.checkbox-green:checked {
  background-color: rgb(34 197 94);
  border-color: rgb(34 197 94);
}
</style>


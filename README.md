# ภาควิชาศาสนาและปรัชญา - MCU

เว็บไซต์ภาควิชาศาสนาและปรัชญา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย

## เทคโนโลยีที่ใช้

- Vue.js 3
- Vite
- Tailwind CSS
- Material Icons

## การติดตั้ง

```bash
npm install
```

## การรันโปรเจค

```bash
npm run dev
```

## การ Build สำหรับ Production

```bash
npm run build
```

## โครงสร้างโปรเจค

```
regphil/
├── src/
│   ├── components/
│   │   ├── Navbar.vue          # Navigation bar
│   │   ├── HeroHeader.vue      # Hero section with header
│   │   ├── AboutSection.vue    # About department section
│   │   ├── ProgramsSection.vue # Programs and courses section
│   │   ├── NewsSection.vue     # News and activities section
│   │   ├── ContactSection.vue  # Contact information section
│   │   ├── TestimonialSection.vue # Testimonials section
│   │   ├── CTASection.vue      # Call to action section
│   │   └── Footer.vue          # Footer component
│   ├── App.vue                 # Main app component
│   ├── main.js                 # Entry point
│   └── style.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```


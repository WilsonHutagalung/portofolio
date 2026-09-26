document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggle');
  const storageKey = 'portfolio-theme';

  function getCurrentTheme() {
    return document.documentElement.dataset.theme || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(storageKey, theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  const languageButtons = document.querySelectorAll('[data-language]');
  const languageStorageKey = 'portfolio-language';
  const translations = {
    en: {
      'nav.about': 'About',
      'nav.architecture': 'Architecture',
      'nav.education': 'Education',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.certifications': 'Certs',
      'nav.contact': 'Contact',
      'hero.badge': 'AVAILABLE FOR NEW OPPORTUNITIES',
      'hero.title': 'Software Engineer & Cloud Computing Specialist',
      'hero.tagline': 'Building resilient web architectures, optimized API services, and scalable cloud solutions with clean code principles.',
      'hero.explore': 'Explore Engineering Work',
      'hero.contact': 'Get In Touch',
      'metrics.gpa': 'Cumulative GPA',
      'metrics.track': 'Bangkit GCP Track',
      'metrics.certs': 'Professional Certs',
      'sections.aboutTag': 'PROFILE OVERVIEW',
      'sections.aboutTitle': 'About Me',
      'sections.principlesTag': 'SYSTEM ARCHITECTURE & CRAFT',
      'sections.principlesTitle': 'Engineering Principles',
      'sections.educationTag': 'ACADEMIC BACKGROUND',
      'sections.educationTitle': 'Education',
      'sections.experienceTag': 'CAREER & LEADERSHIP',
      'sections.experienceTitle': 'Professional Experience',
      'sections.projectsTag': 'FEATURED PROJECTS',
      'sections.projectsTitle': 'Engineering Projects',
      'projects.aressaTitle': 'Aressa Golden Farm',
      'projects.aressaDescription': 'A company profile website for Aressa Golden Farm, an exporter of palm sugar. It presents the company and its palm sugar products through a modern, responsive interface built with React and Vite.',
      'projects.posTitle': 'Cashier Application',
      'projects.posDescription': 'An integrated point-of-sale system designed to support cashier operations, from product and inventory management to checkout. It handles transactions, payments, discounts, taxes, and stock updates while providing transaction history and sales, inventory, and profit reports to support business decisions.',
      'sections.certificationsTag': 'CREDENTIALS & ACCOMPLISHMENTS',
      'sections.certificationsTitle': 'Certifications',
      'sections.contactTag': 'GET IN TOUCH',
      'sections.contactTitle': 'Initiate Contact',
      'contact.heading': "Let's build something extraordinary together.",
      'contact.description': 'Whether you have a question, a project proposal, or an engineering opportunity, my inbox is always open.',
      'contact.email': 'Direct Email',
      'contact.phone': 'Phone / WhatsApp',
      'contact.linkedin': 'LinkedIn Profile',
      'contact.github': 'GitHub Code Repos',
      'footer.tagline': 'Designed with clean architecture & modern web standards.',
      'terminal.version': 'TypeScript 5.4',
      'terminal.status': 'Compiled successfully',
      'terminal.latency': '0ms latency',
      'terminal.scroll': 'SCROLL DOWN',
      'certificate.open': 'Open Original Document',
      'about.role': 'Informatics Undergraduate',
      'about.heading': 'Dedicated Software Engineer with a passion for Cloud Systems & Modern Web Applications.',
      'about.paragraphOne': 'Final-year undergraduate Informatics student at <strong>Mulawarman University</strong> with a solid <strong>GPA of 3.83/4.00</strong>. Skilled in designing backend architectures, deploying scalable microservices, and crafting smooth user interfaces.',
      'about.paragraphTwo': 'As an alumnus of <strong>MSIB Bangkit Academy (Cloud Computing Track)</strong>, I have hands-on experience building containerized applications, RESTful APIs, and deploying cloud infrastructures on <strong>Google Cloud Platform (GCP)</strong>.',
      'about.locationLabel': 'Location',
      'about.locationValue': 'Samarinda, East Kalimantan',
      'about.degreeLabel': 'Degree & GPA',
      'about.degreeValue': 'S.Kom — GPA 3.83',
      'about.cloudLabel': 'Cloud Expertise',
      'about.cloudValue': 'GCP Architecture & Cloud APIs',
      'about.statusLabel': 'Status',
      'about.statusValue': 'Open for Engineering Positions',
      'principles.modularTitle': 'Modular Architecture',
      'principles.modularDescription': 'Enforcing clean domain boundaries, separation of concerns, and reusable code modules that scale effortlessly over time.',
      'principles.cloudTitle': 'Cloud Infrastructure',
      'principles.cloudDescription': 'Leveraging Google Cloud Platform resources, containerized services, and automated CI/CD for high availability and low latency.',
      'principles.apiTitle': 'Type-Safe & Clean APIs',
      'principles.apiDescription': 'Building intuitive RESTful endpoints and data pipelines with comprehensive error handling and strict input validation.',
      'principles.uiTitle': 'Intuitive UI Engineering',
      'principles.uiDescription': 'Crafting responsive, accessible, and aesthetically polished interfaces focused on user experience and seamless interaction.',
      'education.gpa': 'GPA 3.83 / 4.00',
      'education.universityDegree': 'Bachelor of Informatics (S1)',
      'education.universityDescription': 'Specializing in Software Engineering, Cloud Computing, Database Management, Data Structures & Algorithms, and Artificial Intelligence.',
      'education.highSchoolScore': 'Avg Score 81',
      'education.highSchoolMajor': 'Natural Sciences Major (IPA)',
      'experience.bangkitTitle': 'Cloud Computing Cohort',
      'experience.bangkitSubtitle': 'Bangkit Academy led by Google, GoTo, and Traveloka',
      'experience.bangkitOne': 'Completed the Cloud Computing Cohort curriculum at Bangkit Academy, covering cloud computing fundamentals, DevOps/SRE, web programming, JavaScript (Node.js), RESTful API backend development, database management, storage, and service deployment on Google Cloud Platform.',
      'experience.bangkitTwo': 'Developed backend APIs using Express.js and Node.js, integrated with Cloud SQL and Google Cloud Storage, as well as Gemini API for Generative AI features.',
      'experience.bangkitThree': 'Deployed backend APIs using App Engine and machine learning models using Cloud Run.',
      'experience.bangkitFour': 'Applied key learnings to the BiteWise capstone project, a healthcare modernization application, as a graduation requirement for Bangkit Academy.',
      'experience.accifenceTitle': 'Accifence Event Coordinator',
      'experience.accifenceSubtitle': 'Association of Informatics',
      'experience.accifenceOne': 'Led a 4-member event coordination team to organize course orientation and introduction sessions for 109 freshman students, covering Algorithms, Networking, Multimedia, Artificial Intelligence, Mathematics, and Physics.',
      'experience.accifenceTwo': 'Served as an organizing committee member for the national event MIT-Week (Mulawarman Informatics Tech Week) 2024.',
      'certificates.ai': 'Basic AI Learning',
      'certificates.javascript': 'Basic JavaScript Programming',
      'certificates.git': 'Basic Git with GitHub',
      'certificates.web': 'Basic Web Programming',
      'certificates.backend': 'Building Back-End Applications (GCP)',
      'certificates.ml': 'Applying Machine Learning (GCP)',
      'certificates.software': 'Software Engineering Fundamentals',
      'certificates.python': 'Python Programming Language',
      'certificates.cloud': 'Google Cloud Engineer Learning Path',
      'certificates.issuer': 'Dicoding Indonesia',
      'page.title': 'Wilson Boyaron Hutagalung // Software Engineer & Cloud Architect',
      'experience.msibTag': 'MSIB Program',
      'experience.organizationTag': 'Student Organization',
      'projects.websiteTag': '01 // BUSINESS WEBSITE',
      'projects.applicationTag': '02 // BUSINESS APPLICATION',
      'footer.copyright': '&copy; 2026 Wilson Boyaron Hutagalung. All rights reserved.',
      'footer.status': 'STATUS: OPERATIONAL',
      'terminal.degree': '"B.S. Informatics"',
      'terminal.backend': '"Backend Systems"',
      'terminal.infrastructure': '"Cloud Infrastructure"',
      'terminal.fullStack': '"Full-Stack Web"',
      'terminal.opportunities': '"Open for Engineering Opportunities"',
      'terminal.philosophy': '// Philosophy',
      'terminal.motto': '"Resilient. Performant. Clean."'
    },
    id: {
      'nav.about': 'Tentang Saya',
      'nav.architecture': 'Arsitektur',
      'nav.education': 'Pendidikan',
      'nav.experience': 'Pengalaman',
      'nav.projects': 'Project',
      'nav.certifications': 'Sertifikat',
      'nav.contact': 'Kontak',
      'hero.badge': 'TERBUKA UNTUK PELUANG BARU',
      'hero.title': 'Software Engineer & Spesialis Cloud Computing',
      'hero.tagline': 'Membangun arsitektur web yang tangguh, layanan API yang optimal, dan solusi cloud yang skalabel dengan prinsip clean code.',
      'hero.explore': 'Lihat Project',
      'hero.contact': 'Hubungi Saya',
      'metrics.gpa': 'IPK Kumulatif',
      'metrics.track': 'Bangkit Jalur GCP',
      'metrics.certs': 'Sertifikat Profesional',
      'sections.aboutTag': 'PROFIL SINGKAT',
      'sections.aboutTitle': 'Tentang Saya',
      'sections.principlesTag': 'ARSITEKTUR SISTEM & KARYA',
      'sections.principlesTitle': 'Prinsip Engineering',
      'sections.educationTag': 'LATAR BELAKANG AKADEMIK',
      'sections.educationTitle': 'Pendidikan',
      'sections.experienceTag': 'KARIER & KEPEMIMPINAN',
      'sections.experienceTitle': 'Pengalaman Profesional',
      'sections.projectsTag': 'PROJECT UNGGULAN',
      'sections.projectsTitle': 'Project Engineering',
      'projects.aressaTitle': 'Aressa Golden Farm',
      'projects.aressaDescription': 'Website company profile untuk Aressa Golden Farm, perusahaan eksportir gula aren. Website ini menampilkan informasi perusahaan dan produk gula aren melalui tampilan modern dan responsif yang dibangun dengan React dan Vite.',
      'projects.posTitle': 'Aplikasi Kasir',
      'projects.posDescription': 'Sistem Point of Sale terintegrasi untuk mendukung operasional kasir, mulai dari pengelolaan produk dan inventori hingga proses checkout. Sistem ini memproses transaksi, pembayaran, diskon, pajak, dan pembaruan stok, serta menyediakan riwayat transaksi dan laporan penjualan, inventori, dan profit untuk mendukung keputusan bisnis.',
      'sections.certificationsTag': 'SERTIFIKAT & PENCAPAIAN',
      'sections.certificationsTitle': 'Sertifikasi',
      'sections.contactTag': 'HUBUNGI SAYA',
      'sections.contactTitle': 'Mari Terhubung',
      'contact.heading': 'Mari membangun sesuatu yang luar biasa bersama.',
      'contact.description': 'Baik Anda memiliki pertanyaan, tawaran project, maupun peluang engineering, saya selalu terbuka untuk berdiskusi.',
      'contact.email': 'Email Langsung',
      'contact.phone': 'Telepon / WhatsApp',
      'contact.linkedin': 'Profil LinkedIn',
      'contact.github': 'Repository GitHub',
      'footer.tagline': 'Dirancang dengan arsitektur yang bersih dan standar web modern.',
      'terminal.version': 'TypeScript 5.4',
      'terminal.status': 'Berhasil dikompilasi',
      'terminal.latency': 'Latensi 0ms',
      'terminal.scroll': 'GULIR KE BAWAH',
      'certificate.open': 'Buka Dokumen Asli',
      'about.role': 'Mahasiswa Informatika',
      'about.heading': 'Software Engineer yang berdedikasi dengan minat pada sistem cloud dan aplikasi web modern.',
      'about.paragraphOne': 'Mahasiswa tingkat akhir Informatika di <strong>Universitas Mulawarman</strong> dengan <strong>IPK 3,83/4,00</strong>. Terampil dalam merancang arsitektur backend, mengembangkan microservices yang skalabel, dan membangun antarmuka yang nyaman digunakan.',
      'about.paragraphTwo': 'Sebagai alumni <strong>MSIB Bangkit Academy (Jalur Cloud Computing)</strong>, saya memiliki pengalaman langsung dalam membangun aplikasi berbasis container, RESTful API, dan infrastruktur cloud di <strong>Google Cloud Platform (GCP)</strong>.',
      'about.locationLabel': 'Lokasi',
      'about.locationValue': 'Samarinda, Kalimantan Timur',
      'about.degreeLabel': 'Gelar & IPK',
      'about.degreeValue': 'S.Kom — IPK 3,83',
      'about.cloudLabel': 'Keahlian Cloud',
      'about.cloudValue': 'Arsitektur GCP & Cloud API',
      'about.statusLabel': 'Status',
      'about.statusValue': 'Terbuka untuk Posisi Engineering',
      'principles.modularTitle': 'Arsitektur Modular',
      'principles.modularDescription': 'Menerapkan batas domain yang jelas, pemisahan tanggung jawab, dan modul kode yang dapat digunakan kembali serta mudah dikembangkan.',
      'principles.cloudTitle': 'Infrastruktur Cloud',
      'principles.cloudDescription': 'Memanfaatkan resource Google Cloud Platform, layanan berbasis container, dan CI/CD otomatis untuk ketersediaan tinggi serta latensi rendah.',
      'principles.apiTitle': 'API yang Type-Safe & Bersih',
      'principles.apiDescription': 'Membangun endpoint RESTful dan data pipeline yang intuitif dengan penanganan error menyeluruh serta validasi input yang ketat.',
      'principles.uiTitle': 'Engineering UI yang Intuitif',
      'principles.uiDescription': 'Membangun antarmuka yang responsif, aksesibel, dan rapi dengan fokus pada pengalaman serta interaksi pengguna.',
      'education.gpa': 'IPK 3,83 / 4,00',
      'education.universityDegree': 'Sarjana Informatika (S1)',
      'education.universityDescription': 'Berfokus pada Software Engineering, Cloud Computing, Manajemen Database, Struktur Data & Algoritma, serta Artificial Intelligence.',
      'education.highSchoolScore': 'Nilai Rata-rata 81',
      'education.highSchoolMajor': 'Jurusan Ilmu Pengetahuan Alam (IPA)',
      'experience.bangkitTitle': 'Peserta Cloud Computing',
      'experience.bangkitSubtitle': 'Bangkit Academy yang dipimpin Google, GoTo, dan Traveloka',
      'experience.bangkitOne': 'Menyelesaikan kurikulum Cloud Computing di Bangkit Academy yang mencakup dasar cloud computing, DevOps/SRE, pemrograman web, JavaScript (Node.js), pengembangan backend RESTful API, manajemen database, storage, dan deployment layanan di Google Cloud Platform.',
      'experience.bangkitTwo': 'Mengembangkan backend API menggunakan Express.js dan Node.js yang terintegrasi dengan Cloud SQL dan Google Cloud Storage, serta Gemini API untuk fitur Generative AI.',
      'experience.bangkitThree': 'Melakukan deployment backend API menggunakan App Engine dan model machine learning menggunakan Cloud Run.',
      'experience.bangkitFour': 'Menerapkan pembelajaran tersebut pada project capstone BiteWise, aplikasi modernisasi layanan kesehatan, sebagai syarat kelulusan Bangkit Academy.',
      'experience.accifenceTitle': 'Koordinator Acara Accifence',
      'experience.accifenceSubtitle': 'Asosiasi Informatika',
      'experience.accifenceOne': 'Memimpin tim koordinasi acara yang terdiri dari 4 orang untuk menyelenggarakan orientasi dan pengenalan mata kuliah bagi 109 mahasiswa baru, meliputi Algoritma, Jaringan, Multimedia, Artificial Intelligence, Matematika, dan Fisika.',
      'experience.accifenceTwo': 'Menjadi anggota panitia pelaksana acara nasional MIT-Week (Mulawarman Informatics Tech Week) 2024.',
      'certificates.ai': 'Belajar Dasar AI',
      'certificates.javascript': 'Belajar Dasar Pemrograman JavaScript',
      'certificates.git': 'Belajar Dasar Git dengan GitHub',
      'certificates.web': 'Belajar Dasar Pemrograman Web',
      'certificates.backend': 'Membangun Aplikasi Back-End (GCP)',
      'certificates.ml': 'Menerapkan Machine Learning (GCP)',
      'certificates.software': 'Dasar-Dasar Software Engineering',
      'certificates.python': 'Bahasa Pemrograman Python',
      'certificates.cloud': 'Learning Path Google Cloud Engineer',
      'certificates.issuer': 'Dicoding Indonesia',
      'page.title': 'Wilson Boyaron Hutagalung // Software Engineer & Arsitek Cloud',
      'experience.msibTag': 'Program MSIB',
      'experience.organizationTag': 'Organisasi Mahasiswa',
      'projects.websiteTag': '01 // WEBSITE BISNIS',
      'projects.applicationTag': '02 // APLIKASI BISNIS',
      'footer.copyright': '&copy; 2026 Wilson Boyaron Hutagalung. Hak cipta dilindungi.',
      'footer.status': 'STATUS: OPERASIONAL',
      'terminal.degree': '"S1 Informatika"',
      'terminal.backend': '"Sistem Backend"',
      'terminal.infrastructure': '"Infrastruktur Cloud"',
      'terminal.fullStack': '"Web Full-Stack"',
      'terminal.opportunities': '"Terbuka untuk Peluang Engineering"',
      'terminal.philosophy': '// Filosofi',
      'terminal.motto': '"Tangguh. Optimal. Bersih."'
    }
  };

  function setLanguage(language) {
    const selectedLanguage = translations[language] ? language : 'en';
    document.documentElement.lang = selectedLanguage;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const translation = translations[selectedLanguage][element.dataset.i18n];
      if (translation) element.innerHTML = translation;
    });
    languageButtons.forEach(button => {
      const isActive = button.dataset.language === selectedLanguage;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    localStorage.setItem(languageStorageKey, selectedLanguage);
  }

  languageButtons.forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
  setLanguage(localStorage.getItem(languageStorageKey) || 'en');

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const scrollToTopBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollToTopBtn) {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('is-visible');
      } else {
        scrollToTopBtn.classList.remove('is-visible');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('open');
      navbar.classList.toggle('menu-open');
      // Prevent body scroll when menu is open
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('open');
        navbar.classList.remove('menu-open');
        document.body.style.overflow = '';
      });
    });
  }

  const animatedElements = document.querySelectorAll('[data-anim="fade-up"], .anim-fade-up');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  const certButtons = document.querySelectorAll('.cert-card[data-full]');
  const certModal = document.getElementById('certificateModal');
  const certBackdrop = document.getElementById('certBackdrop');
  const certClose = document.getElementById('certClose');
  const certImage = document.getElementById('certImage');
  const certFrame = document.getElementById('certFrame');
  const certOpenNew = document.getElementById('certOpenNew');
  let currentCertUrl = '';

  function openCertificate(url, type) {
    currentCertUrl = url;
    if (type === 'pdf') {
      certImage.style.display = 'none';
      certFrame.style.display = 'block';
      certFrame.src = url;
    } else {
      certFrame.style.display = 'none';
      certImage.style.display = 'block';
      certImage.src = url;
    }
    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCertificate() {
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      certFrame.src = '';
      certImage.src = '';
    }, 300);
  }

  certButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-full');
      const type = btn.getAttribute('data-type') || 'pdf';
      openCertificate(url, type);
    });
  });

  if (certClose) certClose.addEventListener('click', closeCertificate);
  if (certBackdrop) certBackdrop.addEventListener('click', closeCertificate);
  if (certOpenNew) {
    certOpenNew.addEventListener('click', () => {
      if (currentCertUrl) {
        window.open(currentCertUrl, '_blank');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeCertificate();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Asset URL Resolver
  const scriptElement = document.currentScript || document.querySelector('script[src*="script.js"]');
  const baseDir = scriptElement?.src
    ? new URL('.', scriptElement.src)
    : new URL('.', window.location.href);

  const getAssetUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
    try {
      return new URL(path, baseDir).href;
    } catch {
      return path;
    }
  };

  // Self-heal legacy pathnames from old pushState (e.g. /certifications -> base path + #certifications)
  try {
    const legacyRoutes = ['certifications', 'projects', 'about', 'experience', 'education', 'principles', 'contact'];
    const currentPath = window.location.pathname;
    const matchedRoute = legacyRoutes.find(r => currentPath.endsWith('/' + r) || currentPath === '/' + r);
    if (matchedRoute) {
      const corrected = baseDir.pathname + '#' + matchedRoute;
      window.history.replaceState(null, '', corrected);
    }
  } catch (e) {
    // Graceful no-op
  }

  // Theme Management
  const themeToggles = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
  const getTheme = () => document.documentElement.dataset.theme || 'dark';
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('portfolio-theme', theme);
  };

  themeToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  });

  // Multilanguage / i18n
  const langBtns = document.querySelectorAll('[data-language]');
  const translations = {
    en: {},
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
      'sections.experienceTag': 'Pengalaman',
      'sections.experienceTitle': 'Pengalaman',
      'sections.projectsTag': 'PROJECT UNGGULAN',
      'sections.projectsTitle': 'Project Engineering',
      'projects.preview': 'Lihat Detail',
      'projects.highlightsTitle': 'Arsitektur & Fitur Utama',
      'projects.techTitle': 'Teknologi & Tools',
      'projects.openGithub': 'Repository GitHub',
      'projects.openLive': 'Live Demo / Docs',
      'projects.aressaTitle': 'Aressa Golden Farm',
      'projects.aressaDescription': 'Website company profile untuk Aressa Golden Farm, perusahaan eksportir gula aren. Website ini menampilkan informasi perusahaan dan produk gula aren melalui tampilan modern dan responsif yang dibangun dengan React dan Vite.',
      'projects.posTitle': 'Aplikasi Kasir (Universal POS)',
      'projects.posDescription': 'Aplikasi point of sale desktop yang berjalan secara offline untuk berbagai jenis usaha retail, F&B, jasa, dan lainnya. Aplikasi ini mendukung pengelolaan produk dan jasa, inventori, pelanggan, supplier, shift kasir, riwayat transaksi, laporan penjualan, backup database, serta akses berbasis peran untuk Admin, Kasir, dan Manajer.',
      'projects.cloudTag': 'Cloud Computing & Backend',
      'projects.bitewiseTitle': 'Bitewise Backend API',
      'projects.bitewiseDescription': 'Bitewise adalah platform nutrisi yang menangani tantangan gizi di Indonesia seperti stunting, wasting, obesitas, dan anemia, terutama pada anak-anak dan perempuan. Sebagai bagian dari tim Cloud Computing, saya membangun REST API backend dengan Node.js dan Express untuk menangani autentikasi, akses database, dan penyimpanan file. Saya juga melakukan deployment bersama layanan prediksi machine learning dalam container Docker di Google Cloud. API didokumentasikan menggunakan Postman untuk tim mobile.',
      'projects.hrTag': 'Sistem Presensi Manajemen SDM',
      'projects.hrTitle': 'Sistem Presensi Manajemen SDM',
      'projects.hrDescription': 'Aplikasi presensi dan manajemen kehadiran karyawan berbasis web untuk perusahaan maupun industri. Sistem ini mendukung pencatatan kehadiran harian melalui Clock In/Out, manajemen shift kerja, kalkulasi keterlambatan otomatis, serta pengajuan cuti dan izin. Dilengkapi portal karyawan yang responsif dan panel admin berbasis Filament untuk mengelola data master dan hak akses secara terpusat.',
      'projects.atomosTag': 'Aplikasi Augmented Reality',
      'projects.atomosTitle': 'Atomos — Media Pembelajaran AR Struktur Atom',
      'projects.atomosDescription': 'Aplikasi pembelajaran interaktif berbasis Augmented Reality (AR) untuk memvisualisasikan materi struktur atom kelas X yang abstrak menjadi model 3D interaktif bagi siswa SMA Negeri 16 Samarinda. Dibangun menggunakan Unity, Vuforia Engine, dan C#, aplikasi ini memvisualisasikan 5 model atom 3D dengan animasi orbit elektron, kuis evaluasi pemahaman, serta tabel periodik unsur.',
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
      'hero.cardTitle': 'Kompetensi Teknis',
      'hero.cardPill': 'Fokus Utama',
      'hero.categoryBackend': 'Backend & API',
      'hero.categoryCloud': 'Cloud & Infrastruktur',
      'hero.categoryData': 'Database & Analisis Data',
      'hero.cardStat': 'Lulusan Bangkit 2024',
      'hero.cardLink': 'Tentang Latar Belakang',
      'certificate.open': 'Buka Dokumen PDF',
      'certificate.preview': 'Lihat',
      'certificate.viewImage': 'Lihat Gambar Penuh',
      'about.role': 'Lulusan Informatika',
      'about.heading': 'Software Engineer yang berfokus pada Backend, Cloud Computing, dan Analisis Data.',
      'about.paragraphOne': 'Lulusan Informatika <strong>Universitas Mulawarman</strong> dengan <strong>IPK 3,83/4,00</strong> yang berfokus pada backend engineering, infrastruktur cloud, dan pengembangan solusi berbasis data. Berpengalaman membangun aplikasi web, RESTful API dengan Node.js dan Laravel, serta perancangan database terstruktur.',
      'about.paragraphTwo': 'Di samping rekayasa perangkat lunak, saya memiliki ketertarikan dan antusiasme tinggi pada <strong>Analisis Data dan Pengolahan Data</strong>. Saya terbiasa mengolah dan menganalisis dataset menggunakan SQL, Python, serta <strong>Microsoft Excel</strong> (analisis spreadsheet, pivot table, formula lanjutan, data modeling, dan visualisasi data) untuk menyajikan wawasan yang akurat. Didukung pengalaman <strong>MSIB Bangkit Academy (Jalur Cloud Computing)</strong> serta sertifikasi analisis data dari <strong>DQLab</strong> dan <strong>RevoU</strong>, saya siap menghubungkan rekayasa sistem dengan wawasan analitik.',
      'about.locationLabel': 'Lokasi',
      'about.locationValue': 'Samarinda, Kalimantan Timur',
      'about.degreeLabel': 'Gelar & IPK',
      'about.degreeValue': 'S.Kom — IPK 3,83',
      'about.cloudLabel': 'Keahlian Cloud',
      'about.cloudValue': 'Arsitektur GCP & Cloud API',
      'about.dataLabel': 'Analisis Data',
      'about.dataValue': 'SQL, Python & MS Excel',
      'about.stackLabel': 'Teknologi Utama',
      'about.stackValue': 'Node.js, Express & Laravel',
      'about.statusLabel': 'Status',
      'about.statusValue': 'Terbuka untuk Peluang Kerja',
      'principles.modularTitle': 'Sistem Backend & Modular',
      'principles.modularDescription': 'Merancang sistem backend yang mudah dirawat dengan tanggung jawab yang jelas, modul yang dapat digunakan kembali, dan alur data yang andal.',
      'principles.cloudTitle': 'Cloud Computing & Deployment',
      'principles.cloudDescription': 'Melakukan deployment aplikasi berbasis container dan layanan machine learning menggunakan Google Cloud, App Engine, dan Cloud Run.',
      'principles.apiTitle': 'REST API & Engineering Database',
      'principles.apiDescription': 'Membangun layanan RESTful dengan Node.js dan Express yang terintegrasi dengan database, autentikasi, storage, dan validasi.',
      'principles.uiTitle': 'UI Web & Aplikasi Responsif',
      'principles.uiDescription': 'Membangun antarmuka web responsif dengan React dan tools frontend modern, dengan fokus pada kemudahan penggunaan dan interaksi yang jelas.',
      'education.gpa': 'IPK 3,83 / 4,00',
      'education.universityDegree': 'Sarjana Informatika (S1)',
      'education.universityDescription': 'Berfokus pada Software Engineering, Cloud Computing, Manajemen Database, Struktur Data & Algoritma, serta Augmented Reality.',
      'education.highSchoolScore': 'Nilai Rata-rata 81',
      'education.highSchoolMajor': 'Jurusan Ilmu Pengetahuan Alam (IPA)',
      'experience.arTag': 'Penelitian Skripsi',
      'experience.arTitle': 'Pengembang Aplikasi Augmented Reality “Atomos”',
      'experience.arSubtitle': 'SMA Negeri 16 Samarinda (Penelitian Skripsi)',
      'experience.arOne': 'Mewawancarai guru kimia untuk menggali kendala belajar struktur atom di kelas X, yaitu materi yang abstrak dan masih diajarkan lewat gambar 2D.',
      'experience.arTwo': 'Merancang dan membangun aplikasi AR berbasis marker “Atomos” (C#, Unity, Vuforia, Blender, Figma) melalui 2 iterasi Agile, dengan 5 model atom 3D, animasi orbit elektron, kuis, dan tabel periodik.',
      'experience.arThree': 'Mengujicobakan aplikasi di sekolah secara berkala untuk menemukan error dan kekurangan, lalu memperbaikinya pada iterasi berikutnya.',
      'experience.arFour': 'Menjalankan Pengujian UAT berskala Likert kepada 34 siswa/i dan 1 guru kimia, dengan skor rata-rata 87,2% (siswa/i) dan 92,6% (guru), serta seluruh variabel di atas 80% (kategori Sangat Baik).',
      'experience.kknTag': 'Pengabdian Masyarakat',
      'experience.kknTitle': 'Pengembang Website Profil Dusun & Wakil Ketua Kelompok 6',
      'experience.kknSubtitle': 'KKN Bina Desa 2024/2025 — Fakultas Teknik Universitas Mulawarman x PT Pertamina EP',
      'experience.kknOne': 'Mengidentifikasi kebutuhan dusun, yaitu belum adanya media digital resmi sehingga visibilitas rendah serta promosi wisata dan budaya belum optimal.',
      'experience.kknTwo': 'Merancang dan membangun website resmi Dusun Teluk Lombok (HTML, CSS, JavaScript, VS Code) dengan halaman profil dusun, potensi, galeri, kontak, dan informasi publik, serta mengelola domain dan hosting.',
      'experience.kknThree': 'Mengumpulkan data profil dan dokumentasi potensi dusun (pasir kuning, terumbu karang, dermaga) sebagai konten website.',
      'experience.bangkitTitle': 'Peserta Cloud Computing',
      'experience.bangkitSubtitle': 'Bangkit Academy yang dipimpin Google, GoTo, dan Traveloka',
      'experience.bangkitOne': 'Menyelesaikan kurikulum Cloud Computing di Bangkit Academy yang mencakup dasar cloud computing, DevOps/SRE, pemrograman web, JavaScript (Node.js), pengembangan backend RESTful API, manajemen database, storage, dan deployment layanan di Google Cloud Platform.',
      'experience.bangkitTwo': 'Mengembangkan backend API menggunakan Express.js dan Node.js yang terintegrasi dengan Cloud SQL dan Google Cloud Storage, serta Gemini API untuk fitur Generative AI.',
      'experience.bangkitThree': 'Melakukan deployment backend API menggunakan App Engine dan model machine learning menggunakan Cloud Run.',
      'experience.bangkitFour': 'Menerapkan pembelajaran tersebut pada project capstone BiteWise, aplikasi modernisasi layanan kesehatan, sebagai syarat kelulusan Bangkit Academy.',
      'experience.accifenceTitle': 'Koordinator Acara Accifence',
      'experience.accifenceSubtitle': 'Asosiasi Informatika',
      'experience.accifenceOne': 'Memimpin tim koordinasi acara yang terdiri dari 4 orang untuk menyelenggarakan orientasi dan pengenalan mata kuliah bagi 109 mahasiswa baru, meliputi Algoritma, Jaringan, Multimedia, Artificial Intelligence, Matematika, dan Fisika.',
      'experience.accifenceTwo': 'Menjadi anggota panitia pelaksana acara nasional MIT-Week (Mulawarman Informatics Tech Week) 2023.',
      'experience.communityTag': 'Pengabdian Masyarakat',
      'experience.communityTitle': 'Pelaksana Kegiatan Pengabdian Kepada Masyarakat',
      'experience.communitySubtitle': 'Universitas Mulawarman',
      'experience.communityOne': 'Menyelenggarakan pelatihan mikrokontroler bagi lebih dari 30 siswa SMAN 6 Samarinda bersama tim beranggotakan lima orang, disertai evaluasi berupa pengerjaan soal di akhir pelatihan.',
      'experience.communityTwo': 'Mempublikasikan artikel pengabdian masyarakat dari kegiatan tersebut pada Jurnal Inovasi Teknologi Masyarakat (INTEKMAS).',
      'certificates.ai': 'Belajar Dasar AI',
      'certificates.javascript': 'Belajar Dasar Pemrograman JavaScript',
      'certificates.git': 'Belajar Dasar Git dengan GitHub',
      'certificates.web': 'Belajar Dasar Pemrograman Web',
      'certificates.backend': 'Membangun Aplikasi Back-End (GCP)',
      'certificates.ml': 'Menerapkan Machine Learning (GCP)',
      'certificates.software': 'Dasar-Dasar Software Engineering',
      'certificates.python': 'Bahasa Pemrograman Python',
      'certificates.cloud': 'Learning Path Google Cloud Engineer',
      'certificates.logic': 'Pengenalan ke Logika Pemrograman',
      'certificates.bangkit': 'Cloud Computing Bangkit',
      'certificates.dqlab': 'Data Analyst dengan Python & SQL',
      'certificates.dqlabIssuer': 'DQLab',
      'certificates.revou': 'Mini Course Data Analytics',
      'certificates.revouIssuer': 'RevoU',
      'certificates.visualisasiData': 'Visualisasi Data',
      'certificates.visualisasiDataIssuer': 'DQLab',
      'certificates.hciaCloud': 'HCIA-Cloud Service V3.5',
      'certificates.hciaCloudIssuer': 'Huawei',
      'certificates.hciaDatacom': 'HCIA-Datacom V1.0',
      'certificates.hciaDatacomIssuer': 'Huawei',
      'certificates.issuer': 'Dicoding Indonesia',
      'certificates.bangkitIssuer': 'Bangkit Academy (Google, GoTo, Traveloka)',
      'page.title': 'Wilson Boyaron Hutagalung | Software Engineer & Spesialis Cloud',
      'experience.msibTag': 'Program MSIB',
      'experience.organizationTag': 'Organisasi Mahasiswa',
      'projects.websiteTag': 'Website Profil & Bisnis',
      'projects.applicationTag': 'Aplikasi Bisnis & POS',
      'footer.copyright': '&copy; 2026 Wilson Boyaron Hutagalung. Hak cipta dilindungi.'
    }
  };

  // Auto-harvest base English strings from DOM
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    translations.en[el.dataset.i18n] = el.tagName === 'TITLE' ? el.textContent.trim() : el.innerHTML.trim();
  });

  const setLanguage = (lang) => {
    const selected = translations[lang] ? lang : 'en';
    document.documentElement.lang = selected;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const text = translations[selected]?.[el.dataset.i18n];
      if (text !== undefined) {
        if (el.tagName === 'TITLE') {
          el.textContent = text;
          document.title = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    langBtns.forEach((btn) => {
      const active = btn.dataset.language === selected;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    localStorage.setItem('portfolio-language', selected);
  };

  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.language));
  });

  const savedLang = localStorage.getItem('portfolio-language');
  if (savedLang && savedLang !== 'en') {
    setLanguage(savedLang);
  } else {
    setLanguage('en');
  }

  // Navigasi & Smooth Scroll
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const scrollTopBtn = document.getElementById('scrollToTop');

  const layerIds = ['about', 'principles', 'education', 'experience', 'projects', 'certifications', 'contact'];
  const navLinkItems = Array.from(document.querySelectorAll('.navbar__link'));

  const updateActiveNav = (id) => {
    navLinkItems.forEach((link) => {
      const isActive = Boolean(id) && link.hash === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const showHome = () => {
    document.body.classList.remove('layer-mode');
    document.querySelectorAll('.section.layer-active').forEach((section) => {
      section.classList.remove('layer-active');
    });
    updateActiveNav(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const showLayer = (id) => {
    const section = document.getElementById(id);
    if (!section || !layerIds.includes(id)) return false;

    document.body.classList.add('layer-mode');
    document.querySelectorAll('.section.layer-active').forEach((activeSection) => {
      if (activeSection !== section) activeSection.classList.remove('layer-active');
    });
    section.classList.add('layer-active');
    updateActiveNav(id);
    window.scrollTo({ top: 0, behavior: 'auto' });
    return true;
  };

  const navigateTo = (targetId) => {
    const id = targetId.replace(/^[/#!]+/, '');
    if (!id || id === 'hero' || id === 'home') {
      showHome();
      return true;
    }
    return showLayer(id);
  };

  document.querySelectorAll('a[href^="#"], a[href^="/"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    link.addEventListener('click', (e) => {
      const targetId = link.hash ? link.hash.slice(1) : href.replace(/^[/#!]+/, '');

      if (navigateTo(targetId)) {
        e.preventDefault();
        if (targetId && targetId !== 'hero') {
          window.history.pushState(null, '', `#${targetId}`);
        } else {
          window.history.pushState(null, '', window.location.pathname);
        }
      }
    });
  });

  window.addEventListener('popstate', () => {
    navigateTo(window.location.hash.slice(1));
  });

  if (window.location.hash) {
    window.requestAnimationFrame(() => {
      navigateTo(window.location.hash.slice(1));
    });
  } else {
    showHome();
  }

  // Scroll listener for floating bar & back-to-top button
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 50);
    scrollTopBtn?.classList.toggle('is-visible', y > 300);
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile menu toggle
  if (navToggle && navLinks) {
    const toggleMenu = (open) => {
      const isOpen = open ?? !navLinks.classList.contains('active');
      navLinks.classList.toggle('active', isOpen);
      navToggle.classList.toggle('open', isOpen);
      navbar.classList.toggle('menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    const navClose = document.getElementById('navClose');
    if (navClose) {
      navClose.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(false);
      });
    }

    const navBackdrop = document.getElementById('navBackdrop');
    if (navBackdrop) {
      navBackdrop.addEventListener('click', () => toggleMenu(false));
    }

    navLinks.querySelectorAll('.navbar__link').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }

  // Animasi Scroll (Fade Up)
  const animElements = document.querySelectorAll('[data-anim="fade-up"]');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach((el) => {
    if (el.dataset.animDelay) {
      el.style.transitionDelay = `${el.dataset.animDelay}ms`;
    }
    animObserver.observe(el);
  });

  // Modal (Sertifikat & Proyek)
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modal === certModal) {
      if (certFrame) certFrame.src = '';
      if (certImage) {
        certImage.style.display = 'none';
        certImage.src = '';
      }
    }
  };

  // Certificate Modal Logic
  const certModal = document.getElementById('certificateModal');
  const certImage = document.getElementById('certImage');
  const certFrame = document.getElementById('certFrame');
  const certTitleEl = document.getElementById('certTitle');
  const certIssuerEl = document.getElementById('certIssuer');
  let currentCert = { full: '', image: '' };

  if (certImage) {
    certImage.addEventListener('error', () => {
      // Gracefully fall back to PDF preview in iframe if image is unavailable
      if (currentCert.full && certFrame) {
        certImage.style.display = 'none';
        certFrame.style.display = 'block';
        certFrame.src = currentCert.full;
      }
    });

    certImage.addEventListener('load', () => {
      if (certImage.getAttribute('src')) {
        certImage.style.display = 'block';
        if (certFrame) {
          certFrame.style.display = 'none';
          certFrame.src = '';
        }
      }
    });
  }

  const openCertificate = (btn) => {
    currentCert.full = btn.dataset.full ? getAssetUrl(btn.dataset.full) : '';
    currentCert.image = btn.dataset.image ? getAssetUrl(btn.dataset.image) : '';

    if (certTitleEl) certTitleEl.textContent = btn.querySelector('.cert-card__title')?.textContent || 'Certificate Preview';
    if (certIssuerEl) certIssuerEl.textContent = btn.querySelector('.cert-card__issuer')?.textContent || '';

    if (currentCert.image && certImage) {
      certImage.style.display = 'block';
      certImage.src = currentCert.image;
      if (certFrame) {
        certFrame.style.display = 'none';
        certFrame.src = '';
      }
    } else if (currentCert.full && certFrame) {
      if (certImage) certImage.style.display = 'none';
      certFrame.style.display = 'block';
      certFrame.src = currentCert.full;
    }

    openModal(certModal);
  };

  document.querySelectorAll('.cert-card').forEach((btn) => {
    btn.addEventListener('click', () => openCertificate(btn));
  });

  document.getElementById('certViewImage')?.addEventListener('click', () => {
    const target = currentCert.image || currentCert.full;
    if (target) window.open(target, '_blank', 'noopener,noreferrer');
  });

  document.getElementById('certOpenNew')?.addEventListener('click', () => {
    const target = currentCert.full || currentCert.image;
    if (target) window.open(target, '_blank', 'noopener,noreferrer');
  });

  // Project Modal Logic & Content
  const projectData = {
    aressa: {
      image: 'assets/projects/aressa-golden-farm.jpg',
      github: 'https://github.com/WilsonHutagalung/ARESSA-GOLDEN-FARM',
      demo: '',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Lucide React', 'Modern UI'],
      en: {
        tag: 'Export Showcase & Company Profile',
        title: 'Aressa Golden Farm',
        desc: 'A modern company profile and export showcase website for Aressa Golden Farm, a premier Indonesian exporter of pure organic palm sugar. The platform establishes international brand credibility, features comprehensive product catalog specifications, and provides direct buyer inquiry channels.',
        highlights: [
          'High-performance reactive frontend built with React, Vite, and Tailwind CSS.',
          'Interactive product catalog with export grade specifications and logistics overview.',
          'Modern visual branding with warm organic tones and glassmorphism elements.',
          'Direct inquiry integration for overseas distributors and business partners.'
        ]
      },
      id: {
        tag: 'Website Profil & Etalase Ekspor',
        title: 'Aressa Golden Farm',
        desc: 'Website company profile dan etalase ekspor modern untuk Aressa Golden Farm, produsen serta eksportir gula aren organik premium asal Indonesia. Platform ini dirancang untuk membangun kredibilitas pasar internasional dan menampilkan spesifikasi produk ekspor secara profesional.',
        highlights: [
          'Frontend reaktif berkinerja tinggi yang dibangun menggunakan React, Vite, dan Tailwind CSS.',
          'Katalog produk interaktif dengan informasi spesifikasi mutu standar ekspor internasional.',
          'Branding visual modern dengan sentuhan warna organik dan nuansa glassmorphism elegan.',
          'Integrasi formulir pemesanan langsung untuk distributor dan mitra bisnis global.'
        ]
      }
    },
    pos: {
      image: 'assets/projects/aplikasi-kasir.png',
      github: 'https://github.com/WilsonHutagalung/Aplikasi-Kasir',
      demo: '',
      tech: ['Laravel / PHP', 'React / Vite', 'Electron', 'PostgreSQL', 'Sanctum'],
      en: {
        tag: 'Offline-First POS System',
        title: 'Cashier Application (Universal POS)',
        desc: 'A robust offline-first desktop point-of-sale system engineered for retail establishments, food & beverage businesses, and service providers. It guarantees continuous store operations even during internet outages with instantaneous barcode processing and inventory tracking.',
        highlights: [
          'Cross-platform desktop software powered by Electron and a reactive React/Vite UI.',
          'Local offline database persistence utilizing PostgreSQL with automated backup routines.',
          'Complete cashier shift management, sales reporting, and role-based access (Admin, Cashier, Manager).',
          'Fast barcode scanner integration, stock deduction logic, and printable invoice receipts.'
        ]
      },
      id: {
        tag: 'Sistem Kasir Offline-First',
        title: 'Aplikasi Kasir (Universal POS)',
        desc: 'Sistem point-of-sale desktop offline-first yang andal untuk toko retail, kafe/F&B, dan berbagai sektor usaha. Menjamin transaksi kasir tetap berlangsung lancar tanpa ketergantungan koneksi internet dengan kecepatan proses transaksi tinggi.',
        highlights: [
          'Aplikasi desktop cross-platform berbasis Electron dengan antarmuka modern React/Vite.',
          'Penyimpanan database lokal offline menggunakan PostgreSQL serta utilitas pencadangan otomatis.',
          'Manajemen shift kasir lengkap, analitik penjualan, dan hak akses bertingkat (Admin, Kasir, Manajer).',
          'Integrasi pemindai barcode, kalkulasi stok otomatis, dan pencetakan struk pembayaran instan.'
        ]
      }
    },
    bitewise: {
      image: 'assets/projects/bitewise-backend-api.jpg',
      github: 'https://github.com/bitewise-lab/Backend-API',
      demo: 'https://documenter.getpostman.com/view/37436900/2sAYBd7nhY',
      tech: ['Node.js', 'Express.js', 'MySQL', 'Google Cloud', 'Docker', 'JWT', 'Postman'],
      en: {
        tag: 'Cloud Architecture & REST API',
        title: 'Bitewise Backend API',
        desc: 'A cloud-native health and nutrition platform tackling national nutrition challenges in Indonesia such as stunting, wasting, obesity, and anemia. As part of the Cloud Computing team, Wilson architected the RESTful backend, database clustering, and deployed containerized services on Google Cloud.',
        highlights: [
          'Scalable RESTful microservices architecture developed using Node.js and Express.',
          'High-availability deployments using App Engine and Cloud Run containers on Google Cloud.',
          'Integrated with Cloud SQL (MySQL), Cloud Storage, and Gemini API for AI nutrition assistance.',
          'Comprehensive Postman API documentation and secure JWT-based token authentication.'
        ]
      },
      id: {
        tag: 'Arsitektur Cloud & REST API',
        title: 'Bitewise Backend API',
        desc: 'Platform nutrisi dan kesehatan berbasis cloud untuk menanggulangi tantangan gizi nasional seperti stunting, wasting, dan anemia pada anak serta perempuan di Indonesia. Wilson bertanggung jawab merancang backend API, database, dan deployment container di Google Cloud Platform.',
        highlights: [
          'Arsitektur RESTful microservices skalabel yang dibangun dengan Node.js dan Express.',
          'Deployment berkinerja tinggi pada App Engine dan container Cloud Run di Google Cloud Platform.',
          'Terhubung dengan Cloud SQL (MySQL), Cloud Storage, dan integrasi Gemini AI untuk asisten nutrisi.',
          'Dokumentasi API lengkap via Postman serta sistem autentikasi keamanan berbasis token JWT.'
        ]
      }
    },
    hr: {
      image: 'assets/projects/hr-management-system.png',
      github: 'https://github.com/WilsonHutagalung/Sistem-Presensi-Manajemen-SDM',
      demo: '',
      tech: ['Laravel 12', 'Filament v5', 'PHP 8.2', 'MySQL', 'Tailwind CSS', 'Blade'],
      en: {
        tag: 'HR Management & Attendance System',
        title: 'HR Management & Attendance System',
        desc: 'An enterprise workforce attendance and personnel management system. It provides comprehensive employee shift monitoring, real-time clock-in/out logging, automated late calculation, and centralized administrative management.',
        highlights: [
          'Enterprise admin control panel built with Laravel 12 and Filament v5.',
          'Real-time Clock In / Clock Out with automatic late arrival and overtime calculations.',
          'Employee self-service portal for leave, sickness, and permission requests.',
          'Multi-shift work scheduling, role-based access control, and CSV/PDF attendance exports.'
        ]
      },
      id: {
        tag: 'Sistem Presensi Manajemen SDM',
        title: 'Sistem Presensi Manajemen SDM',
        desc: 'Sistem presensi karyawan dan administrasi SDM berbasis web tingkat enterprise. Mengoptimalkan pemantauan shift kerja, pencatatan absensi real-time, kalkulasi keterlambatan otomatis, serta sentralisasi pengelolaan data staf.',
        highlights: [
          'Panel kontrol administrasi modern dan responsif berbasis Laravel 12 dan Filament v5.',
          'Pencatatan Clock In / Out real-time dengan kalkulasi otomatis keterlambatan dan durasi lembur.',
          'Portal mandiri bagi karyawan untuk pengajuan cuti, izin sakit, dan verifikasi kehadiran.',
          'Manajemen multi-shift, sistem hak akses bertingkat, dan rekapitulasi data presensi periodik.'
        ]
      }
    },
    atomos: {
      image: 'assets/projects/Aplikas-AR-Struktur-Atom.png',
      github: '',
      demo: '',
      tech: ['Unity', 'Vuforia Engine', 'C#', 'Blender', 'Figma', 'Android'],
      en: {
        tag: 'Augmented Reality Application',
        title: 'Atomos — Augmented Reality Chemistry Learning',
        desc: 'A marker-based Augmented Reality educational application developed for SMA Negeri 16 Samarinda to help high school students visualize abstract 3D atomic structures. Features 5 interactive 3D atomic models, real-time electron orbit animations, comprehensive learning materials, quizzes, and a dynamic periodic table.',
        highlights: [
          'Engineered interactive 3D atomic models (Dalton, Thomson, Rutherford, Bohr, and Quantum Mechanical Model) with real-time electron orbit animations.',
          'Built with Unity and Vuforia Engine utilizing high-accuracy marker-based AR tracking on Android devices.',
          'Conducted 2 Agile iterations incorporating direct chemistry teacher feedback and periodic classroom testing.',
          'Achieved outstanding Likert-scale UAT scores: 87.2% student acceptance (34 students) and 92.6% teacher evaluation (Very Good category).'
        ]
      },
      id: {
        tag: 'Aplikasi Augmented Reality',
        title: 'Atomos — Media Pembelajaran AR Struktur Atom',
        desc: 'Aplikasi Augmented Reality (AR) berbasis marker “Atomos” yang dikembangkan untuk SMA Negeri 16 Samarinda guna membantu visualisasi materi struktur atom kelas X yang abstrak menjadi model 3D interaktif. Dilengkapi 5 model atom 3D, animasi orbit elektron, kuis evaluasi, dan tabel periodik unsur.',
        highlights: [
          'Merancang dan membangun 5 model atom 3D (Dalton, Thomson, Rutherford, Bohr, dan Mekanika Kuantum) beserta animasi orbit elektron.',
          'Pengembangan menggunakan C#, Unity, dan Vuforia Engine dengan pelacakan marker berakurasi tinggi untuk perangkat Android.',
          'Dikembangkan melalui 2 iterasi Agile dengan pengujian berkala di sekolah bersama guru kimia untuk evaluasi dan perbaikan fitur.',
          'Meraih hasil Pengujian UAT berskala Likert sebesar 87,2% dari 34 siswa/i dan 92,6% dari guru kimia (kategori Sangat Baik).'
        ]
      }
    }
  };


  const projModal = document.getElementById('projectModal');
  const projImage = document.getElementById('projImage');
  const projTag = document.getElementById('projTag');
  const projTitle = document.getElementById('projTitle');
  const projDesc = document.getElementById('projDesc');
  const projHighlights = document.getElementById('projHighlights');
  const projTech = document.getElementById('projTech');
  const projGithub = document.getElementById('projGithub');
  const projDemo = document.getElementById('projDemo');

  const openProject = (id) => {
    const data = projectData[id];
    if (!data) return;

    const lang = localStorage.getItem('portfolio-language') || 'en';
    const content = data[lang] || data.en;

    if (projImage) projImage.src = getAssetUrl(data.image);
    if (projTag) projTag.textContent = content.tag;
    if (projTitle) projTitle.textContent = content.title;
    if (projDesc) projDesc.textContent = content.desc;

    if (projHighlights) {
      projHighlights.innerHTML = content.highlights.map((h) => `<li>${h}</li>`).join('');
    }
    if (projTech) {
      projTech.innerHTML = data.tech.map((t) => `<span>${t}</span>`).join('');
    }

    if (projGithub) {
      projGithub.href = data.github || '#';
      projGithub.style.display = data.github ? 'inline-flex' : 'none';
    }
    if (projDemo) {
      projDemo.href = data.demo || '#';
      projDemo.style.display = data.demo ? 'inline-flex' : 'none';
    }

    openModal(projModal);
  };

  document.querySelectorAll('.project-preview-trigger').forEach((el) => {
    const trigger = (e) => {
      e.stopPropagation();
      const id = el.dataset.project;
      if (id) openProject(id);
    };
    el.addEventListener('click', trigger);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') trigger(e);
    });
  });

  // Modal close handlers (backdrop, close button, and ESC key)
  const bindCloseBtn = (id, modal) => {
    const btn = document.getElementById(id);
    if (!btn || !modal) return;
    const handleClose = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal(modal);
    };
    btn.addEventListener('click', handleClose);
    btn.addEventListener('touchend', handleClose);
  };

  bindCloseBtn('certModalClose', certModal);
  bindCloseBtn('projectModalClose', projModal);

  // Click on close button via delegated event on modals as well
  document.querySelectorAll('.certificate-modal__close, .project-modal__close').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentModal = btn.closest('.certificate-modal, .project-modal');
      if (parentModal) closeModal(parentModal);
    });
  });

  [certModal, projModal].filter(Boolean).forEach((modal) => {
    modal.querySelector('[class$="__backdrop"]')?.addEventListener('click', () => closeModal(modal));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [certModal, projModal].filter(Boolean).forEach((modal) => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
          if (modal === certModal && certFrame) {
            setTimeout(() => { certFrame.src = ''; }, 200);
          }
        }
      });
    }
  });
});

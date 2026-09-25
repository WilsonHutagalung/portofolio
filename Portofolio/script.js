/**
 * Portfolio Interactive Scripts
 * Handles Dark/Light Theme Switching, Mobile Nav, Scroll Reveal, and Certificate Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. THEME TOGGLE LOGIC
     -------------------------------------------------------------------------- */
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

  /* --------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & MOBILE TOGGLE
     -------------------------------------------------------------------------- */
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


  /* --------------------------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
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

  /* --------------------------------------------------------------------------
     4. CERTIFICATE MODAL PREVIEW
     -------------------------------------------------------------------------- */
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

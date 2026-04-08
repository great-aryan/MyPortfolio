/* ============================================================
   ARYAN SHRIVASTAVA — PORTFOLIO MAIN.JS
   ============================================================ */

/* ─── THEME TOGGLE ─────────────────────────────────────────── */
const html        = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  if (theme === 'light') {
    themeIcon.className = 'bx bx-moon';
  } else {
    themeIcon.className = 'bx bx-sun';
  }
}

// Load saved theme (default: dark)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* ─── MOBILE NAV ────────────────────────────────────────────── */
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

function openNav()  { navMenu.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeNav() { navMenu.classList.remove('open'); document.body.style.overflow = ''; }

if (navToggle) navToggle.addEventListener('click', openNav);
if (navClose)  navClose.addEventListener('click', closeNav);

// Close on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// Close on backdrop tap
navMenu.addEventListener('click', (e) => {
  if (e.target === navMenu) closeNav();
});


/* ─── HEADER SCROLL EFFECT ─────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ─── ACTIVE NAV LINK ON SCROLL ─────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4, rootMargin: `-${80}px 0px -40% 0px` });

sections.forEach(s => sectionObserver.observe(s));


/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});


/* ─── TYPEWRITER ────────────────────────────────────────────── */
const typewriterEl = document.getElementById('typewriter-target');

if (typewriterEl) {
  const phrases = [
    'Android Apps',
    'AI/ML Models',
    'Full-Stack Systems',
    'Power BI Dashboards',
    'Open Source Tools',
  ];
  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  const TYPING_SPEED   = 85;
  const DELETING_SPEED = 45;
  const PAUSE_AFTER    = 2000;
  const PAUSE_BEFORE   = 400;

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typewriterEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, PAUSE_AFTER);
        return;
      }
      setTimeout(typeLoop, TYPING_SPEED);
    } else {
      typewriterEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, PAUSE_BEFORE);
        return;
      }
      setTimeout(typeLoop, DELETING_SPEED);
    }
  }
  typeLoop();
}


/* ─── CUSTOM CURSOR ─────────────────────────────────────────── */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

if (cursor && cursorFollower && window.matchMedia('(hover: hover)').matches) {
  let fx = 0, fy = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    cx = e.clientX;
    cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  }, { passive: true });

  function animateCursor() {
    fx += (cx - fx) * 0.12;
    fy += (cy - fy) * 0.12;
    cursorFollower.style.left = fx + 'px';
    cursorFollower.style.top  = fy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale on hover of interactive elements
  const hoverTargets = 'a, button, .project-card, .skill-group, .award-item, .timeline__card';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform         = 'translate(-50%, -50%) scale(2.5)';
      cursor.style.opacity           = '0.5';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform         = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity           = '1';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}


/* ─── COPY EMAIL BUTTON ─────────────────────────────────────── */
document.querySelectorAll('.contact__copy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      const tip = btn.querySelector('.contact__copy-tip');
      if (tip) tip.textContent = 'Copied!';
      setTimeout(() => btn.classList.remove('copied'), 2000);
    }).catch(() => {
      // Fallback for non-https
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity  = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 2000);
    });
  });
});


/* ─── CONTACT FORM (EmailJS) ────────────────────────────────── */
/*
  TO ACTIVATE:
  1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
  2. Create a Service (Gmail etc.) → copy Service ID
  3. Create an Email Template using variables: {{name}}, {{email}}, {{subject}}, {{message}}
     → copy Template ID
  4. Go to Account → copy your Public Key
  5. Replace the three placeholder strings below
*/
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← replace
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // ← replace

const contactForm  = document.getElementById('contact-form');
const formStatus   = document.getElementById('form-status');
const formSubmitBtn = document.getElementById('form-submit');

if (contactForm) {
  // Init EmailJS only if keys are set
  if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email-input').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      setStatus('Please fill in all required fields.', true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid email address.', true);
      return;
    }

    // If EmailJS not configured, open mailto as fallback
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || typeof emailjs === 'undefined') {
      const mailtoLink = `mailto:aryans2808@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;
      setStatus('Opening your email client…');
      return;
    }

    // Send via EmailJS
    formSubmitBtn.disabled   = true;
    formSubmitBtn.textContent = 'Sending…';

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name, email, subject: subject || 'Portfolio Contact', message
      });
      setStatus('Message sent! I\'ll get back to you soon. 🚀');
      contactForm.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('Failed to send. Please email me directly at aryans2808@gmail.com', true);
    } finally {
      formSubmitBtn.disabled   = false;
      formSubmitBtn.innerHTML  = "<i class='bx bx-send'></i> Send Message";
    }
  });
}

function setStatus(msg, isError = false) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.className   = 'form__status' + (isError ? ' error' : '');
  setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 6000);
}


/* ─── SMOOTH SCROLL OFFSET (for fixed header) ─────────────────*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth'
    });
  });
});


/* ─── TIMELINE ITEMS STAGGER REVEAL ────────────────────────── */
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateX(0)';
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline__item').forEach((item, i) => {
  item.style.opacity      = '0';
  item.style.transform    = 'translateX(-24px)';
  item.style.transition   = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
  timelineObserver.observe(item);
});

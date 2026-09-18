/* ===================================================
   STUDENT LIFE+ — JavaScript
   Interactions, Animations & Form Handling
   =================================================== */

'use strict';

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticles();
  initScrollReveal();
  initPartnersTabs();
  initForms();
  initBackToTop();
  initHamburger();
  initCounters();
  initPillarHover();
  initDemoPlatform();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });

        // Close mobile menu if open
        const navLinks = document.getElementById('nav-links');
        const hamburger = document.getElementById('hamburger');
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.style.transform = isOpen ? 'rotate(90deg)' : '';

    // Animate hamburger spans
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.style.transform = '';
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// ===== PARTICLES =====
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['rgba(14,165,233,', 'rgba(236,72,153,', 'rgba(139,92,246,', 'rgba(234,179,8,'];
  const count = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.4 + 0.1;

    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color}${opacity});
      border-radius: 50%;
      animation: particleFloat ${duration}s ease-in-out ${delay}s infinite alternate;
      pointer-events: none;
    `;

    container.appendChild(particle);
  }

  // Inject particle animation
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes particleFloat {
        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
        100% { transform: translateY(-40px) translateX(20px) scale(1.3); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  // Add reveal classes to elements
  const revealSelectors = [
    { sel: '.pain-card', cls: 'reveal', delay: 150 },
    { sel: '.pillar-card', cls: 'reveal', delay: 100 },
    { sel: '.tech-card', cls: 'reveal', delay: 150 },
    { sel: '.partner-logo-card', cls: 'reveal', delay: 60 },
    { sel: '.team-card', cls: 'reveal', delay: 100 },
    { sel: '.section-header', cls: 'reveal', delay: 0 },
    { sel: '.section-header-light', cls: 'reveal', delay: 0 },
    { sel: '.solution-banner', cls: 'reveal', delay: 0 },
    { sel: '.advisor-banner', cls: 'reveal', delay: 0 },
    { sel: '.cta-content', cls: 'reveal', delay: 0 },
    { sel: '.cta-form-card', cls: 'reveal', delay: 100 },
    { sel: '.ambassador-content > *', cls: 'reveal', delay: 150 },
  ];

  revealSelectors.forEach(({ sel, cls }) => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
        el.classList.add(cls);
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger children if they're grid items
        const el = entry.target;
        const siblings = el.parentElement ? Array.from(el.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right')) : [];
        const index = siblings.indexOf(el);
        const staggerDelay = Math.min(index * 80, 400);

        setTimeout(() => {
          el.classList.add('visible');
        }, staggerDelay);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ===== PARTNERS TABS =====
function initPartnersTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.partner-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('tab-active'));
      panels.forEach(p => {
        p.classList.remove('active');
        p.style.animation = '';
      });

      btn.classList.add('tab-active');
      const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.animation = 'tabFadeIn 0.4s ease both';
      }
    });
  });

  // Inject tab animation
  if (!document.getElementById('tab-style')) {
    const style = document.createElement('style');
    style.id = 'tab-style';
    style.textContent = `
      @keyframes tabFadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== FORM HANDLING =====
function initForms() {
  // Student form
  const studentForm = document.getElementById('student-register-form');
  if (studentForm) {
    studentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(studentForm, 'student');
    });
  }

  // Business form
  const bizForm = document.getElementById('business-register-form');
  if (bizForm) {
    bizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(bizForm, 'business');
    });
  }

  // Add real-time validation
  document.querySelectorAll('.cta-form input, .cta-form select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.style.boxShadow = '';
    });
  });
}

function validateField(field) {
  if (field.required && !field.value.trim()) {
    field.style.borderColor = 'rgba(239, 68, 68, 0.6)';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.12)';
    return false;
  }
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      field.style.borderColor = 'rgba(239, 68, 68, 0.6)';
      field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.12)';
      return false;
    }
  }
  field.style.borderColor = 'rgba(20, 184, 166, 0.5)';
  field.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.12)';
  return true;
}

function handleFormSubmit(form, type) {
  const fields = form.querySelectorAll('input[required], select');
  let valid = true;

  fields.forEach(field => {
    if (!validateField(field)) valid = false;
  });

  if (!valid) {
    const firstInvalid = form.querySelector('[style*="rgba(239"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Loading state
  submitBtn.innerHTML = `<svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="60" stroke-dashoffset="20" stroke-linecap="round"/></svg> Đang xử lý...`;
  submitBtn.disabled = true;

  // Inject spinner animation
  if (!document.getElementById('spin-style')) {
    const style = document.createElement('style');
    style.id = 'spin-style';
    style.textContent = `.spin-icon { animation: spinAnim 1s linear infinite; } @keyframes spinAnim { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }

  // Simulate API call
  setTimeout(() => {
    form.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    const successEl = document.getElementById('cta-success');
    if (successEl) {
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { successEl.hidden = true; }, 6000);
    }

    // Reset field border styles
    fields.forEach(f => {
      f.style.borderColor = '';
      f.style.boxShadow = '';
    });
  }, 1800);
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
  const stats = document.querySelectorAll('.stat-number, .pain-number, .amb-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const numMatch = text.match(/[\d.]+/);

        if (numMatch) {
          const target = parseFloat(numMatch[0]);
          const suffix = text.replace(numMatch[0], '');
          const isDecimal = numMatch[0].includes('.');
          animateCounter(el, target, suffix, isDecimal);
        }

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

function animateCounter(el, target, suffix, isDecimal) {
  const duration = 1500;
  const start = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Easing
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startValue + (target - startValue) * eased;

    el.textContent = isDecimal
      ? current.toFixed(1) + suffix
      : Math.round(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    }
  }

  requestAnimationFrame(update);
}

// ===== PILLAR CARD HOVER EFFECTS =====
function initPillarHover() {
  const cards = document.querySelectorAll('.pillar-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.15s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Tech cards 3D effect
  const techCards = document.querySelectorAll('.tech-card');
  techCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.15s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
}

// ===== ACTIVE NAV LINK on scroll =====
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY + (navbar ? navbar.offsetHeight + 20 : 80);

    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      link.style.background = '';
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.style.color = 'rgba(255,255,255,1)';
        link.style.background = 'rgba(255,255,255,0.1)';
      }
    });
  }, { passive: true });
})();

// ===== DEMO PLATFORM SECTION =====
function initDemoPlatform() {
  const tabs       = document.querySelectorAll('.demo-tab');
  const panels     = document.querySelectorAll('.demo-panel');
  const indicator  = document.getElementById('demo-tab-indicator');
  const tabsBar    = document.getElementById('demo-tabs');

  if (!tabs.length || !indicator) return;

  // ── Move sliding indicator under active tab ──
  function moveIndicator(tab) {
    const tabRect  = tab.getBoundingClientRect();
    const barRect  = tabsBar.getBoundingClientRect();
    const scrollLeft = tabsBar.scrollLeft;
    indicator.style.left  = (tabRect.left - barRect.left + scrollLeft) + 'px';
    indicator.style.width = tabRect.width + 'px';
  }

  // Init indicator position immediately
  const activeTab = document.querySelector('.demo-tab-active');
  if (activeTab) requestAnimationFrame(() => moveIndicator(activeTab));
  window.addEventListener('resize', () => {
    const cur = document.querySelector('.demo-tab-active');
    if (cur) moveIndicator(cur);
  });

  // ── Tab colour map ──
  const tabColors = {
    hoc:  'var(--cyber-blue)',
    lam:  'var(--magenta)',
    song: 'var(--yellow-bright)',
    khoe: 'var(--teal)',
    nghe: 'var(--purple)'
  };

  // ── Switch Panel ──
  function switchPanel(targetPillar) {
    tabs.forEach(t => {
      const isTarget = t.dataset.pillar === targetPillar;
      t.classList.toggle('demo-tab-active', isTarget);
      t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      if (isTarget) moveIndicator(t);
    });

    panels.forEach(p => {
      const isTarget = p.id === `panel-${targetPillar}`;
      p.classList.toggle('demo-panel-active', isTarget);
      if (isTarget) {
        p.removeAttribute('hidden');
        p.style.animation = 'none';
        void p.offsetWidth;
        p.style.animation = '';
        animatePanelStats(p);
      } else {
        p.setAttribute('hidden', '');
      }
    });

    const color = tabColors[targetPillar] || 'var(--cyber-blue)';
    indicator.style.background = `linear-gradient(90deg, ${color}, var(--magenta))`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchPanel(tab.dataset.pillar));
    tab.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchPanel(tab.dataset.pillar);
      }
    });
  });

  // ── Filter tags ──
  document.querySelectorAll('.demo-filter-tags').forEach(row => {
    row.querySelectorAll('.filter-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        row.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('filter-active'));
        tag.classList.add('filter-active');
      });
    });
  });

  // ── Demo feature card buttons → toast ──
  document.querySelectorAll('.dfc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showDemoToast('🚀 Tính năng này có trong phiên bản đầy đủ!');
    });
  });

  // ── AI Chat Simulation (HỌC panel) ──
  const aiInput  = document.getElementById('hoc-ai-input');
  const aiSend   = document.getElementById('hoc-ai-send');
  const aiMsgs   = document.getElementById('hoc-ai-messages');

  const aiReplies = [
    'Tuyệt vời! Tôi đang tạo 20 câu trắc nghiệm cho môn {subject}... ⏳',
    'Đã tìm thấy 3 gia sư phù hợp cho {subject} trong bán kính 2km! 🎓',
    'Đề cương {subject} đã được tóm tắt thành 5 flashcard ngắn gọn! ✅',
    'Lịch ôn thi {subject} đã được sắp xếp tối ưu theo thời khóa biểu! 📅',
    'AI đã phân tích đề thi {subject} 3 năm gần nhất — 5 dạng bài quan trọng! 🔍',
  ];

  function simulateAIReply(subject) {
    if (!aiMsgs) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg ai-msg-user';
    userMsg.textContent = subject;
    aiMsgs.appendChild(userMsg);

    const typing = document.createElement('div');
    typing.className = 'ai-msg ai-msg-typing';
    typing.textContent = 'AI đang xử lý... ✦ ✦ ✦';
    aiMsgs.appendChild(typing);
    aiMsgs.scrollTop = aiMsgs.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)]
        .replace('{subject}', subject);
      const botMsg = document.createElement('div');
      botMsg.className = 'ai-msg ai-msg-bot';
      botMsg.textContent = reply;
      aiMsgs.appendChild(botMsg);
      aiMsgs.scrollTop = aiMsgs.scrollHeight;
    }, 1200);
  }

  if (aiSend && aiInput) {
    aiSend.addEventListener('click', () => {
      const val = aiInput.value.trim();
      if (!val) return;
      simulateAIReply(val);
      aiInput.value = '';
    });
    aiInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = aiInput.value.trim();
        if (!val) return;
        simulateAIReply(val);
        aiInput.value = '';
      }
    });
  }

  // ── Wellness date display ──
  const dateEl = document.getElementById('wellness-date-display');
  if (dateEl) {
    const now = new Date();
    const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('vi-VN', opts);
  }

  // ── Stress test button ──
  const stressBtn = document.getElementById('btn-stress-test');
  if (stressBtn) {
    stressBtn.addEventListener('click', () => {
      showDemoToast('🧠 Bài test tâm lý sẽ có trong phiên bản chính thức!');
    });
  }

  // ── Animate stat counters when a panel activates ──
  function animatePanelStats(panel) {
    panel.querySelectorAll('.dsm-num[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (!target) { el.textContent = '0'; return; }
      const duration = 900;
      const start = performance.now();
      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // Run for initially active panel
  const firstPanel = document.querySelector('.demo-panel-active');
  if (firstPanel) animatePanelStats(firstPanel);

  // ── Toast notification ──
  function showDemoToast(message) {
    const existing = document.querySelector('.demo-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'demo-toast';
    toast.textContent = message;
    Object.assign(toast.style, {
      position:      'fixed',
      bottom:        '24px',
      left:          '50%',
      transform:     'translateX(-50%) translateY(20px)',
      background:    'rgba(15,23,42,0.96)',
      border:        '1px solid rgba(14,165,233,0.35)',
      color:         'rgba(255,255,255,0.95)',
      padding:       '12px 28px',
      borderRadius:  '50px',
      fontSize:      '14px',
      fontWeight:    '600',
      fontFamily:    "'Be Vietnam Pro', sans-serif",
      boxShadow:     '0 8px 32px rgba(0,0,0,0.5)',
      zIndex:        '10000',
      backdropFilter:'blur(12px)',
      transition:    'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      opacity:       '0',
      pointerEvents: 'none',
      whiteSpace:    'nowrap',
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // ── Add "Demo" link to navbar ──
  const navLinksEl = document.getElementById('nav-links');
  if (navLinksEl && !document.querySelector('[href="#demo-platform"]')) {
    const li = document.createElement('li');
    li.innerHTML = '<a href="#demo-platform" class="nav-link">🚀 Demo</a>';
    const lastItem = navLinksEl.querySelector('li:last-child');
    navLinksEl.insertBefore(li, lastItem);
  }
}

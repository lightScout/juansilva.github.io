// Portfolio Animations — Scroll-triggered reveals and stat count-ups

(function() {
  // Guard: respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('anim-hidden');
        entry.target.classList.add('anim-visible');
      }
    });
  }, { threshold: 0.1 });

  // Initialize animations on DOM ready
  function initAnimations() {
    // All pages: section headers and footer columns
    document.querySelectorAll('.section-head').forEach((el) => {
      el.classList.add('anim-hidden', 'anim-slide');
      observer.observe(el);
    });

    document.querySelectorAll('footer .col').forEach((el, idx) => {
      el.classList.add('anim-hidden', `anim-stagger-${idx + 1}`);
      observer.observe(el);
    });

    // index.html: cover cards and log rows
    const highlightsSection = document.getElementById('highlights');
    if (highlightsSection) {
      document.querySelectorAll('.cover').forEach((el, idx) => {
        el.classList.add('anim-hidden', `anim-stagger-${idx + 1}`);
        observer.observe(el);
      });

      document.querySelectorAll('.log-row').forEach((el, idx) => {
        el.classList.add('anim-hidden', `anim-stagger-${Math.min(idx + 1, 8)}`);
        observer.observe(el);
      });
    }

    // Case detail pages
    const detailSection = document.querySelector('.section.detail');
    if (detailSection) {
      // Title block
      const titleBlock = document.querySelector('.title-block');
      if (titleBlock) {
        titleBlock.classList.add('anim-hidden');
        observer.observe(titleBlock);
      }

      // Meta strip cells
      document.querySelectorAll('.meta-strip .cell').forEach((el, idx) => {
        el.classList.add('anim-hidden', `anim-stagger-${idx + 1}`);
        observer.observe(el);
      });

      // Shot
      const shot = document.querySelector('.shot');
      if (shot) {
        shot.classList.add('anim-hidden');
        observer.observe(shot);
      }

      // Stats — special handling for count-up
      document.querySelectorAll('.stat').forEach((el, idx) => {
        el.classList.add('anim-hidden', `anim-stagger-${idx + 1}`);
        observer.observe(el);

        // When stat becomes visible, trigger count-up for numeric values
        const observer2 = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const valueEl = entry.target.querySelector('.v');
                if (valueEl) {
                  countUpValue(valueEl);
                }
                observer2.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
        observer2.observe(el);
      });

      // Features
      document.querySelectorAll('.feat').forEach((el, idx) => {
        el.classList.add('anim-hidden', `anim-stagger-${Math.min(idx + 1, 8)}`);
        observer.observe(el);
      });

      // Meta grid sections
      document.querySelectorAll('.meta-grid section').forEach((el, idx) => {
        el.classList.add('anim-hidden', `anim-stagger-${idx + 1}`);
        observer.observe(el);
      });
    }
  }

  // Count-up animation for numeric stat values
  function countUpValue(element) {
    const text = element.textContent.trim();
    const match = text.match(/^(\d+)([+%x]?)$/);

    if (!match) {
      // Non-numeric, just fade in
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2] || '';
    let current = 0;
    const duration = 1200; // ms
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(target * eased);

      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(animate);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();

// ===== CONFIG =====
const CONFIG = {
  scrollOffset: 80,
  backToTopThreshold: 400,
};

// ===== DYNAMIC YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close menu on link click
navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - CONFIG.scrollOffset) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('show', window.scrollY > CONFIG.backToTopThreshold);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - CONFIG.scrollOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== EMAIL FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-primary');
  const original = btn.innerHTML;
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  emailjs.sendForm('service_cqdxt7w', 'template_8mtl5zp', form)
    .then(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      btn.style.background = '#22c55e';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    })
    .catch(err => {
      console.error('EmailJS Error:', err);
      btn.innerHTML = '<i class="fas fa-times"></i> Failed';
      btn.style.background = '#ef4444';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
}
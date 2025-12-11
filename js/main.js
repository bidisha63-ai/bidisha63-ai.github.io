// ==========================================
// PERSONAL PORTFOLIO - INTERACTIVE FEATURES
// Bidisha Bhowal
// ==========================================

// ===== SMOOTH SCROLL ANIMATIONS =====
// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== HEADER BACKGROUND ON SCROLL =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.style.background = 'rgba(10, 10, 10, 0.95)';
    header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.background = 'rgba(10, 10, 10, 0.8)';
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Create mailto link with form data
    const mailtoLink = `mailto:bidisha63@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open mail client
    window.location.href = mailtoLink;

    // Show feedback to user
    showNotification('Opening your email client...', 'success');

    // Reset form
    contactForm.reset();
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'};
    color: white;
    border-radius: 0.75rem;
    font-weight: 600;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== DYNAMIC YEAR IN FOOTER =====
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===== HOVER EFFECTS FOR PUBLICATION CARDS =====
const publicationCards = document.querySelectorAll('.publication-card');

publicationCards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-8px)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

// ===== SKILL TAG HOVER EFFECTS =====
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
  // Add random delay for staggered hover effect
  const randomDelay = Math.random() * 100;
  tag.style.transitionDelay = `${randomDelay}ms`;
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
const hero = document.querySelector('.hero');

if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });
}

// ===== ACTIVE SECTION HIGHLIGHTING IN NAVIGATION =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add active link styling
const navStyle = document.createElement('style');
navStyle.textContent = `
  .nav-links a.active {
    color: var(--color-accent-primary) !important;
    position: relative;
  }
  
  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gradient-primary);
    border-radius: 2px;
  }
`;
document.head.appendChild(navStyle);

// ===== FORM INPUT ANIMATIONS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
  // Add focus animation
  input.addEventListener('focus', function () {
    this.parentElement.style.transform = 'translateY(-2px)';
  });

  input.addEventListener('blur', function () {
    this.parentElement.style.transform = 'translateY(0)';
  });

  // Add validation feedback
  input.addEventListener('input', function () {
    if (this.validity.valid) {
      this.style.borderColor = 'var(--color-accent-success)';
    } else if (this.value.length > 0) {
      this.style.borderColor = 'var(--color-accent-primary)';
    } else {
      this.style.borderColor = 'var(--color-border)';
    }
  });
});

// ===== PRELOAD OPTIMIZATION =====
// Add loading class to body
document.body.classList.add('loading');

// Remove loading class when page is fully loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.remove('loading');
  }, 100);
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });

  // Close menu when clicking on a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
  });
}

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Welcome to Bidisha Bhowal\'s Portfolio', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%c🧬 Biotechnology Researcher & Computational Biologist', 'color: #8b5cf6; font-size: 14px;');
console.log('%cInterested in collaboration? Let\'s connect! bidisha63@gmail.com', 'color: #10b981; font-size: 12px;');

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }, 0);
  });
}

// ===== EASTER EGG: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Activate fun mode
    document.body.style.animation = 'rainbow 5s linear infinite';
    showNotification('🎉 You found the secret! Science is fun!', 'success');

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(rainbowStyle);

    // Reset after 5 seconds
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

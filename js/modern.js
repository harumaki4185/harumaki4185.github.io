(function() {
  'use strict';

  // DOM Elements
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const scrollRevealElements = document.querySelectorAll('.reveal');
  
  // Mobile Menu Toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu && navMenu.contains(event.target);
    const isClickOnToggle = menuToggle && menuToggle.contains(event.target);
    
    if (navMenu && navMenu.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
      navMenu.classList.remove('active');
      if (menuToggle) {
        menuToggle.classList.remove('active');
      }
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (menuToggle) {
            menuToggle.classList.remove('active');
          }
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll reveal animation
  function revealOnScroll() {
    for (let i = 0; i < scrollRevealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = scrollRevealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        scrollRevealElements[i].classList.add('active');
      } else {
        scrollRevealElements[i].classList.remove('active');
      }
    }
  }
  
  // Active navigation based on scroll position
  function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu li');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      } else if (link && link.getAttribute('href') === 'index.html' && currentSection === '') {
        item.classList.add('active');
      }
    });
  }
  
  // Parallax effect for hero section
  function parallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrollPosition = window.scrollY;
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
  }
  
  // Initialize typed.js if element exists
  if (typeof Typed !== 'undefined' && document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: ['Developer', 'Creator', 'Innovator'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });
  }
  
  // Add event listeners
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('scroll', setActiveNavItem);
  window.addEventListener('scroll', parallaxEffect);
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll();
    setActiveNavItem();
    
    // Add page transition class to body
    document.body.classList.add('page-transition');
    
    // Remove page transition class after animation completes
    setTimeout(function() {
      document.body.classList.remove('page-transition');
    }, 500);
  });
  
  // Handle page transitions
  const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only apply to internal links
      if (this.hostname === window.location.hostname) {
        e.preventDefault();
        document.body.classList.add('page-transition-out');
        
        setTimeout(() => {
          window.location.href = this.href;
        }, 300);
      }
    });
  });
  
  // Project image hover effect
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.project-image img').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.project-image img').style.transform = 'scale(1)';
    });
  });
  
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
  
})();

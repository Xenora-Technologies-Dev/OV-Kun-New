/**
* OV Kunststoffe - Enhanced JavaScript
* Premium European Industrial Solutions
* Modern interactions and animations
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   * Show header logo when scrolled past the brand frame section
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    
    // Get the exclusive-dealer section to determine when to show logo
    const exclusiveSection = document.querySelector('#exclusive-dealer');
    const brandFrame = document.querySelector('.hero-brand-frame');
    
    // Calculate threshold - show logo when reaching exclusive dealer section
    let logoThreshold = 100;
    if (exclusiveSection) {
      logoThreshold = exclusiveSection.offsetTop - 100;
    } else if (brandFrame) {
      logoThreshold = brandFrame.offsetTop + brandFrame.offsetHeight;
    }
    
    if (window.scrollY > 100) {
      selectBody.classList.add('scrolled');
      selectHeader.classList.add('scrolled-header');
    } else {
      selectBody.classList.remove('scrolled');
      selectHeader.classList.remove('scrolled-header');
    }
    
    // Show/hide header logo based on scroll position past brand intro
    if (window.scrollY > logoThreshold) {
      selectHeader.classList.add('show-header-logo');
    } else {
      selectHeader.classList.remove('show-header-logo');
    }
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle with enhanced animations
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    const body = document.querySelector('body');
    body.classList.toggle('mobile-nav-active');
    
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    
    // Prevent body scroll when mobile nav is open
    if (body.classList.contains('mobile-nav-active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      // Don't close if it's a dropdown toggle
      if (navmenu.classList.contains('toggle-dropdown')) {
        return;
      }
      
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Enhanced mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .dropdown').forEach(dropdown => {
    const toggleLink = dropdown.querySelector('.toggle-dropdown');
    const dropdownMenu = dropdown.querySelector('ul');
    
    if (toggleLink && dropdownMenu) {
      // For mobile: toggle on click
      toggleLink.addEventListener('click', function(e) {
        if (window.innerWidth < 1200) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close other dropdowns
          document.querySelectorAll('.navmenu .dropdown').forEach(other => {
            if (other !== dropdown) {
              other.classList.remove('active');
              const otherMenu = other.querySelector('ul');
              if (otherMenu) {
                otherMenu.classList.remove('dropdown-active');
              }
            }
          });
          
          // Toggle current dropdown
          dropdown.classList.toggle('active');
          dropdownMenu.classList.toggle('dropdown-active');
        }
      });
      
      // For desktop: allow navigation to products page
      toggleLink.addEventListener('click', function(e) {
        if (window.innerWidth >= 1200) {
          // Allow default navigation behavior on desktop
          // The dropdown will show on hover via CSS
        }
      });
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const navMenu = document.querySelector('#navmenu');
    const mobileNavActive = document.querySelector('.mobile-nav-active');
    
    if (mobileNavActive && navMenu && !navMenu.contains(e.target) && !mobileNavToggleBtn.contains(e.target)) {
      mobileNavToogle();
    }
  });

  /**
   * Preloader with enhanced fade
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      // Add loaded class for fade-out animation
      preloader.classList.add('loaded');
      // Remove after animation completes
      setTimeout(() => {
        if (preloader && preloader.parentElement) {
          preloader.remove();
        }
      }, 800);
    });
    
    // Fallback: remove preloader after 4 seconds if page doesn't load
    setTimeout(() => {
      if (preloader && preloader.parentElement) {
        preloader.classList.add('loaded');
        setTimeout(() => {
          if (preloader && preloader.parentElement) {
            preloader.remove();
          }
        }, 800);
      }
    }, 4000);
  }

  /**
   * Scroll top button with smooth animation
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 50
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    
    if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    }
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;
      
      try {
        let config = JSON.parse(configEl.innerHTML.trim());

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      } catch (e) {
        console.warn('Swiper config error:', e);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }
  
  /**
   * Parallax effect on hero section
   */
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroImages = hero.querySelectorAll('.carousel-item img');
      
      heroImages.forEach(img => {
        img.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
      });
    });
  }
  
  // Initialize on load
  window.addEventListener('load', initParallax);
  
  /**
   * Distributor CTA widget dismiss
   */
  const distributorWidget = document.querySelector('.distributor-cta-widget');
  if (distributorWidget) {
    // Auto hide after 30 seconds on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        distributorWidget.style.opacity = '0';
        setTimeout(() => {
          distributorWidget.style.display = 'none';
        }, 300);
      }, 30000);
    }
  }
  
  /**
   * Animate numbers on scroll
   */
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  /**
   * Intersection Observer for animations
   */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate counters
        if (entry.target.classList.contains('hero-stat-number')) {
          const finalValue = parseInt(entry.target.getAttribute('data-count') || entry.target.innerHTML);
          animateValue(entry.target, 0, finalValue, 2000);
        }
      }
    });
  }, observerOptions);
  
  // Observe elements
  document.querySelectorAll('.hero-stat-number, .wow-card, .service-item').forEach(el => {
    animationObserver.observe(el);
  });

})();
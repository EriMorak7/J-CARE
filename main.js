document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('scrolled'); // Force solid for now, or keep transparent if preferred
    }
  });

  // Animated Counters
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Intersection Observer for counters
  const impactSection = document.querySelector('.impact-section');
  if (impactSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(impactSection);
  }

  // Carousel
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.querySelector('.carousel-next');
  const prevButton = document.querySelector('.carousel-prev');
  const dotsNav = document.querySelector('.carousel-dots');
  const dots = Array.from(document.querySelectorAll('.dot'));
  
  if (track && slides.length > 0) {
    let currentSlideIndex = 0;

    const updateCarousel = (index) => {
      // Calculate transform
      track.style.transform = `translateX(-${index * 100}%)`;
      // Update dots
      if(dots.length) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
      }
      currentSlideIndex = index;
    };

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const nextIndex = (currentSlideIndex + 1) % slides.length;
        updateCarousel(nextIndex);
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
      });
    }

    if (dotsNav) {
      dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('.dot');
        if (!targetDot) return;
        const targetIndex = parseInt(targetDot.getAttribute('data-index'));
        updateCarousel(targetIndex);
      });
    }

    // Auto play
    setInterval(() => {
      const nextIndex = (currentSlideIndex + 1) % slides.length;
      updateCarousel(nextIndex);
    }, 2500);
  }

  // Donate Toggle
  const toggleBtns = document.querySelectorAll('.donate-toggle button');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Donate Amount Selection
  const amountBtns = document.querySelectorAll('.donate-amount');
  const customInput = document.querySelector('.donate-custom');
  
  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if(customInput) customInput.value = '';
    });
  });

  if(customInput) {
    customInput.addEventListener('input', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
    });
  }

  // Mobile Navigation Drawer
  const navToggle = document.querySelector('.nav-toggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-links a, .drawer-actions a');

  const openDrawer = () => {
    if (navToggle) {
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
    if (mobileDrawer) {
      mobileDrawer.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('active');
    }
    document.body.classList.add('menu-open');
  };

  const closeDrawer = () => {
    if (navToggle) {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('active');
    }
    document.body.classList.remove('menu-open');
  };

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    // Check if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let smoother;
  
    // Only initialize smooth scrolling for non-mobile devices
    if (!isMobile) {
      // Create ScrollSmoother instance
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2, // Adjust smoothness (1 = no smoothing)
        effects: true, // Enable data-speed and data-lag effects
        normalizeScroll: false, // Disable momentum-based scrolling
        ignoreMobileResize: true, // Better performance
        onUpdate: self => {
          // Prevent bottom bounce effect
          if (self.scrollTop > self.maxScroll - 50) {
            gsap.to(self.wrapper, {
              duration: 0.8,
              scrollTo: { y: self.maxScroll, autoKill: false },
              ease: "power2.out"
            });
          }
        }
      });
  
      // Handle window resize events
      const resizeObserver = new ResizeObserver(() => {
        if (smoother) {
          ScrollTrigger.refresh();
          smoother.pause(); // Pause during resize
          setTimeout(() => {
            smoother.resume(); // Resume after short delay
            smoother.scrollTop(0, true); // Reset scroll position
          }, 100);
        }
      });
      resizeObserver.observe(document.body);
  
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target && smoother) {
            const headerHeight = document.querySelector('.nav_container')?.offsetHeight || 0;
            smoother.scrollTo(target, {
              offsetY: headerHeight + 20, // Account for fixed header
              duration: 1.2,
              ease: "power2.inOut"
            });
          }
        });
      });
  
      // Refresh ScrollTrigger when images load
      if (typeof imagesLoaded !== 'undefined') {
        imagesLoaded(document.querySelectorAll('img'), () => {
          ScrollTrigger.refresh();
        });
      }
  
      // Prevent horizontal scroll interference
      window.addEventListener('wheel', e => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
      }, { passive: false });
  
    } else {
      // Mobile fallback - disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
      const wrapper = document.getElementById('smooth-wrapper');
      if (wrapper) {
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'auto';
        wrapper.style.height = 'auto';
      }
    }
  
    // Debugging helper
    if (window.location.search.includes('debug=scroll')) {
      ScrollTrigger.config({ limitCallbacks: true });
      console.log('Scroll debugging enabled');
    }
  });
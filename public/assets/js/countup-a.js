// Easing function (ease-out cubic)
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function countUp(targetElement, start, end, duration) {
  let startTime = null;
  const hasPlusSign = targetElement.dataset.hasPlus === 'true'; // Check for data attribute

  function animateCountUp(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const easedProgress = easeOutCubic(progress);
    const currentValue = Math.floor(easedProgress * (end - start) + start);
    
    // Add '+' only if specified
    targetElement.textContent = currentValue + (hasPlusSign ? '+' : '');

    if (progress < 1) {
      requestAnimationFrame(animateCountUp);
    }
  }

  requestAnimationFrame(animateCountUp);
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  const buildersElement = document.getElementById('countup-members');
  
  if (!buildersElement) {
    console.error('Element with ID "countup-members" not found!');
    return;
  }

  // Set up Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get values from data attributes
        const start = parseInt(buildersElement.dataset.start) || 0;
        const end = parseInt(buildersElement.dataset.end) || 20;
        const duration = parseInt(buildersElement.dataset.duration) || 3000;

        countUp(buildersElement, start, end, duration);
        observer.unobserve(buildersElement);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  observer.observe(buildersElement);
});
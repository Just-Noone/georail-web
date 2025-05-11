document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('nav_burger');
  const mobnav = document.getElementById('mobnav');
  
  burger.addEventListener('click', function(event) {
    mobnav.classList.toggle('show');
    event.stopPropagation(); // Prevents the document click from firing
  });

  // Close mobilenav if clicking outside of nav_burger
  document.addEventListener('click', function(event) {
    if (!mobnav.contains(event.target) && event.target !== burger) {
      mobnav.classList.remove('show');
    }
  });
});
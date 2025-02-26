document.getElementById("hero_announcement_close").addEventListener("click", function() {
    var fadeDiv = document.getElementById("hero_announcement");
    
    // Add the hidden class to start the fade-out
    fadeDiv.classList.add("hero_announcement_hidden");
  
    // Wait for the transition to complete before removing the div
    fadeDiv.addEventListener('transitionend', function() {
      fadeDiv.style.display = 'none';
    });
  });
  

document.getElementById("cookies_close").addEventListener("click", function() {
  var fadeDiv = document.getElementById("cookie_frame");
  
  // Add the hidden class to start the fade-out
  fadeDiv.classList.add("cookies_content_hidden");

  // Wait for the transition to complete before removing the div
  fadeDiv.addEventListener('transitionend', function() {
    fadeDiv.style.display = 'none';
  });
});
  
document.addEventListener("DOMContentLoaded", function() {
  // Cookies banner logic
  var closeBtn = document.getElementById("cookies_close");
  var declineBtn = document.getElementById("cookies_close_decl");
  var fadeDiv = document.getElementById("cookie_frame");

  function hideBanner() {
    if (fadeDiv) {
      fadeDiv.classList.add("cookies_content_hidden");
      fadeDiv.addEventListener('transitionend', function handler() {
        fadeDiv.style.display = 'none';
        fadeDiv.removeEventListener('transitionend', handler);
      });
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", hideBanner);
  }
  if (declineBtn) {
    declineBtn.addEventListener("click", hideBanner);
  }

  // Announcement banner logic
  var announcementClose = document.getElementById("hero_announcement_close");
  var announcementDiv = document.getElementById("hero_announcement");

  function hideAnnouncement() {
    if (announcementDiv) {
      announcementDiv.classList.add("hero_announcement_hidden");
      announcementDiv.addEventListener('transitionend', function handler() {
        announcementDiv.style.display = 'none';
        announcementDiv.removeEventListener('transitionend', handler);
      });
    }
  }

  if (announcementClose) {
    announcementClose.addEventListener("click", hideAnnouncement);
  }
});



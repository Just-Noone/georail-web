// Function to load translation from JSON file
async function loadTranslations(language) {
    try {
      const response = await fetch(`/public/assets/lang/${language}.json`);
      if (!response.ok) {
        throw new Error("Could not load translation file");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching translations:", error);
      return {};
    }
  }
  
  // Function to change the website language
  async function changeLanguage() {
    const selectedLang = document.getElementById("languageSelect").value;
    const translations = await loadTranslations(selectedLang);
  
    // Get the text elements
    const hero_subtitle = document.getElementById("hero_sub");
    const hero_title = document.getElementById("hero_title");
  
    // Only update the text if the elements exist
    if (hero_subtitle && hero_title) {
      hero_subtitle.innerText = translations.greeting || "Translation missing";
      hero_title.innerText = translations.welcome_message || "Translation missing";
    }
  
    // Save language preference in localStorage
    localStorage.setItem('preferredLanguage', selectedLang);
  }
  
  // Load default language on page load
  document.addEventListener("DOMContentLoaded", async () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    const languageSelect = document.getElementById("languageSelect");
  
    if (languageSelect) {
      languageSelect.value = savedLang;
      await changeLanguage();
    } else {
      console.error("Language select element not found");
    }
  });
  
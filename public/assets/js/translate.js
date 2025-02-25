let translations = {};

// Function to fetch the translations from the JSON file
const loadTranslations = async () => {
  try {
    const response = await fetch('/public/assets/lang/translations.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    translations = await response.json();
    console.log('Translations loaded:', translations); // Check if translations are loaded
  } catch (error) {
    console.error('Error loading translations:', error);
  }

  const loadTranslations = async () => {
    try {
      console.log('Attempting to fetch translations...');  // Add this line
      const response = await fetch('/public/assets/lang/translations.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      translations = await response.json();
      console.log('Translations loaded:', translations);  // Log the fetched translations
    } catch (error) {
      console.error('Error loading translations:', error);  // Log any errors
    }
  };
  
};

// Function to set the language and update the text content
const setLanguage = (language) => {
  if (!translations[language]) {
    console.error(`Translations for language ${language} not found`);
    return;
  }

  const translation = translations[language];

  document.getElementById("nav_about").textContent = translation.nav_about;
  document.getElementById("nav_server").textContent = translation.nav_server;
  document.getElementById("nav_dynmap").textContent = translation.nav_dynmap;
  document.getElementById("nav_sysmap").textContent = translation.nav_sysmap;
  document.getElementById("nav_joininstructions").textContent = translation.nav_joininstructions;
  document.getElementById("nav_discord").textContent = translation.nav_discord;
  document.getElementById("nav_cities").textContent = translation.nav_cities;
  document.getElementById("nav_railways").textContent = translation.nav_railways;
};

// Event listener for the language selector
document.getElementById("languageSelect").addEventListener("change", (event) => {
  setLanguage(event.target.value);
});

// Load translations when the page loads and set the default language
window.addEventListener('load', async () => {
  await loadTranslations();
  setLanguage(document.getElementById("languageSelect").value); // Set the default selected language
});

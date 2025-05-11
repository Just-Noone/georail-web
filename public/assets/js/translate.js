document.addEventListener('DOMContentLoaded', () => {
    const selectedLang = document.querySelector('.selected-lang');
    const langOptionsContainer = document.querySelector('.lang-options-container');
    const langOptions = document.querySelector('.lang-options');
    const langName = document.querySelector('.lang-name');

    // Language codes mapped to their display names
    const languageNames = {
        en: 'English',
        es: 'Español',
        fr: 'Français',
        de: 'Deutsch',
        ru: 'Русский',
        pt: 'Português',
        pt_br: 'Português (Brasil)',
        it: 'Italiano',
        tr: 'Türkçe',
        hu: 'Magyar',
        sv: 'Svenska',
        fi: 'Suomi',
        pl: 'Polski',
        cs: 'čeština',
        sk: 'Slovenčina',
        nl: 'Nederlands',
        ar: 'عربي',
        ja: '日本語',
        zh: '中國人',
        // Add more languages as needed
        // e.g., it: 'Italiano', ja: '日本語', ko: '한국어', etc.
    };

    const languages = Object.keys(languageNames); // Dynamically get all language codes

    // Initialize the language switcher
    initializeLanguageSwitcher();

    /**
     * Initializes the language switcher functionality.
     */
    async function initializeLanguageSwitcher() {
        try {
            // Dynamically populate the dropdown with available languages
            await populateLanguageOptions();

            // Load the saved language or default to 'en'
            const savedLang = localStorage.getItem('preferredLang') || 'en';
            await loadLanguage(savedLang);

            // Set up event listeners
            setupEventListeners();
        } catch (error) {
            console.error('[ERROR] Failed to initialize language switcher:', error);
        }
    }

    /**
     * Populates the language dropdown with available languages and their progress.
     */
    async function populateLanguageOptions() {
        try {
            // Fetch the English file as the reference
            const enResponse = await fetch('/assets/lang/en.tsv');
            if (!enResponse.ok) throw new Error('Failed to load English language file');
            const enLines = (await enResponse.text()).trim().split('\n').length;

            // Calculate progress for each language
            const progressData = await Promise.all(
                languages.map(async (lang) => {
                    const response = await fetch(`/assets/lang/${lang}.tsv`);
                    if (!response.ok) return { lang, progress: 0 };

                    const lines = (await response.text()).trim().split('\n').length;
                    const progress = Math.round((lines / enLines) * 100);
                    return { lang, progress };
                })
            );

            // Populate the dropdown
            progressData.forEach(({ lang, progress }) => {
                const option = document.createElement('div');
                option.classList.add('lang-option');
                option.dataset.value = lang;

                const langText = document.createElement('span');
                langText.textContent = languageNames[lang] || lang.toUpperCase(); // Use the mapped name or fallback to the code
                option.appendChild(langText);

                const progressText = document.createElement('span');
                progressText.textContent = `${progress}%`;
                progressText.classList.add('lang-progress', getProgressColor(progress));
                option.appendChild(progressText);

                langOptions.appendChild(option);
            });
        } catch (error) {
            console.error('[ERROR] Failed to populate language options:', error);
        }
    }

    /**
     * Determines the color class for the progress percentage.
     * @param {number} progress - The progress percentage.
     * @returns {string} The color class name.
     */
    function getProgressColor(progress) {
        if (progress >= 80) return 'green';
        if (progress >= 60) return 'yellow';
        if (progress >= 40) return 'orange';
        if (progress >= 20) return 'magenta';
        return 'red';
    }

    /**
     * Sets up event listeners for the language switcher.
     */
    function setupEventListeners() {
        // Toggle dropdown visibility
        selectedLang.addEventListener('click', (e) => {
            e.stopPropagation();
            langOptionsContainer.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langOptionsContainer.classList.add('hidden');
        });

        // Handle language selection
        langOptions.addEventListener('click', async (e) => {
            const option = e.target.closest('.lang-option');
            if (!option) return;

            const selectedValue = option.dataset.value;

            // Update language
            await loadLanguage(selectedValue);

            // Save to localStorage
            localStorage.setItem('preferredLang', selectedValue);

            // Close dropdown
            langOptionsContainer.classList.add('hidden');

            console.log(`[DEBUG] Language changed to: ${selectedValue}`);
        });
    }

    /**
     * Loads the selected language dynamically from a .tsv file.
     * @param {string} lang - The language code to load (e.g., 'en', 'es').
     */
    async function loadLanguage(lang) {
        try {
            // Fetch the language file dynamically
            const response = await fetch(`/assets/lang/${lang}.tsv`);
            if (!response.ok) {
                throw new Error(`Failed to load language file: ${lang}`);
            }

            const tsvData = await response.text();
            const translations = parseTSV(tsvData);

            // Update the UI with the loaded translations
            updateUI(translations);

            // Update the selected language name
            langName.textContent = languageNames[lang] || lang.toUpperCase();
        } catch (error) {
            console.error(`[ERROR] Failed to load language: ${lang}`, error);
        }
    }

    /**
     * Parses a .tsv file into a key-value object.
     * @param {string} tsv - The raw .tsv data.
     * @returns {Object} A key-value object of translations.
     */
    function parseTSV(tsv) {
        const lines = tsv.trim().split('\n');
        const translations = {};

        lines.forEach(line => {
            const [key, value] = line.split('\t');
            if (key && value) {
                translations[key] = value;
            }
        });

        return translations;
    }

    /**
     * Updates the UI with the loaded translations.
     * @param {Object} translations - The translations object.
     */
    function updateUI(translations) {
        document.querySelectorAll('[data-translate-id]').forEach(element => {
            const key = element.dataset.translateId;
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
});
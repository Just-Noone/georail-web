class Translator {
    constructor() {
        this.translations = {};
        this.currentLang = 'en';
        this.availableLanguages = ['en', 'es', 'fr', 'pt_br']; // Update with your languages
        this.selector = document.getElementById('languageSelector');
        this.initialize();
    }

    async initialize() {
        if (!this.selector) {
            console.error('Language selector element not found!');
            return;
        }

        this.selector.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        try {
            await this.detectAndLoadLanguage();
            this.applyTranslations();
        } catch (error) {
            console.error('Initialization failed:', error);
        }
    }

    async detectAndLoadLanguage() {
        // 1. Check saved preference
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && this.availableLanguages.includes(savedLang)) {
            await this.loadLanguage(savedLang);
            return;
        }

        // 2. Detect browser language
        const browserLang = this.normalizeLanguage(navigator.language || 'en');
        await this.loadBestMatch(browserLang);
    }

    normalizeLanguage(lang) {
        return lang.toLowerCase()
            .split('-')[0]
            .replace('-', '_');
    }

    async loadBestMatch(targetLang) {
        // Try exact match first
        if (this.availableLanguages.includes(targetLang)) {
            await this.loadLanguage(targetLang);
            return;
        }

        // Try base language
        const baseLang = targetLang.split('_')[0];
        if (this.availableLanguages.includes(baseLang)) {
            await this.loadLanguage(baseLang);
            return;
        }

        // Fallback to English
        await this.loadLanguage('en');
    }

    async loadLanguage(langCode) {
        try {
            const response = await fetch(`./public/assets/lang/${langCode}.tsv`);
            if (!response.ok) throw new Error('File not found');
            
            const tsv = await response.text();
            this.parseTSV(tsv);
            this.currentLang = langCode;
            this.selector.value = langCode;
            localStorage.setItem('preferredLang', langCode);
        } catch (error) {
            console.error(`Failed to load ${langCode}:`, error);
            if (langCode !== 'en') await this.loadLanguage('en');
        }
    }

    parseTSV(tsv) {
        this.translations = {};
        tsv.split('\n').forEach(row => {
            const [id, translation] = row.split('\t');
            if (id && translation) {
                this.translations[id.trim()] = translation.trim();
            }
        });
    }

    changeLanguage(langCode) {
        this.loadLanguage(langCode)
            .then(() => this.applyTranslations())
            .catch(error => console.error('Language change failed:', error));
    }

    applyTranslations() {
        document.querySelectorAll('[data-translate-id]').forEach(element => {
            const id = element.dataset.translateId;
            const translation = this.translations[id];
            
            if (translation) {
                if (element.placeholder) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    async loadLanguage(langCode) {
        try {
            // CORRECTED PATH
            const response = await fetch(`assets/lang/${langCode}.tsv`);
            if (!response.ok) throw new Error('File not found');
            
            const tsv = await response.text();
            this.parseTSV(tsv);
            this.currentLang = langCode;
            this.selector.value = langCode;
            localStorage.setItem('preferredLang', langCode);
        } catch (error) {
            console.error(`Failed to load ${langCode}:`, error);
            if (langCode !== 'en') await this.loadLanguage('en');
        }
    }
}

window.addEventListener('DOMContentLoaded', () => new Translator());
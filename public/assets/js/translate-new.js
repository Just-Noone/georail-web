class Translator {
    constructor() {
        this.translations = {};
        this.currentLang = 'en';
        this.init();
    }

    async init() {
        // Setup language selector
        this.selector = document.getElementById('languageSelector');
        this.selector.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // Load translations
        const savedLang = localStorage.getItem('preferredLang');
        const browserLang = navigator.language.split('-')[0];
        this.currentLang = savedLang || browserLang || 'en';
        this.selector.value = this.currentLang;
        
        await this.loadTranslations(this.currentLang);
        this.applyTranslations();
    }

    async changeLanguage(langCode) {
        this.currentLang = langCode;
        localStorage.setItem('preferredLang', langCode);
        await this.loadTranslations(langCode);
        this.applyTranslations();
    }

    async loadTranslations(langCode) {
        try {
            const response = await fetch(`../public/assets/lang/${langCode}.tsv`);
            const tsv = await response.text();
            this.parseTSV(tsv);
        } catch (error) {
            console.error(`Failed to load ${langCode} translations:`, error);
            if (langCode !== 'en') await this.loadTranslations('en');
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

    applyTranslations() {
        document.querySelectorAll('[data-translate-id]').forEach(element => {
            const id = element.dataset.translateId;
            if (this.translations[id]) {
                if (element.placeholder) {
                    element.placeholder = this.translations[id];
                } else {
                    element.textContent = this.translations[id];
                }
            }
        });
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => new Translator());
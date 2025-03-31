class Translator {
    constructor() {
        this.translations = {};
        this.currentLang = 'en';
        this.init();
    }

    async init() {
        this.selector = document.getElementById('languageSelector');
        this.selector.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        await this.setInitialLanguage();
        this.applyTranslations();
    }

    async setInitialLanguage() {
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang) {
            await this.loadLanguageWithFallback(savedLang);
            return;
        }

        const browserLang = this.getNormalizedBrowserLang();
        await this.loadLanguageWithFallback(browserLang);
    }

    getNormalizedBrowserLang() {
        const rawLang = navigator.language || 'en';
        return rawLang
            .split('-')[0] // Remove regional suffix
            .replace('-', '_') // Format for filename
            .toLowerCase();
    }

    async loadLanguageWithFallback(langCode) {
        try {
            await this.loadTranslations(langCode);
            this.currentLang = langCode;
            this.selector.value = langCode;
        } catch (error) {
            console.warn(`Failed to load ${langCode}, trying fallback...`);
            
            // First try base language (e.g., 'fr_CA' → 'fr')
            const baseLang = langCode.split('_')[0];
            if (baseLang !== langCode && baseLang !== 'en') {
                await this.loadLanguageWithFallback(baseLang);
            } else {
                // Final fallback to English
                await this.loadTranslations('en');
                this.currentLang = 'en';
                this.selector.value = 'en';
            }
        }
    }

    async loadTranslations(langCode) {
        const response = await fetch(`../public/assets/lang/${langCode}.tsv`);
        if (!response.ok) throw new Error('TSV not found');
        
        const tsv = await response.text();
        this.parseTSV(tsv);
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
        localStorage.setItem('preferredLang', langCode);
        this.currentLang = langCode;
        this.loadTranslations(langCode)
            .then(() => this.applyTranslations())
            .catch(() => this.loadLanguageWithFallback('en'));
    }

    applyTranslations() {
        document.querySelectorAll('[data-translate-id]').forEach(element => {
            const id = element.dataset.translateId;
            if (this.translations[id]) {
                element.textContent = this.translations[id];
                if (element.placeholder) {
                    element.placeholder = this.translations[id];
                }
            }
        });
    }
}

// Initialize when ready
window.addEventListener('DOMContentLoaded', () => new Translator());
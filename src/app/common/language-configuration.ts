const SUPPORTED_LANGUAGES = ['de', 'fr', 'it', 'en'];
const STORAGE = window.localStorage;
const LANG_STORAGE_KEY = 'spotlight-test.app.language';

/**
 * Determine the user language following precedence rules and persist this preference in the localStorage.
 * Precedence: url parameter, localStorage, browser language.
 * Default: de.
 */
export function setActiveLang(): string {

    function getUrlParameterByName(name: string): string {
        const url = window.location.href;
        name = name.replace(/[[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    let lang = getUrlParameterByName('lang');
    if (!lang) {
        lang = STORAGE.getItem(LANG_STORAGE_KEY);
        if (!lang) {
            lang = getPreferredLanguageFromBrowser();
        }
    }
    lang = getSupportedLanguageOrDefault(lang);

    STORAGE.setItem(LANG_STORAGE_KEY, lang);
    if (document) {
        document.documentElement.lang = lang;
    }

    return lang;
}

function getPreferredLanguageFromBrowser(): string {
    // IE & Chrome
    if (navigator.language) {
        const lang = extractLanguage(navigator.language);
        if (SUPPORTED_LANGUAGES.indexOf(lang) !== -1) {
            return lang;
        }
    }

    // Chrome supports a list of preferred languages: if the preferred is not supported, we go down the list.
    if (navigator.languages) {
        for (const l of navigator.languages) {
            const lang = extractLanguage(l);
            if (SUPPORTED_LANGUAGES.indexOf(lang) !== -1) {
                return lang;
            }
        }
    }

    return null;
}

function extractLanguage(language: string): string {
    return language.substr(0, 2).toLowerCase();
}

function getSupportedLanguageOrDefault(lang: string): string {
    if (SUPPORTED_LANGUAGES.indexOf(lang) !== -1) {
        return lang;
    } else {
        return 'de';
    }
}

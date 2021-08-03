import { createI18n } from 'vue-i18n';
import en from './lang/en';
import zh from './lang/zh';

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('language') || 'zh-CN',
    messages: {
        'zh-CN': zh,
        'en-US': en,
    }
});

export default i18n;
// Main i18n configuration file
import en from './locales/en';
import fr from './locales/fr';
import de from './locales/de';
import es from './locales/es';
import pl from './locales/pl';
import ru from './locales/ru';
import bs from './locales/bs';
import tr from './locales/tr';
import ar from './locales/ar';
import zh from './locales/zh';
import ja from './locales/ja';
import ko from './locales/ko';
import pt from './locales/pt';
import sv from './locales/sv';

export const languages = {
  en,
  fr,
  de,
  es,
  pl,
  ru,
  bs,
  tr,
  ar,
  zh,
  ja,
  ko,
  pt,
  sv
};

export type LanguageCode = keyof typeof languages;
export type Translations = typeof languages.en;

export const availableLanguages = [
  { code: 'en' as LanguageCode, name: 'English', flag: '🇺🇸' },
  { code: 'fr' as LanguageCode, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as LanguageCode, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es' as LanguageCode, name: 'Español', flag: '🇪🇸' },
  { code: 'pl' as LanguageCode, name: 'Polski', flag: '🇵🇱' },
  { code: 'ru' as LanguageCode, name: 'Русский', flag: '🇷🇺' },
  { code: 'bs' as LanguageCode, name: 'Bosanski', flag: '🇧🇦' },
  { code: 'tr' as LanguageCode, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar' as LanguageCode, name: 'العربية', flag: '🇸🇦' },
  { code: 'zh' as LanguageCode, name: '中文', flag: '🇨🇳' },
  { code: 'ja' as LanguageCode, name: '日本語', flag: '🇯🇵' },
  { code: 'ko' as LanguageCode, name: '한국어', flag: '🇰🇷' },
  { code: 'pt' as LanguageCode, name: 'Português', flag: '🇵🇹' },
  { code: 'sv' as LanguageCode, name: 'Svenska', flag: '🇸🇪' }
];
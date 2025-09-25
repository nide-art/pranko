export const availableCurrencies = [
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
];

// Map languages to their preferred currencies
export const languageCurrencyMap: { [key: string]: string } = {
  'en': 'USD',
  'sv': 'SEK', 
  'de': 'EUR',
  'fr': 'EUR',
  'es': 'EUR',
  'ru': 'RUB',
  'zh': 'CNY',
};

export function getCurrencySymbol(currencyCode: string): string {
  const currency = availableCurrencies.find(c => c.code === currencyCode);
  return currency?.symbol || currencyCode;
}

export function getCurrencyForLanguage(languageCode: string): string {
  return languageCurrencyMap[languageCode] || 'USD';
}

export function formatCurrency(amount: number, currencyCode: string = 'SEK'): string {
  // Map currency codes to locale identifiers for proper formatting
  const localeMap: { [key: string]: string } = {
    'SEK': 'sv-SE',
    'USD': 'en-US',
    'EUR': 'de-DE',
    'GBP': 'en-GB',
    'NOK': 'nb-NO',
    'DKK': 'da-DK',
    'CNY': 'zh-CN',
    'RUB': 'ru-RU',
  };

  const locale = localeMap[currencyCode] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(amount);
}
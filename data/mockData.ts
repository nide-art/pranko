// Separate mock data file - not mixed with code
import { useLanguage } from '../contexts/LanguageContext';
import { getCurrencyForLanguage } from '../utils/currency';

export const mockUserData = {
  balance: 21500.00,
  availableBalance: 2589.50,
  monthlyIncome: 300.90,
  todaySpent: 600.90,
  name: "Maria Smith",
  location: "Stockholm, Sweden",
  cards: [
    {
      id: '1',
      type: 'Physical Card',
      number: '**** **** **** 2864',
      holder: 'Maria Smith',
      expiry: '08/27',
      cvv: '826',
      isActive: true,
      color: '#2E5BFF'
    },
    {
      id: '2',
      type: 'Virtual Card',
      number: '**** **** **** 4521',
      holder: 'Maria Smith',
      expiry: '12/28',
      cvv: '394',
      isActive: false,
      color: '#4A90E2'
    }
  ]
};

// Currency conversion rates (base: SEK)
const currencyRates: { [key: string]: number } = {
  'SEK': 1,
  'USD': 0.095,
  'EUR': 0.087,
  'CNY': 0.68,
  'RUB': 9.2,
};

// Function to convert amount based on currency
const convertAmount = (amount: number, targetCurrency: string): number => {
  const rate = currencyRates[targetCurrency] || 1;
  return Math.round(amount * rate * 100) / 100;
};

// Function to get localized transactions
export const getLocalizedTransactions = (translations: any, languageCode: string = 'sv') => {
  const currency = getCurrencyForLanguage(languageCode);
  
  return [
    {
      id: '1',
      title: translations.groceryTitle,
      description: translations.mcdonalds,
      amount: convertAmount(-50.68, currency),
      date: 'Aug 26',
      category: 'food',
      icon: 'shopping-cart',
      color: '#4ECDC4'
    },
    {
      id: '2',
      title: translations.transportTitle,
      description: translations.publicTransport,
      amount: convertAmount(-86.00, currency),
      date: 'Aug 25',
      category: 'transport',
      icon: 'car',
      color: '#45B7D1'
    },
    {
      id: '3',
      title: translations.salaryTitle,
      description: translations.monthlySalary,
      amount: convertAmount(6500.00, currency),
      date: 'Aug 25',
      category: 'income',
      icon: 'dollar-sign',
      color: '#10B981'
    },
    {
      id: '4',
      title: translations.coffeeTitle,
      description: translations.starbucks,
      amount: convertAmount(-45.00, currency),
      date: 'Aug 24',
      category: 'food',
      icon: 'coffee',
      color: '#F59E0B'
    }
  ];
};

// Function to get localized budget categories
export const getLocalizedBudgetCategories = (translations: any) => [
  {
    name: translations.housing,
    budget: 8000,
    spent: 7200,
    percentage: 90,
    color: '#FF6B6B'
  },
  {
    name: translations.food,
    budget: 2000,
    spent: 1200,
    percentage: 60,
    color: '#4ECDC4'
  },
  {
    name: translations.transport,
    budget: 1000,
    spent: 650,
    percentage: 65,
    color: '#45B7D1'
  },
  {
    name: translations.entertainment,
    budget: 1500,
    spent: 400,
    percentage: 27,
    color: '#96CEB4'
  }
];
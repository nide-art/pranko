import React, { createContext, useContext, useState } from 'react';
import { getLocalizedTransactions } from '../data/mockData';
import { useLanguage } from './LanguageContext';

interface Transaction {
  id?: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
  color: string;
}

interface PrankSettings {
  receiverName: string;
  receiverPhoto?: string;
  defaultAmount: number;
  currency: string;
  requestSound?: string;
  laughterSound?: string;
  profileName: string;
  profileLocation: string;
  profileBalance: number;
  profileMonthlyIncome: number;
  profileTodaySpent: number;
  customSounds: string[];
}

interface PrankContextType {
  settings: PrankSettings;
  updateSettings: (newSettings: Partial<PrankSettings>) => void;
  addCustomSound: (soundUri: string) => void;
  showPrankReveal: boolean;
  setShowPrankReveal: (show: boolean) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  sendMode: 'send' | 'receive';
  setSendMode: (mode: 'send' | 'receive') => void;
  deleteTransaction: (transactionId: string) => void;
  updateMonthlyIncome: (amount: number) => void;
}

const PrankContext = createContext<PrankContextType | undefined>(undefined);

export function PrankProvider({ children }: { children: React.ReactNode }) {
  const { translations, currentLanguage } = useLanguage();
  
  const [settings, setSettings] = useState<PrankSettings>({
    receiverName: 'John Doe',
    defaultAmount: 500,
    currency: 'SEK',
    profileName: 'Maria Smith',
    profileLocation: 'Stockholm, Sweden',
    profileBalance: 21500.00,
    profileMonthlyIncome: 300.90,
    profileTodaySpent: 600.90,
    customSounds: [],
  });

  const [showPrankReveal, setShowPrankReveal] = useState(false);
  const [sendMode, setSendMode] = useState<'send' | 'receive'>('receive');
  const [transactions, setTransactions] = useState<Transaction[]>(
    getLocalizedTransactions(translations, currentLanguage)
  );

  const updateSettings = (newSettings: Partial<PrankSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addCustomSound = (soundUri: string) => {
    setSettings(prev => ({ 
      ...prev, 
      customSounds: [...prev.customSounds, soundUri] 
    }));
  };

  const updateMonthlyIncome = (amount: number) => {
    setSettings(prev => ({ 
      ...prev, 
      profileMonthlyIncome: prev.profileMonthlyIncome + amount 
    }));
  };

  const addTransaction = (transaction: Transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (transactionId: string) => {
    setTransactions(prev => prev.filter(t => t.id !== transactionId));
  };

  return (
    <PrankContext.Provider value={{
      settings,
      updateSettings,
      addCustomSound,
      showPrankReveal,
      setShowPrankReveal,
      transactions,
      addTransaction,
      sendMode,
      setSendMode,
      deleteTransaction,
      updateMonthlyIncome
    }}>
      {children}
    </PrankContext.Provider>
  );
}

export function usePrank() {
  const context = useContext(PrankContext);
  const { translations } = useLanguage();
  
  if (context === undefined) {
    throw new Error(translations.prankProviderError);
  }
  return context;
}
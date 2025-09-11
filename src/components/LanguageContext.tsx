import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    appName: 'PashuMitra',
    dashboard: 'Dashboard',
    breedify: 'Breedify',
    nutrition: 'Nutrition',
    breeding: 'Breeding',
    health: 'Health',
    chatbot: 'Chat Assistant',
    about: 'About Us',
    help: 'Help',
    settings: 'Settings',
    uploadPhoto: 'Upload Photo',
    identifyBreed: 'Identify Breed',
    selectImage: 'Select Image',
    takePhoto: 'Take Photo',
    analyzing: 'Analyzing...',
    breedIdentified: 'Breed Identified',
    nutritionGuide: 'Nutrition Guide',
    feedingSchedule: 'Feeding Schedule',
    healthTips: 'Health Tips',
    breedingInfo: 'Breeding Information',
    welcome: 'Welcome to PashuMitra',
    subtitle: 'Your AI-powered cattle and buffalo companion',
    uploadInstruction: 'Upload a photo to identify the breed of your cattle or buffalo',
    chatWithAI: 'Chat with AI Assistant',
    askQuestion: 'Ask any question about your livestock...',
    send: 'Send',
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
    close: 'Close',
    menu: 'Menu'
  },
  hi: {
    appName: 'पशुमित्र',
    dashboard: 'डैशबोर्ड',
    breedify: 'नस्ल पहचान',
    nutrition: 'पोषण',
    breeding: 'प्रजनन',
    health: 'स्वास्थ्य',
    chatbot: 'चैट सहायक',
    about: 'हमारे बारे में',
    help: 'सहायता',
    settings: 'सेटिंग्स',
    uploadPhoto: 'फोटो अपलोड करें',
    identifyBreed: 'नस्ल की पहचान करें',
    selectImage: 'चित्र चुनें',
    takePhoto: 'फोटो खींचें',
    analyzing: 'विश्लेषण कर रहे हैं...',
    breedIdentified: 'नस्ल की पहचान हो गई',
    nutritionGuide: 'पोषण गाइड',
    feedingSchedule: 'खिलाने का समय',
    healthTips: 'स्वास्थ्य सुझाव',
    breedingInfo: 'प्रजनन जानकारी',
    welcome: 'पशुमित्र में आपका स्वागत है',
    subtitle: 'आपका AI-संचालित गाय और भैंस का साथी',
    uploadInstruction: 'अपनी गाय या भैंस की नस्ल की पहचान के लिए फोटो अपलोड करें',
    chatWithAI: 'AI सहायक से बात करें',
    askQuestion: 'अपने पशुओं के बारे में कोई भी प्रश्न पूछें...',
    send: 'भेजें',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    close: 'बंद करें',
    menu: 'मेन्यू'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
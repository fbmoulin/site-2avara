import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UIContextType {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  highContrast: boolean;
  setHighContrast: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTermsOpen: boolean;
  setIsTermsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(0);
  const [highContrast, setHighContrast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.remove('font-lg', 'font-xl');
    if (fontSize === 1) html.classList.add('font-lg');
    if (fontSize === 2) html.classList.add('font-xl');

    if (highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }, [fontSize, highContrast, isDarkMode]);

  return (
    <UIContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        isDarkMode,
        setIsDarkMode,
        isChatOpen,
        setIsChatOpen,
        isPrivacyOpen,
        setIsPrivacyOpen,
        isTermsOpen,
        setIsTermsOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export default UIContext;

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface AccessibilityState {
  fontSize: number;
  highContrast: boolean;
  isDarkMode: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
  toggleDarkMode: () => void;
  setFontSize: (size: number) => void;
}

const STORAGE_KEY = 'accessibility-preferences';

const defaultState: AccessibilityState = {
  fontSize: 0,
  highContrast: false,
  isDarkMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

function loadFromStorage(): AccessibilityState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultState, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load accessibility preferences:', e);
  }
  return defaultState;
}

function saveToStorage(state: AccessibilityState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save accessibility preferences:', e);
  }
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(defaultState);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setState(loadFromStorage());
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const html = document.documentElement;
    const body = document.body;

    html.classList.remove('font-lg', 'font-xl');
    if (state.fontSize === 1) html.classList.add('font-lg');
    if (state.fontSize === 2) html.classList.add('font-xl');

    if (state.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    if (state.isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }

    saveToStorage(state);
  }, [state, isInitialized]);

  const setFontSize = useCallback((size: number) => {
    setState(prev => ({ ...prev, fontSize: Math.max(0, Math.min(2, size)) }));
  }, []);

  const increaseFontSize = useCallback(() => {
    setState(prev => ({ ...prev, fontSize: Math.min(2, prev.fontSize + 1) }));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setState(prev => ({ ...prev, fontSize: Math.max(0, prev.fontSize - 1) }));
  }, []);

  const resetFontSize = useCallback(() => {
    setState(prev => ({ ...prev, fontSize: 0 }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setState(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  }, []);

  const value: AccessibilityContextType = {
    ...state,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    toggleDarkMode,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextType {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

export default AccessibilityContext;

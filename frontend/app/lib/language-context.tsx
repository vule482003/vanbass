"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, type Language, type Dictionary } from "../locales/dictionaries";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "vi",
  setLang: () => {},
  t: dictionaries.vi,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("vi");

  useEffect(() => {
    // Read saved language from localStorage on client mount
    try {
      const savedLang = localStorage.getItem("app_lang") as Language;
      if (savedLang === "vi" || savedLang === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(savedLang);
      }
    } catch {
      // Local storage might be blocked or unavailable
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("app_lang", newLang);
      // Clean up legacy google translate cookie if present
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } catch {
      // Ignore storage errors
    }
  };

  const t = dictionaries[lang] || dictionaries.vi;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
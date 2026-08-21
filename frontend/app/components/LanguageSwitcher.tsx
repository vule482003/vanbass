"use client";

import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
];

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function getInitialLanguage(): "vi" | "en" {
  if (typeof window === "undefined") return "vi";

  const rawCookie = getCookie("googtrans");
  if (rawCookie && rawCookie.includes("/en")) {
    return "en";
  }

  const saved = window.localStorage.getItem("app_lang") as "vi" | "en";
  return saved === "en" ? "en" : "vi";
}

function triggerGoogleTranslate(langCode: "vi" | "en") {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const cookieVal = `/vi/${langCode}`;
  document.cookie = `googtrans=${cookieVal}; path=/`;
  document.cookie = `googtrans=${cookieVal}; domain=${window.location.hostname}; path=/`;
  window.localStorage.setItem("app_lang", langCode);

  window.location.reload();
}

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<"vi" | "en">(getInitialLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: "vi" | "en") => {
    if (code === currentLang) {
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
    setCurrentLang(code);
    triggerGoogleTranslate(code);
  };

  return (
    <div ref={dropdownRef} className="lang-switcher notranslate">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="lang-btn"
        aria-label="Chọn ngôn ngữ"
        title={currentLang === "vi" ? "Tiếng Việt" : "English"}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item.code as "vi" | "en")}
              className={`lang-item ${item.code === currentLang ? "active" : ""}`}
            >
              {item.label}
              {item.code === currentLang && <span>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
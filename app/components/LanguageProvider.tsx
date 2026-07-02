"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { hi } from "@/app/i18n/dictionary";

type Language = "en" | "hi";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (l: Language) => void;
  toggle: () => void;
}>({ language: "en", setLanguage: () => {}, toggle: () => {} });

export function useLanguage() {
  return useContext(LanguageContext);
}

// Reverse map (Hindi -> English) so we can restore the page to English.
const en: Record<string, string> = Object.fromEntries(
  Object.entries(hi).map(([k, v]) => [v, k])
);

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEXTAREA",
  "CODE",
  "PRE",
]);

function translateTextNodes(map: Record<string, string>) {
  if (typeof document === "undefined") return;
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest("[data-no-translate]"))
          return NodeFilter.FILTER_REJECT;
        const raw = node.nodeValue ?? "";
        if (!raw.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }

  for (const node of nodes) {
    const raw = node.nodeValue ?? "";
    const trimmed = raw.trim();
    const replacement = map[trimmed];
    if (replacement && replacement !== trimmed) {
      // Preserve original leading/trailing whitespace.
      const lead = raw.slice(0, raw.indexOf(trimmed));
      const tail = raw.slice(raw.indexOf(trimmed) + trimmed.length);
      node.nodeValue = lead + replacement + tail;
    }
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const observerRef = useRef<MutationObserver | null>(null);

  const apply = useCallback((lang: Language) => {
    translateTextNodes(lang === "hi" ? hi : en);
  }, []);

  // Load stored preference on mount.
  useEffect(() => {
    const stored = localStorage.getItem("language") as Language | null;
    if (stored === "hi") {
      setLanguageState("hi");
    }
  }, []);

  // Apply translation whenever the language changes, and keep watching the DOM
  // (route changes / client renders add new nodes) while Hindi is active.
  useEffect(() => {
    document.documentElement.lang = language;
    apply(language);

    observerRef.current?.disconnect();
    if (language === "hi") {
      const observer = new MutationObserver((mutations) => {
        const hasAdded = mutations.some((m) => m.addedNodes.length > 0);
        if (hasAdded) {
          observer.disconnect();
          translateTextNodes(hi);
          observer.observe(document.body, { childList: true, subtree: true });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      observerRef.current = observer;
    }
    return () => observerRef.current?.disconnect();
  }, [language, apply]);

  const setLanguage = useCallback((l: Language) => {
    localStorage.setItem("language", l);
    setLanguageState(l);
  }, []);

  const toggle = useCallback(() => {
    setLanguage(language === "en" ? "hi" : "en");
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

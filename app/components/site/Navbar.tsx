"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { useLanguage } from "@/app/components/LanguageProvider";

const navLinks = [
  { to: "/", label: "Home", disabled: false },
  { to: "/about", label: "About Us", disabled: false },
  { to: "/events", label: "Events", disabled: false },
  { to: "/sdg", label: "SDG", disabled: false },
  { to: "/partners", label: "Partners", disabled: false },
  { to: "/contact", label: "Contact", disabled: false },
] as const;

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const langs: { code: "en" | "hi"; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिं" },
  ];
  return (
    <div
      data-no-translate
      className="inline-flex items-center rounded-full border border-border bg-background/60 p-0.5 text-xs font-semibold"
    >
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          aria-label={`Switch to ${l.code === "en" ? "English" : "Hindi"}`}
          className={`rounded-full px-2.5 py-1 transition ${
            language === l.code
              ? "bg-cyan-glow text-background"
              : "text-muted-text hover:text-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border bg-background/60 text-muted-foreground hover:text-foreground transition">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-8 h-20 flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full overflow-hidden bg-white">
            <img
              src="/assets/SDG_LOGO-removebg-preview.png"
              alt="StepUp for SDG"
              className="h-full w-full object-contain"
            />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) =>
            l.disabled ? (
              <span key={l.to}
                className="text-lg font-semibold text-muted-text cursor-default select-none">
                {l.label}
              </span>
            ) : (
              <Link key={l.to} href={l.to}
                className={`text-lg font-semibold transition-colors ${
                  (l.to === "/" ? pathname === "/" : pathname.startsWith(l.to))
                    ? "text-cyan-glow"
                    : "text-foreground/80 hover:text-foreground"
                }`}>
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/funds"
            className="inline-flex items-center gap-2 rounded-full bg-electric px-5 py-2.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(21,93,252,0.45)] hover:brightness-110 transition">
            Funds
          </Link>
          <Link href="/work-with-us"
            className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(255,122,0,0.45)] hover:brightness-110 transition">
            Work With Us
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 space-y-3">
          {navLinks.map((l) =>
            l.disabled ? (
              <span key={l.to} className="block text-muted-text cursor-default select-none">
                {l.label}
              </span>
            ) : (
              <Link key={l.to} href={l.to} onClick={() => setMobileOpen(false)}
                className={`block transition-colors ${
                  (l.to === "/" ? pathname === "/" : pathname.startsWith(l.to))
                    ? "text-cyan-glow"
                    : "text-muted-text hover:text-foreground"
                }`}>
                {l.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}

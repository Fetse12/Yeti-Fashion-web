import { useState, useEffect } from "react";

const links = [
  { href: "#academy", label: "Academy" },
  { href: "#production", label: "Production" },
  { href: "#lab", label: "Lab" },
  { href: "#gallery", label: "Gallery" },
  { href: "#blog", label: "Blog / News" },
  { href: "#contact", label: "Contact" },
];

function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  useEffect(() => {
    // Read current language from Google translated cookie
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2,})/);
    if (match) {
      if (match[1] === 'am') setCurrentLang('AM');
      else if (match[1] === 'om') setCurrentLang('OM');
      else setCurrentLang('EN');
    }
  }, []);

  const handleLanguageChange = (langDisplay, langCode) => {
    // Set the cookie for both paths and force reload to trigger translation
    if (langCode === 'en') {
      document.cookie = "googtrans=/en/en; path=/;";
      document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname + ";";
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=` + window.location.hostname + ";";
    }
    setCurrentLang(langDisplay);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-bold text-neutral-800 transition hover:bg-neutral-100 focus:outline-none"
      >
        <span>{currentLang}</span>
        <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-xl">
            <button onClick={() => handleLanguageChange('EN', 'en')} className="block w-full px-4 py-3 text-left text-sm font-semibold hover:bg-yeti-lime/20 text-neutral-900 border-b border-neutral-100">🇺🇸 English</button>
            <button onClick={() => handleLanguageChange('AM', 'am')} className="block w-full px-4 py-3 text-left text-sm font-semibold hover:bg-yeti-lime/20 text-neutral-900 border-b border-neutral-100">🇪🇹 አማርኛ (Amharic)</button>
            <button onClick={() => handleLanguageChange('OM', 'om')} className="block w-full px-4 py-3 text-left text-sm font-semibold hover:bg-yeti-lime/20 text-neutral-900">🇪🇹 Afaan Oromoo</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
      <div className="h-0.5 w-full bg-gradient-to-r from-yeti-lime/0 via-yeti-lime to-yeti-lime/0 opacity-80" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-md border-2 border-yeti-lime bg-neutral-900 text-sm font-bold tracking-tight text-yeti-lime transition group-hover:shadow-[0_0_0_3px_rgba(154,205,50,0.25)]">
            Y
          </div>
          <div className="leading-tight">
            <span className="block font-sans text-sm font-bold tracking-wide text-neutral-900">
              YETI
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Fashion Design
            </span>
          </div>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative font-sans text-sm font-semibold text-neutral-700 transition hover:text-yeti-lime after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-yeti-lime after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <nav className="flex gap-2 md:hidden" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-2 py-1 text-xs font-semibold text-neutral-700"
              >
                {l.label}
              </a>
            ))}
          </nav>
          
          {/* Google Translate Switcher injection point - hidden by css, driven by our custom dropdown */}
          <div id="google_translate_element"></div>
          
          <LanguageSwitcher />
          
          <a
            href="#enroll"
            className="rounded-full bg-yeti-lime px-4 py-2 text-center font-sans text-sm font-bold text-neutral-900 shadow-sm transition hover:bg-yeti-lime-dark hover:shadow md:px-6"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </header>
  );
}

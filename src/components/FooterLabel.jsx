function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8A3.6 3.6 0 0 0 20 16.4V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
      />
    </svg>
  );
}

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2v-2.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95z"
      />
    </svg>
  );
}

function IconTikTok(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
      />
    </svg>
  );
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"
      />
    </svg>
  );
}

function IconLocation(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

const footerLinks = {
  Company: [
    { label: "Academy", href: "#academy" },
    { label: "Production", href: "#production" },
    { label: "Lab", href: "#lab" },
    { label: "Gallery", href: "#gallery" },
  ],
  Resources: [
    { label: "Blog & News", href: "#blog" },
    { label: "Programs", href: "#academy" },
    { label: "Enroll Now", href: "#enroll" },
  ],
};

const socialLinks = [
  { Icon: IconInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: IconFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: IconTikTok, href: "https://tiktok.com", label: "TikTok" },
];

export default function FooterLabel() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="enroll" className="relative overflow-hidden bg-neutral-900">
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-yeti-lime/0 via-yeti-lime to-yeti-lime/0" />

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(154,205,50,0.5) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-yeti-lime/[0.04] blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-yeti-lime/[0.03] blur-3xl" />
      </div>

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-12 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="group inline-flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-lg border-2 border-yeti-lime bg-neutral-800 text-base font-bold tracking-tight text-yeti-lime transition group-hover:shadow-[0_0_12px_rgba(154,205,50,0.3)]">
                Y
              </div>
              <div className="leading-tight">
                <span className="block font-sans text-base font-bold tracking-wide text-white">
                  YETI
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
                  Fashion Design
                </span>
              </div>
            </a>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-neutral-400">
              Fashion academy and garment production based in Adama, Ethiopia.
              Building the next generation of African fashion talent.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700/60 text-neutral-400 transition-all duration-300 hover:border-yeti-lime/50 hover:bg-yeti-lime/10 hover:text-yeti-lime hover:shadow-[0_0_12px_rgba(154,205,50,0.15)]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-yeti-lime">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group/link inline-flex items-center gap-2 font-sans text-sm text-neutral-400 transition-colors hover:text-white"
                    >
                      <span className="inline-block h-px w-3 bg-neutral-700 transition-all group-hover/link:w-5 group-hover/link:bg-yeti-lime" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-yeti-lime">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="tel:+251911081210"
                  className="group/c flex items-start gap-3 font-sans text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 text-yeti-lime/60 transition group-hover/c:text-yeti-lime">
                    <IconPhone />
                  </span>
                  <span dir="ltr">+251 911 081 210</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 font-sans text-sm text-neutral-400">
                  <span className="mt-0.5 text-yeti-lime/60">
                    <IconLocation />
                  </span>
                  <span>
                    Adama, Ghenet Commercial Center
                    <br />
                    <span className="text-neutral-500">4th Floor</span>
                  </span>
                </div>
              </li>
              <li>
                <a
                  href="mailto:info@yetifashion.com"
                  className="group/c flex items-start gap-3 font-sans text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 text-yeti-lime/60 transition group-hover/c:text-yeti-lime">
                    <IconMail />
                  </span>
                  <span>info@yetifashion.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700/80 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
          <p className="font-sans text-xs text-neutral-500">
            © {currentYear}{" "}
            <span className="font-semibold text-neutral-400">
              Yeti Fashion Design
            </span>
            . All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-sans text-xs text-neutral-600">
            Powered by
            <a
              href="https://instagram.com/kasmaDigitals"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-yeti-lime/70 transition-colors hover:text-yeti-lime"
            >
              @kasmaDigitals
              <svg
                className="h-3 w-3"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5 3h8v8M13 3 3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

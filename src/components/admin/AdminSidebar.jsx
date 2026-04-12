import { useState, useEffect } from "react";

export default function AdminSidebar({ active, setActive, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    {
      id: "gallery",
      label: "Gallery",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "blog",
      label: "Blog / News",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16v16H4z" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "enrollments",
      label: "Enrollments",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const userString = localStorage.getItem("yeti_user");
  const user = userString ? JSON.parse(userString) : null;
  const isSuperadmin = user?.role === "superadmin";

  const visibleTabs = tabs.filter(tab => {
    if (isSuperadmin) return true;
    if (tab.id === "settings") return true; // Everyone sees settings
    return user?.permissions?.includes(tab.id);
  });

  const [msgCount, setMsgCount] = useState(0);
  const [enrollCount, setEnrollCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/messages/count`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("yeti_token")}` }
        });
        const data = await res.json();
        setMsgCount(data.count);
        
        const enrollRes = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/enrollments/count`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("yeti_token")}` }
        });
        const enrollData = await enrollRes.json();
        setEnrollCount(enrollData.count);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tabId) => {
    setActive(tabId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-neutral-800 bg-neutral-900 p-3 lg:hidden">
        <a href="/" className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-yeti-lime bg-neutral-800 text-xs font-bold text-yeti-lime">
            Y
          </div>
          <span className="font-sans text-sm font-bold text-white">YETI</span>
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 text-neutral-400"
          aria-label="Toggle sidebar"
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-neutral-800 bg-neutral-900 transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo — desktop only (mobile has its own top bar) */}
        <div className="hidden border-b border-neutral-800 p-5 lg:block">
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-yeti-lime bg-neutral-800 text-sm font-bold text-yeti-lime transition group-hover:shadow-[0_0_12px_rgba(154,205,50,0.3)]">
              Y
            </div>
            <div className="leading-tight">
              <span className="block font-sans text-sm font-bold tracking-wide text-white">
                YETI
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Admin Panel
              </span>
            </div>
          </a>
        </div>

        {/* Mobile close header inside sidebar */}
        <div className="flex items-center justify-between border-b border-neutral-800 p-4 lg:hidden">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="mb-3 px-3 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
            Manage
          </p>
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm font-medium transition-all ${
                active === tab.id
                  ? "bg-yeti-lime/10 text-yeti-lime shadow-sm"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {tab.icon}
              <span className="flex-1 text-left">{tab.label}</span>
              {tab.id === "messages" && msgCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yeti-lime text-[10px] font-bold text-neutral-900">
                  {msgCount}
                </span>
              )}
              {tab.id === "enrollments" && enrollCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yeti-lime text-[10px] font-bold text-neutral-900">
                  {enrollCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-neutral-800 p-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm font-medium text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

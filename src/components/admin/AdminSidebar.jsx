import { useState, useEffect } from "react";

export default function AdminSidebar({ active, setActive, onLogout }) {
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
  ];

  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/messages/count`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("yeti_token")}` }
        });
        const data = await res.json();
        setMsgCount(data.count);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-neutral-800 bg-neutral-900">
      {/* Logo */}
      <div className="border-b border-neutral-800 p-5">
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

      {/* Tabs */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-3 px-3 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
          Manage
        </p>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
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
  );
}

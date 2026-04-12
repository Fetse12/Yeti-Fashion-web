import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";
import GalleryManager from "../components/admin/GalleryManager.jsx";
import BlogManager from "../components/admin/BlogManager.jsx";
import MessageManager from "../components/admin/MessageManager.jsx";
import EnrollmentManager from "../components/admin/EnrollmentManager.jsx";
import SettingsManager from "../components/admin/SettingsManager.jsx";

export default function Admin() {
  const navigate = useNavigate();

  // Determine initial tab based on permissions
  const getInitialTab = () => {
    const userStr = localStorage.getItem("yeti_user");
    if (!userStr) return "gallery";
    
    const user = JSON.parse(userStr);
    if (user.role === "superadmin") return "gallery";
    if (user.permissions && user.permissions.length > 0) return user.permissions[0];
    return "settings";
  };

  const [active, setActive] = useState(getInitialTab);

  useEffect(() => {
    const token = localStorage.getItem("yeti_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("yeti_token");
    localStorage.removeItem("yeti_user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 lg:flex-row">
      <AdminSidebar
        active={active}
        setActive={setActive}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/90 px-4 py-4 backdrop-blur-md sm:px-6">
          <h1 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-1.5 font-sans text-xs font-semibold text-neutral-400 transition hover:border-yeti-lime/40 hover:text-yeti-lime"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5 3h8v8M13 3 3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">View Site</span>
            </a>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yeti-lime/10 text-xs font-bold text-yeti-lime">
              A
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          {active === "gallery" && <GalleryManager />}
          {active === "blog" && <BlogManager />}
          {active === "messages" && <MessageManager />}
          {active === "enrollments" && <EnrollmentManager />}
          {active === "settings" && <SettingsManager />}
        </div>
      </main>
    </div>
  );
}

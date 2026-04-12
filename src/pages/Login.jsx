import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem("yeti_token", res.data.token);
      localStorage.setItem("yeti_user", JSON.stringify(res.data.user));
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-neutral-900 px-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(154,205,50,0.5) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-yeti-lime/[0.06] blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yeti-lime/[0.04] blur-[100px]" />

        {/* Corner brackets */}
        <svg className="absolute left-6 top-6 h-20 w-20 text-yeti-lime/15" viewBox="0 0 80 80" fill="none">
          <path d="M6 30V6H30" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-6 right-6 h-20 w-20 text-yeti-lime/15" viewBox="0 0 80 80" fill="none">
          <path d="M74 50V74H50" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <a href="/" className="group inline-flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-yeti-lime bg-neutral-800 text-lg font-bold text-yeti-lime transition group-hover:shadow-[0_0_20px_rgba(154,205,50,0.3)]">
              Y
            </div>
            <div className="text-left leading-tight">
              <span className="block font-sans text-lg font-bold tracking-wide text-white">
                YETI
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Admin Panel
              </span>
            </div>
          </a>
        </div>

        {/* Login card */}
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800/50 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-yeti-lime/0 via-yeti-lime to-yeti-lime/0" />

          <div className="p-8">
            <h1 className="font-serif text-2xl font-bold text-white">
              Welcome back
            </h1>
            <p className="mt-2 font-sans text-sm text-neutral-400">
              Sign in to access the Yeti Fashion admin dashboard.
            </p>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-[0.2em] text-neutral-400"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  required
                  autoFocus
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900/80 px-4 py-3 font-sans text-sm text-white placeholder-neutral-600 outline-none transition focus:border-yeti-lime/50 focus:ring-2 focus:ring-yeti-lime/20"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block font-sans text-xs font-bold uppercase tracking-[0.2em] text-neutral-400"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900/80 px-4 py-3 font-sans text-sm text-white placeholder-neutral-600 outline-none transition focus:border-yeti-lime/50 focus:ring-2 focus:ring-yeti-lime/20"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full overflow-hidden rounded-lg bg-yeti-lime px-6 py-3 font-sans text-sm font-bold text-neutral-900 shadow-lg shadow-yeti-lime/20 transition-all hover:bg-yeti-lime-dark hover:shadow-yeti-lime/30 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center font-sans text-xs text-neutral-600">
          Powered by{" "}
          <a
            href="https://instagram.com/kasmaDigitals"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-yeti-lime/50 transition hover:text-yeti-lime"
          >
            @kasmaDigitals
          </a>
        </p>
      </div>
    </div>
  );
}

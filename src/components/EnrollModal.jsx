import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function EnrollModal({ isOpen, onClose }) {
  const [step, setStep] = useState("duration"); // duration | form | success
  const [duration, setDuration] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    education: "",
    motivation: "",
  });
  const [status, setStatus] = useState("idle");

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("duration");
      setDuration(null);
      setForm({ fullName: "", email: "", phone: "", age: "", education: "", motivation: "" });
      setStatus("idle");
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleDurationSelect = (d) => {
    setDuration(d);
    setStep("form");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: form.age ? Number(form.age) : undefined, duration }),
      });
      if (res.ok) {
        setStep("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-yeti-lime via-yeti-lime/70 to-yeti-lime/30" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-800"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* ── Step 1: Duration Selection ── */}
        {step === "duration" && (
          <div className="p-6 sm:p-8">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yeti-lime/15 text-xs font-bold text-yeti-lime">1</span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-yeti-lime">Step 1</span>
            </div>
            <h2 className="mt-2 font-sans text-2xl font-black text-neutral-900 sm:text-3xl">
              Choose Your Program
            </h2>
            <p className="mt-2 font-sans text-sm text-neutral-500">
              Select the training duration that fits your schedule and career goals.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 3 Month Card */}
              <button
                onClick={() => handleDurationSelect("3-month")}
                className="group relative overflow-hidden rounded-xl border-2 border-neutral-200 p-5 text-left transition-all hover:border-yeti-lime hover:shadow-lg hover:shadow-yeti-lime/10"
              >
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-yeti-lime/5 transition group-hover:bg-yeti-lime/15" />
                <span className="relative font-sans text-3xl font-black text-neutral-900">3</span>
                <span className="relative ml-1 font-sans text-sm font-bold uppercase tracking-wider text-neutral-500">Months</span>
                <p className="relative mt-2 font-sans text-xs leading-relaxed text-neutral-400">
                  Intensive fast-track program covering core pattern-making, sewing, and finishing.
                </p>
                <div className="relative mt-3 flex items-center gap-1 font-sans text-xs font-bold text-yeti-lime opacity-0 transition group-hover:opacity-100">
                  Select
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {/* 6 Month Card */}
              <button
                onClick={() => handleDurationSelect("6-month")}
                className="group relative overflow-hidden rounded-xl border-2 border-neutral-200 p-5 text-left transition-all hover:border-yeti-lime hover:shadow-lg hover:shadow-yeti-lime/10"
              >
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-yeti-lime/5 transition group-hover:bg-yeti-lime/15" />
                <span className="relative font-sans text-3xl font-black text-neutral-900">6</span>
                <span className="relative ml-1 font-sans text-sm font-bold uppercase tracking-wider text-neutral-500">Months</span>
                <div className="absolute right-2 top-2 rounded-full bg-yeti-lime/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-yeti-lime">
                  Popular
                </div>
                <p className="relative mt-2 font-sans text-xs leading-relaxed text-neutral-400">
                  Complete fashion design program: draping, CAD, production, and portfolio building.
                </p>
                <div className="relative mt-3 flex items-center gap-1 font-sans text-xs font-bold text-yeti-lime opacity-0 transition group-hover:opacity-100">
                  Select
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Application Form ── */}
        {step === "form" && (
          <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
            {/* Back + header */}
            <div className="mb-1 flex items-center gap-2">
              <button
                onClick={() => setStep("duration")}
                className="flex items-center gap-1 font-sans text-xs font-bold text-neutral-400 transition hover:text-neutral-700"
              >
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </button>
              <span className="text-neutral-300">·</span>
              <span className="rounded-full bg-yeti-lime/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yeti-lime">
                {duration === "3-month" ? "3 Month Program" : "6 Month Program"}
              </span>
            </div>

            <h2 className="mt-2 font-sans text-xl font-black text-neutral-900 sm:text-2xl">
              Application Form
            </h2>
            <p className="mt-1 font-sans text-sm text-neutral-500">
              Fill in your details and we'll contact you to complete your enrollment.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-900 outline-none transition focus:border-yeti-lime focus:ring-2 focus:ring-yeti-lime/20"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-900 outline-none transition focus:border-yeti-lime focus:ring-2 focus:ring-yeti-lime/20"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-900 outline-none transition focus:border-yeti-lime focus:ring-2 focus:ring-yeti-lime/20"
                    placeholder="+251 ..."
                  />
                </div>
                <div>
                  <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Age
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="60"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-900 outline-none transition focus:border-yeti-lime focus:ring-2 focus:ring-yeti-lime/20"
                    placeholder="Your age"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Education Background
                </label>
                <input
                  type="text"
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-900 outline-none transition focus:border-yeti-lime focus:ring-2 focus:ring-yeti-lime/20"
                  placeholder="e.g. High school diploma, BSc in..."
                />
              </div>

              <div>
                <label className="mb-1 block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Why do you want to join? (Optional)
                </label>
                <textarea
                  rows={3}
                  value={form.motivation}
                  onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-900 outline-none transition focus:border-yeti-lime focus:ring-2 focus:ring-yeti-lime/20"
                  placeholder="Tell us about your goals..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-sans text-sm font-bold uppercase tracking-widest transition-all ${
                  status === "sending"
                    ? "cursor-not-allowed bg-neutral-100 text-neutral-400"
                    : "bg-yeti-lime text-neutral-900 shadow-md shadow-yeti-lime/20 hover:bg-yeti-lime-dark"
                }`}
              >
                {status === "sending" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-700">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        )}

        {/* ── Step 3: Success ── */}
        {step === "success" && (
          <div className="flex flex-col items-center p-8 text-center sm:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yeti-lime/15">
              <svg className="h-8 w-8 text-yeti-lime" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-4 font-sans text-2xl font-black text-neutral-900">
              Application Submitted!
            </h2>
            <p className="mt-2 max-w-xs font-sans text-sm text-neutral-500">
              Thank you for your interest in the{" "}
              <span className="font-bold text-yeti-lime">{duration === "3-month" ? "3-Month" : "6-Month"}</span>{" "}
              program. We'll review your application and contact you shortly.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-yeti-lime/10 px-4 py-2.5 text-xs font-semibold text-yeti-lime">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l2.2 4.5L15 6l-3.5 3.4.8 4.9L8 12l-4.3 2.3.8-4.9L1 6l4.8-.5L8 1z" fill="currentColor" />
              </svg>
              You'll receive priority consideration
            </div>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-neutral-900 px-6 py-2.5 font-sans text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

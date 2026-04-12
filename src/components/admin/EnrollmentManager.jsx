import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";
const STATUS_COLORS = {
  pending: "bg-amber-400/15 text-amber-400 border-amber-400/30",
  contacted: "bg-blue-400/15 text-blue-400 border-blue-400/30",
  accepted: "bg-emerald-400/15 text-emerald-400 border-emerald-400/30",
  rejected: "bg-red-400/15 text-red-400 border-red-400/30",
};

function EnrollmentCard({ enrollment, onStatusChange, onDelete }) {
  const [expandedMotivation, setExpandedMotivation] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl border p-4 transition-all sm:p-5 ${
      enrollment.status === "pending"
        ? "border-amber-400/30 bg-neutral-900 shadow-[0_0_12px_rgba(251,191,36,0.04)]"
        : "border-neutral-800 bg-neutral-900/50"
    }`}>
      {enrollment.status === "pending" && (
        <div className="absolute right-0 top-0 rounded-bl-lg bg-amber-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-neutral-900">
          New
        </div>
      )}

      <div className="space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h4 className="font-sans text-sm font-bold text-white">{enrollment.fullName}</h4>
            <div className="mt-1 flex flex-col gap-1 text-[11px] text-neutral-400 sm:flex-row sm:gap-3">
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {enrollment.email}
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {enrollment.phone}
              </span>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">
            {new Date(enrollment.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Extra info */}
        <div className="flex flex-wrap gap-2 text-[10px]">
          {enrollment.age && (
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-400">
              Age: {enrollment.age}
            </span>
          )}
          {enrollment.education && (
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-400">
              {enrollment.education}
            </span>
          )}
        </div>

        {enrollment.motivation && (
          <div className="rounded-lg bg-black/30 p-2.5 text-xs leading-relaxed text-neutral-400">
            {enrollment.motivation.length > 100 && !expandedMotivation
              ? enrollment.motivation.slice(0, 100) + "..."
              : enrollment.motivation}
            {enrollment.motivation.length > 100 && (
              <button
                onClick={() => setExpandedMotivation(!expandedMotivation)}
                className="ml-1 text-yeti-lime hover:underline"
              >
                {expandedMotivation ? "less" : "more"}
              </button>
            )}
          </div>
        )}

        {/* Status + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <select
            value={enrollment.status}
            onChange={(e) => onStatusChange(enrollment._id, e.target.value)}
            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider outline-none transition ${STATUS_COLORS[enrollment.status]}`}
            style={{ backgroundColor: 'transparent' }}
          >
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <button
            onClick={() => onDelete(enrollment._id)}
            className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-red-400/70 transition hover:bg-red-500/10 hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EnrollmentManager() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/enrollments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("yeti_token")}` },
      });
      const data = await res.json();
      setEnrollments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnrollments(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/enrollments/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("yeti_token")}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchEnrollments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enrollment application?")) return;
    try {
      await fetch(`${API_URL}/api/enrollments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("yeti_token")}` },
      });
      fetchEnrollments();
    } catch (err) {
      console.error(err);
    }
  };

  const threeMonth = enrollments.filter((e) => e.duration === "3-month");
  const sixMonth = enrollments.filter((e) => e.duration === "6-month");

  if (loading) return <div className="p-8 text-neutral-500">Loading enrollments...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Enrollment Applications</h2>
          <p className="text-sm text-neutral-500">Review and manage student applications</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-yeti-lime" />
            <span className="text-xs font-bold text-neutral-300">{threeMonth.length}</span>
            <span className="text-[10px] text-neutral-500">3-Month</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs font-bold text-neutral-300">{sixMonth.length}</span>
            <span className="text-[10px] text-neutral-500">6-Month</span>
          </div>
        </div>
      </div>

      {enrollments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-800 p-8 text-center text-neutral-500 sm:p-12">
          No enrollment applications yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 3-Month Column */}
          <div>
            <div className="mb-3 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yeti-lime/15 font-sans text-xs font-black text-yeti-lime">
                3
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold text-white">3-Month Program</h3>
                <p className="text-[10px] text-neutral-500">{threeMonth.length} application{threeMonth.length !== 1 ? "s" : ""}</p>
              </div>
            </div>
            <div className="space-y-3">
              {threeMonth.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-800 p-6 text-center text-xs text-neutral-600">
                  No 3-month applications
                </div>
              ) : (
                threeMonth.map((e) => (
                  <EnrollmentCard
                    key={e._id}
                    enrollment={e}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>

          {/* 6-Month Column */}
          <div>
            <div className="mb-3 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/15 font-sans text-xs font-black text-amber-400">
                6
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold text-white">6-Month Program</h3>
                <p className="text-[10px] text-neutral-500">{sixMonth.length} application{sixMonth.length !== 1 ? "s" : ""}</p>
              </div>
            </div>
            <div className="space-y-3">
              {sixMonth.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-800 p-6 text-center text-xs text-neutral-600">
                  No 6-month applications
                </div>
              ) : (
                sixMonth.map((e) => (
                  <EnrollmentCard
                    key={e._id}
                    enrollment={e}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

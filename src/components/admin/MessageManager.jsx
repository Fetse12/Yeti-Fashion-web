import { useState, useEffect } from "react";

export default function MessageManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("yeti_token")}`,
        },
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/messages/${id}/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("yeti_token")}`,
        },
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("yeti_token")}`,
        },
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-neutral-500">Loading messages...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Inquiries</h2>
          <p className="text-sm text-neutral-500">Manage messages from the contact form</p>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-800 p-12 text-center text-neutral-500">
            No messages found.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`relative overflow-hidden rounded-xl border p-6 transition-all ${
                msg.status === "unread"
                  ? "border-yeti-lime bg-neutral-900 shadow-[0_0_15px_rgba(154,205,50,0.05)]"
                  : "border-neutral-800 bg-neutral-900/50"
              }`}
            >
              {msg.status === "unread" && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-yeti-lime px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                  New
                </div>
              )}
              
              <div className="flex flex-wrap justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white">{msg.name}</h3>
                  <div className="flex gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {msg.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {msg.phone}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-black/30 p-4 text-sm leading-relaxed text-neutral-300">
                {msg.message}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                {msg.status === "unread" && (
                  <button
                    onClick={() => markAsRead(msg._id)}
                    className="rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-yeti-lime transition hover:bg-yeti-lime/10"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400 transition hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

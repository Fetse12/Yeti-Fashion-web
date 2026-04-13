import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";
const CATEGORIES = ["News", "Blog", "Events"];

function getToken() {
  return localStorage.getItem("yeti_token");
}

function authHeaders() {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
}

const emptyForm = {
  title: "",
  category: "Blog",
  excerpt: "",
  date: new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  readTime: "3 min",
  featured: false,
};

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null); // { type: 'success' | 'error', text: string }

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blog`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (post) => {
    setEditing(post._id);
    setForm({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      featured: post.featured,
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });
    if (imageFile) data.append("image", imageFile);

    try {
      if (editing) {
        await axios.put(`${API_URL}/api/blog/${editing}`, data, authHeaders());
        setStatusMsg({ type: "success", text: "Blog post updated!" });
      } else {
        await axios.post(`${API_URL}/api/blog`, data, authHeaders());
        setStatusMsg({ type: "success", text: "New blog post published!" });
      }
      setShowForm(false);
      fetchPosts();
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || "Save failed";
      setStatusMsg({ type: "error", text: msg });
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`${API_URL}/api/blog/${id}`, authHeaders());
      setPosts(posts.filter((p) => p._id !== id));
      setStatusMsg({ type: "success", text: "Post deleted." });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };


  const toggleFeatured = async (post) => {
    try {
      await axios.put(
        `${API_URL}/api/blog/${post._id}`,
        { featured: !post.featured },
        authHeaders()
      );
      fetchPosts();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div>
      {/* Status Messages */}
      {statusMsg && (
        <div
          className={`mb-4 rounded-lg p-4 text-sm font-bold shadow-lg transition-all ${
            statusMsg.type === "success"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {statusMsg.type === "success" ? "✅ " : "❌ "}
          {statusMsg.text}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
            Blog / News
          </h2>
          <p className="mt-1 font-sans text-sm text-neutral-400">
            Manage blog posts and news articles.
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-yeti-lime px-4 py-2.5 font-sans text-sm font-bold text-neutral-900 shadow-md shadow-yeti-lime/20 transition hover:bg-yeti-lime-dark sm:w-auto"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add Post
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="mb-8 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/80 shadow-xl backdrop-blur-sm">
          <div className="h-1 w-full bg-gradient-to-r from-yeti-lime via-yeti-lime/60 to-transparent" />
          <form onSubmit={handleSave} className="space-y-4 p-6">
            <h3 className="font-sans text-lg font-bold text-white">
              {editing ? "Edit Post" : "New Post"}
            </h3>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Date
                </label>
                <input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                  placeholder="Apr 10, 2026"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Read Time
                </label>
                <input
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                  placeholder="3 min"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                Excerpt
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                required
                rows={3}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Cover Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-400 file:mr-3 file:rounded-md file:border-0 file:bg-yeti-lime/20 file:px-3 file:py-1 file:text-xs file:font-bold file:text-yeti-lime"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-neutral-600 bg-neutral-900 text-yeti-lime accent-yeti-lime"
                  />
                  <span className="text-sm font-medium text-neutral-300">
                    Featured post
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-yeti-lime px-5 py-2 text-sm font-bold text-neutral-900 shadow transition hover:bg-yeti-lime-dark disabled:opacity-60"
              >
                {saving ? "Saving…" : editing ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-neutral-700 px-5 py-2 text-sm font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-yeti-lime/30 border-t-yeti-lime" />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 text-neutral-500">
          <p className="text-sm">No blog posts yet.</p>
          <button onClick={openNew} className="mt-2 text-sm font-bold text-yeti-lime hover:underline">
            Write your first post
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-800 overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-800/50">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Title
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Category
                </th>
                <th className="hidden px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-400 sm:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Featured
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b border-neutral-800/50 transition hover:bg-neutral-800/30"
                >
                  <td className="max-w-[200px] truncate px-4 py-3 font-medium text-white">
                    <div className="flex items-center gap-3">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage.startsWith("http") ? post.coverImage : `${API_URL}${post.coverImage}`}
                          alt=""
                          className="h-9 w-9 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-lg bg-neutral-700" title="No cover" />
                      )}
                      {post.title}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-yeti-lime/10 px-2.5 py-0.5 text-xs font-bold text-yeti-lime">
                      {post.category}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-neutral-400 sm:table-cell">
                    {post.date}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleFeatured(post)}
                      className={`inline-flex h-6 w-6 items-center justify-center rounded transition ${
                        post.featured
                          ? "bg-yeti-lime/20 text-yeti-lime"
                          : "text-neutral-600 hover:text-neutral-400"
                      }`}
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 16 16"
                        fill={post.featured ? "currentColor" : "none"}
                      >
                        <path
                          d="M8 1l2.2 4.5L15 6l-3.5 3.4.8 4.9L8 12l-4.3 2.3.8-4.9L1 6l4.8-.5L8 1z"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(post)}
                      className="mr-2 rounded px-2 py-1 text-xs font-semibold text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="rounded px-2 py-1 text-xs font-semibold text-red-400/70 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

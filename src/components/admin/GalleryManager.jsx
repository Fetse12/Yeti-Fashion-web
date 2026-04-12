import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";
const CATEGORIES = ["Academy", "Production", "Lab", "Events"];
const GRADIENTS = [
  "from-emerald-900 via-neutral-900 to-neutral-800",
  "from-neutral-800 via-neutral-900 to-emerald-950",
  "from-neutral-900 via-emerald-950 to-neutral-800",
  "from-emerald-950 via-neutral-900 to-neutral-800",
  "from-neutral-800 via-emerald-950 to-neutral-900",
  "from-neutral-900 via-neutral-800 to-emerald-950",
];

function getToken() {
  return localStorage.getItem("yeti_token");
}

function authHeaders() {
  return { headers: { Authorization: `Bearer ${getToken()}` } };
}

const emptyForm = {
  title: "",
  category: "Academy",
  description: "",
  gradient: GRADIENTS[0],
};

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/gallery`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      gradient: item.gradient || GRADIENTS[0],
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append("title", form.title);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("gradient", form.gradient);
    if (imageFile) data.append("image", imageFile);

    try {
      if (editing) {
        await axios.put(`${API_URL}/api/gallery/${editing}`, data, authHeaders());
      } else {
        await axios.post(`${API_URL}/api/gallery`, data, authHeaders());
      }
      setShowForm(false);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/gallery/${id}`, authHeaders());
      setItems(items.filter((i) => i._id !== id));
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">Gallery</h2>
          <p className="mt-1 font-sans text-sm text-neutral-400">
            Manage gallery items displayed on the homepage.
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-yeti-lime px-4 py-2.5 font-sans text-sm font-bold text-neutral-900 shadow-md shadow-yeti-lime/20 transition hover:bg-yeti-lime-dark"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add Item
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="mb-8 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/80 shadow-xl backdrop-blur-sm">
          <div className="h-1 w-full bg-gradient-to-r from-yeti-lime via-yeti-lime/60 to-transparent" />
          <form onSubmit={handleSave} className="space-y-4 p-6">
            <h3 className="font-sans text-lg font-bold text-white">
              {editing ? "Edit Item" : "New Gallery Item"}
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={3}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-400 file:mr-3 file:rounded-md file:border-0 file:bg-yeti-lime/20 file:px-3 file:py-1 file:text-xs file:font-bold file:text-yeti-lime"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Gradient
                </label>
                <select
                  value={form.gradient}
                  onChange={(e) => setForm({ ...form, gradient: e.target.value })}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
                >
                  {GRADIENTS.map((g, i) => (
                    <option key={g} value={g}>
                      Gradient {i + 1}
                    </option>
                  ))}
                </select>
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
      ) : items.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-700 text-neutral-500">
          <p className="text-sm">No gallery items yet.</p>
          <button onClick={openNew} className="mt-2 text-sm font-bold text-yeti-lime hover:underline">
            Add your first item
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-800">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-800/50">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Title
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Category
                </th>
                <th className="hidden px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-400 md:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-neutral-800/50 transition hover:bg-neutral-800/30"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img
                          src={`${API_URL}${item.image}`}
                          alt=""
                          className="h-9 w-9 rounded-lg object-cover"
                        />
                      ) : (
                        <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${item.gradient}`} />
                      )}
                      {item.title}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-yeti-lime/10 px-2.5 py-0.5 text-xs font-bold text-yeti-lime">
                      {item.category}
                    </span>
                  </td>
                  <td className="hidden max-w-xs truncate px-4 py-3 text-neutral-400 md:table-cell">
                    {item.description}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(item)}
                      className="mr-2 rounded px-2 py-1 text-xs font-semibold text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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

import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

const availablePermissions = [
  { id: "gallery", label: "Gallery" },
  { id: "blog", label: "Blog / News" },
  { id: "messages", label: "Messages" },
  { id: "enrollments", label: "Enrollments" },
];

export default function SettingsManager() {
  const [user, setUser] = useState(null);
  
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwdStatus, setPwdStatus] = useState("");
  
  const [newUser, setNewUser] = useState({ username: "", password: "", permissions: [] });
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("yeti_user");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      setUser(parsed);
      if (parsed.role === "superadmin") {
        fetchUsers();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("yeti_token")}` }
      });
      const data = await res.json();
      setUsersList(data);
    } catch (err) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdStatus("error:Passwords do not match");
      return;
    }
    
    setPwdStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("yeti_token")}`,
        },
        body: JSON.stringify({
          currentPassword: pwdForm.currentPassword,
          newPassword: pwdForm.newPassword
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update password");
      
      setPwdStatus("success:Password updated successfully");
      setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPwdStatus(`error:${err.message}`);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setUserStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("yeti_token")}`,
        },
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password,
          role: "admin",
          permissions: newUser.permissions
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create user");
      
      setUserStatus("success:User created successfully");
      setNewUser({ username: "", password: "", permissions: [] });
      fetchUsers();
    } catch (err) {
      setUserStatus(`error:${err.message}`);
    }
  };

  const handleDeleteUser = async (id, isSuper) => {
    if (isSuper) return alert("Cannot delete a superadmin.");
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await fetch(`${API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("yeti_token")}` }
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePermission = (permId) => {
    if (newUser.permissions.includes(permId)) {
      setNewUser({ ...newUser, permissions: newUser.permissions.filter(p => p !== permId) });
    } else {
      setNewUser({ ...newUser, permissions: [...newUser.permissions, permId] });
    }
  };

  if (loading || !user) return <div className="p-8 text-neutral-500">Loading settings...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">Settings</h2>
        <p className="text-sm text-neutral-500">Manage your account preferences</p>
      </div>

      {/* Change Password Block */}
      <div className="max-w-2xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50">
        <div className="border-b border-neutral-800 px-6 py-4">
          <h3 className="font-bold text-white">Change Password</h3>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4 p-6">
          {user.role !== "superadmin" && (
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">Current Password</label>
              <input
                type="password"
                required
                value={pwdForm.currentPassword}
                onChange={e => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
              />
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={pwdForm.newPassword}
                onChange={e => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">Confirm Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={pwdForm.confirmPassword}
                onChange={e => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={pwdStatus === "loading"}
              className="rounded-lg bg-yeti-lime px-5 py-2 text-sm font-bold text-neutral-900 shadow transition hover:bg-yeti-lime-dark disabled:opacity-50"
            >
              Update Password
            </button>
            {pwdStatus.startsWith("error:") && <span className="text-sm font-medium text-red-400">{pwdStatus.split(":")[1]}</span>}
            {pwdStatus.startsWith("success:") && <span className="text-sm font-medium text-yeti-lime">{pwdStatus.split(":")[1]}</span>}
          </div>
        </form>
      </div>

      {/* User Management Block (Superadmin Only) */}
      {user.role === "superadmin" && (
        <div className="space-y-6 pt-4">
          <div className="border-t border-neutral-800 pt-8 mt-8">
            <h3 className="text-lg font-bold text-white">User Management</h3>
            <p className="text-xs text-neutral-500">Create subordinate admins and control their tab access.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Create User Form */}
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50">
              <div className="border-b border-neutral-800 px-6 py-4">
                <h4 className="font-bold text-white text-sm">Add New Admin</h4>
              </div>
              <form onSubmit={handleCreateUser} className="space-y-4 p-6">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">Username</label>
                  <input
                    type="text"
                    required
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-400">Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-yeti-lime/50"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-400">Module Access</label>
                  <div className="grid grid-cols-2 gap-3">
                    {availablePermissions.map(p => (
                      <label key={p.id} className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newUser.permissions.includes(p.id)}
                          onChange={() => togglePermission(p.id)}
                          className="h-4 w-4 rounded border-neutral-600 bg-neutral-900 text-yeti-lime accent-yeti-lime"
                        />
                        <span className="text-sm font-medium text-neutral-300">{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={userStatus === "loading"}
                    className="w-full rounded-lg bg-neutral-800 px-5 py-2 text-sm font-bold text-white shadow border border-neutral-700 transition hover:bg-neutral-700 hover:border-yeti-lime/50 disabled:opacity-50"
                  >
                    Create User
                  </button>
                  {userStatus.startsWith("error:") && <p className="mt-2 text-sm font-medium text-red-400 text-center">{userStatus.split(":")[1]}</p>}
                  {userStatus.startsWith("success:") && <p className="mt-2 text-sm font-medium text-yeti-lime text-center">{userStatus.split(":")[1]}</p>}
                </div>
              </form>
            </div>

            {/* List Users */}
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50">
              <div className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
                <h4 className="font-bold text-white text-sm">Active Users</h4>
                <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-xs text-neutral-400">{usersList.length}</span>
              </div>
              <div className="divide-y divide-neutral-800 max-h-[400px] overflow-y-auto">
                {usersList.map(u => (
                  <div key={u._id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{u.username}</span>
                        {u.role === "superadmin" && (
                          <span className="text-[9px] uppercase tracking-wider bg-yeti-lime/10 text-yeti-lime px-2 py-0.5 rounded-full font-bold">Super</span>
                        )}
                      </div>
                      {u.role !== "superadmin" && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {u.permissions.map(p => (
                            <span key={p} className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                              {p}
                            </span>
                          ))}
                          {u.permissions.length === 0 && <span className="text-[10px] text-neutral-600">No permissions</span>}
                        </div>
                      )}
                    </div>
                    {u.role !== "superadmin" && (
                      <button
                        onClick={() => handleDeleteUser(u._id, false)}
                        className="text-xs font-bold uppercase tracking-widest text-red-400/70 hover:text-red-400"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

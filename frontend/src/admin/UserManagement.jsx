
import { useMemo, useState } from "react";
import "./UserManagement.css";
import "./AdminDashboard.css";

const initialUsers = [
  { id: "U001", name: "Kasun Perera", email: "kasun@example.com", role: "Student", status: "Active", joined: "2026-09-12" },
  { id: "U002", name: "Nimali Silva", email: "nimali@example.com", role: "Boarding Owner", status: "Active", joined: "2026-09-10" },
  { id: "U003", name: "Amal Fernando", email: "amal@example.com", role: "Student", status: "Suspended", joined: "2026-09-08" },
  { id: "U004", name: "Tharushi Jayasuriya", email: "tharushi@example.com", role: "Student", status: "Active", joined: "2026-09-05" },
  { id: "U005", name: "Ruwan Peris", email: "ruwan@example.com", role: "Boarding Owner", status: "Active", joined: "2026-09-02" },
  { id: "U006", name: "Sanduni Dias", email: "sanduni@example.com", role: "Student", status: "Active", joined: "2026-08-28" },
];

const navItems = [
  ["▦", "Dashboard", "/admin"],
  ["♙", "Users", "/admin/users"],
  ["⌂", "Listings", "/admin/boarding-verification"],
  ["⚑", "Complaints", "/admin/complaints"],
  ["☆", "Reviews", "/admin/reviews"],
  ["▥", "System Stats", "/admin/analytics"],
  ["✧", "Settings", "/admin/settings"],
];

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toLowerCase().includes(term);

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function toggleStatus(id) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" }
          : user
      )
    );
    setSelectedUser(null);
  }

  return (
    <div className="bb-admin">
      <aside className="bb-sidebar">
        <a href="/admin" className="bb-brand">
          <span className="bb-logo">⌂</span>
          <span>Boarding Buddy<small>ADMINISTRATION</small></span>
        </a>

        <p className="bb-menu-label">MAIN MENU</p>
        <nav className="bb-menu">
          {navItems.map(([icon, label, href]) => (
            <a
              href={href}
              key={label}
              className={`bb-menu-link ${label === "Users" ? "selected" : ""}`}
            >
              <span className="bb-menu-icon">{icon}</span>
              <span>{label}</span>
              {label === "Users" && <span className="bb-active-mark" />}
            </a>
          ))}
        </nav>

        <div className="bb-sidebar-bottom">
          <div className="bb-admin-avatar">A</div>
          <div className="bb-admin-user">
            <strong>Administrator</strong>
            <small>System Admin</small>
          </div>
          <span className="bb-online" />
        </div>
      </aside>

      <main className="bb-main">
        <header className="bb-header">
          <div className="bb-header-title">
            <span className="bb-header-mark">⌂</span>
            <span>Boarding Buddy <span className="bb-divider">/</span> Users</span>
          </div>
          <div className="bb-header-right">
            <span className="bb-status"><i /> System Online</span>
            <div className="bb-header-avatar">A</div>
          </div>
        </header>

        <div className="bb-content">
          <div className="bb-page-heading">
            <div>
              <p className="bb-eyebrow">USER ADMINISTRATION</p>
              <h1>User Management</h1>
              <p className="bb-subtitle">View, search and manage Boarding Buddy user accounts.</p>
            </div>
            <button className="bb-report-button" onClick={() => window.print()}>
              ↓ &nbsp; Print User List
            </button>
          </div>

          <section className="um-summary">
            <article className="um-summary-card">
              <span className="um-summary-icon">♙</span>
              <div><p>Total Users</p><strong>{users.length}</strong></div>
            </article>
            <article className="um-summary-card">
              <span className="um-summary-icon um-green">✓</span>
              <div><p>Active Users</p><strong>{users.filter((u) => u.status === "Active").length}</strong></div>
            </article>
            <article className="um-summary-card">
              <span className="um-summary-icon um-purple">⌂</span>
              <div><p>Boarding Owners</p><strong>{users.filter((u) => u.role === "Boarding Owner").length}</strong></div>
            </article>
            <article className="um-summary-card">
              <span className="um-summary-icon um-red">!</span>
              <div><p>Suspended</p><strong>{users.filter((u) => u.status === "Suspended").length}</strong></div>
            </article>
          </section>

          <section className="um-table-panel">
            <div className="um-table-heading">
              <div>
                <h2>All Users</h2>
                <p>Manage registered students and boarding owners</p>
              </div>
              <span className="um-count">{filteredUsers.length} users</span>
            </div>

            <div className="um-toolbar">
              <label className="um-search">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, email or user ID..."
                  aria-label="Search users"
                />
              </label>

              <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} aria-label="Filter by role">
                <option value="All">All roles</option>
                <option value="Student">Student</option>
                <option value="Boarding Owner">Boarding Owner</option>
              </select>

              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status">
                <option value="All">All statuses</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="um-table-scroll">
              <table className="um-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>User ID</th>
                    <th>Role</th>
                    <th>Joined Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="um-person">
                          <span className="um-person-avatar">{user.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                          <span><strong>{user.name}</strong><small>{user.email}</small></span>
                        </div>
                      </td>
                      <td className="um-id">{user.id}</td>
                      <td><span className={`um-role ${user.role === "Student" ? "student" : "owner"}`}>{user.role}</span></td>
                      <td className="um-date">{user.joined}</td>
                      <td><span className={`um-status ${user.status.toLowerCase()}`}><i />{user.status}</span></td>
                      <td>
                        <button className="um-action" onClick={() => setSelectedUser(user)} aria-label={`View ${user.name}`}>View</button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr><td colSpan="6" className="um-empty">No users match your search or filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="um-table-footer">
              <span>Showing {filteredUsers.length} of {users.length} users</span>
              <button onClick={() => { setSearch(""); setRoleFilter("All"); setStatusFilter("All"); }}>
                Reset filters
              </button>
            </div>
          </section>
        </div>
      </main>

      {selectedUser && (
        <div className="um-modal-backdrop" onClick={() => setSelectedUser(null)}>
          <section className="um-modal" role="dialog" aria-modal="true" aria-labelledby="um-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="um-modal-close" onClick={() => setSelectedUser(null)} aria-label="Close">×</button>
            <p className="bb-eyebrow">USER DETAILS</p>
            <h2 id="um-modal-title">{selectedUser.name}</h2>
            <p className="um-modal-email">{selectedUser.email}</p>
            <dl>
              <div><dt>User ID</dt><dd>{selectedUser.id}</dd></div>
              <div><dt>Role</dt><dd>{selectedUser.role}</dd></div>
              <div><dt>Joined</dt><dd>{selectedUser.joined}</dd></div>
              <div><dt>Status</dt><dd>{selectedUser.status}</dd></div>
            </dl>
            <button
              className={`um-toggle-status ${selectedUser.status === "Active" ? "suspend" : "activate"}`}
              onClick={() => toggleStatus(selectedUser.id)}
            >
              {selectedUser.status === "Active" ? "Suspend User" : "Activate User"}
            </button>
            <p className="um-demo-note">Demo action: changes only this page's local sample data.</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default UserManagement;

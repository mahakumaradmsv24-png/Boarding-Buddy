
import { useState } from "react";
import "./AdminDashboard.css";
import "./BoardingVerification.css";

const initialListings = [
  {
    id: "BB001",
    name: "Green View Boarding",
    owner: "Nimali Silva",
    location: "Peradeniya, Kandy",
    type: "Single Room",
    rent: 18000,
    status: "Pending",
  },
  {
    id: "BB002",
    name: "City Comfort Rooms",
    owner: "Ruwan Peris",
    location: "Katubedda, Moratuwa",
    type: "Shared Room",
    rent: 12000,
    status: "Approved",
  },
  {
    id: "BB003",
    name: "Lake Side Residence",
    owner: "Kamal Fernando",
    location: "Nugegoda, Colombo",
    type: "Single Room",
    rent: 22000,
    status: "Pending",
  },
  {
    id: "BB004",
    name: "Campus Nest",
    owner: "Saman Kumara",
    location: "Malabe, Colombo",
    type: "Shared Room",
    rent: 10000,
    status: "Rejected",
  },
  {
    id: "BB005",
    name: "Sunrise Boarding",
    owner: "Dilani Perera",
    location: "Ragama, Gampaha",
    type: "Single Room",
    rent: 16000,
    status: "Pending",
  },
];

const menuItems = [
  ["▦", "Dashboard", "/admin"],
  ["♙", "Users", "/admin/users"],
  ["⌂", "Listings", "/admin/boarding-verification"],
  ["⚑", "Complaints", "/admin/complaints"],
  ["☆", "Reviews", "/admin/reviews"],
  ["▥", "System Stats", "/admin/analytics"],
];

function BoardingVerification() {
  const [listings, setListings] = useState(initialListings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredListings = listings.filter((item) => {
    const term = search.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(term) ||
      item.owner.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term) ||
      item.id.toLowerCase().includes(term);

    return matchesSearch && (filter === "All" || item.status === filter);
  });

  function updateStatus(id, status) {
    setListings((current) =>
      current.map((item) => item.id === id ? { ...item, status } : item)
    );
    setSelected(null);
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
          {menuItems.map(([icon, label, href]) => (
            <a
              href={href}
              key={label}
              className={`bb-menu-link ${label === "Listings" ? "selected" : ""}`}
            >
              <span className="bb-menu-icon">{icon}</span>
              <span>{label}</span>
              {label === "Listings" && <span className="bb-active-mark" />}
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
            <span>Boarding Buddy <span className="bb-divider">/</span> Listings</span>
          </div>
          <div className="bb-header-right">
            <span className="bb-status"><i /> System Online</span>
            <div className="bb-header-avatar">A</div>
          </div>
        </header>

        <div className="bb-content">
          <div className="bb-page-heading">
            <div>
              <p className="bb-eyebrow">PROPERTY ADMINISTRATION</p>
              <h1>Boarding Verification</h1>
              <p className="bb-subtitle">Review and verify boarding listings submitted by owners.</p>
            </div>
          </div>

          <section className="bv-stats">
            <article className="bv-stat">
              <span className="bv-stat-icon">⌂</span>
              <div><p>Total Listings</p><strong>{listings.length}</strong></div>
            </article>
            <article className="bv-stat">
              <span className="bv-stat-icon pending-icon">◷</span>
              <div><p>Pending Review</p><strong>{listings.filter(x => x.status === "Pending").length}</strong></div>
            </article>
            <article className="bv-stat">
              <span className="bv-stat-icon approved-icon">✓</span>
              <div><p>Approved</p><strong>{listings.filter(x => x.status === "Approved").length}</strong></div>
            </article>
            <article className="bv-stat">
              <span className="bv-stat-icon rejected-icon">×</span>
              <div><p>Rejected</p><strong>{listings.filter(x => x.status === "Rejected").length}</strong></div>
            </article>
          </section>

          <section className="bv-panel">
            <div className="bv-panel-heading">
              <div>
                <h2>Boarding Listings</h2>
                <p>Check property information and approve or reject submissions.</p>
              </div>
              <span className="bv-count">{filteredListings.length} listings</span>
            </div>

            <div className="bv-toolbar">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search listing, owner, location or ID..."
                aria-label="Search boarding listings"
              />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter status">
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="bv-table-wrap">
              <table className="bv-table">
                <thead>
                  <tr>
                    <th>BOARDING DETAILS</th>
                    <th>OWNER</th>
                    <th>LOCATION</th>
                    <th>MONTHLY RENT</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="bv-name">{item.name}</div>
                        <div className="bv-id">{item.id} · {item.type}</div>
                      </td>
                      <td>{item.owner}</td>
                      <td>{item.location}</td>
                      <td className="bv-rent">Rs. {item.rent.toLocaleString("en-LK")}</td>
                      <td><span className={`bv-badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                      <td><button className="bv-view" onClick={() => setSelected(item)}>Review</button></td>
                    </tr>
                  ))}
                  {filteredListings.length === 0 && (
                    <tr><td colSpan="6" className="bv-empty">No matching boarding listings found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bv-footer">
              Showing {filteredListings.length} of {listings.length} listings
              <button onClick={() => { setSearch(""); setFilter("All"); }}>Reset filters</button>
            </div>
          </section>
        </div>
      </main>

      {selected && (
        <div className="bv-backdrop" onClick={() => setSelected(null)}>
          <section className="bv-modal" role="dialog" aria-modal="true" aria-labelledby="bv-modal-title" onClick={(e) => e.stopPropagation()}>
            <button className="bv-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <p className="bb-eyebrow">LISTING REVIEW</p>
            <h2 id="bv-modal-title">{selected.name}</h2>
            <p className="bv-modal-id">{selected.id}</p>
            <dl>
              <div><dt>Owner</dt><dd>{selected.owner}</dd></div>
              <div><dt>Location</dt><dd>{selected.location}</dd></div>
              <div><dt>Room Type</dt><dd>{selected.type}</dd></div>
              <div><dt>Monthly Rent</dt><dd>Rs. {selected.rent.toLocaleString("en-LK")}</dd></div>
              <div><dt>Current Status</dt><dd>{selected.status}</dd></div>
            </dl>

            <div className="bv-modal-actions">
              <button className="bv-reject" onClick={() => updateStatus(selected.id, "Rejected")}>Reject</button>
              <button className="bv-approve" onClick={() => updateStatus(selected.id, "Approved")}>Approve Listing</button>
            </div>
            <p className="bv-note">Demo data only. Changes are not saved to a backend.</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default BoardingVerification;

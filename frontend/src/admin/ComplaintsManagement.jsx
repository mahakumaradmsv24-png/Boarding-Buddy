
import { useState } from "react";
import "./AdminDashboard.css";
import "./ComplaintsManagement.css";

const initialComplaints = [
  {
    id: "CMP-001",
    user: "Kasun Perera",
    category: "Payment Issue",
    date: "2026-10-20",
    status: "Pending",
    description: "Payment was made, but the booking is not confirmed.",
  },
  {
    id: "CMP-002",
    user: "Nethmi Silva",
    category: "Boarding Quality",
    date: "2026-10-21",
    status: "Under Review",
    description: "The boarding facilities do not match the listing.",
  },
  {
    id: "CMP-003",
    user: "Amal Fernando",
    category: "User Behaviour",
    date: "2026-10-22",
    status: "Resolved",
    description: "Reported inappropriate communication from another user.",
  },
  {
    id: "CMP-004",
    user: "Tharushi Jay",
    category: "Fake Listing",
    date: "2026-10-24",
    status: "Pending",
    description: "Suspected fake boarding advertisement.",
  },
];

function ComplaintsManagement() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const pending = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const underReview = complaints.filter(
    (item) => item.status === "Under Review"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const filteredComplaints = complaints.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  function updateStatus(id, status) {
    setComplaints((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );

    setSelected((current) =>
      current && current.id === id
        ? { ...current, status }
        : current
    );
  }

  return (
    <div className="complaints-page">
        <a href="/admin" className="back-dashboard-link">
  ← Back to Dashboard
    </a>
      <div className="complaints-heading">
        <div>
          <h1>Complaints Management</h1>
          <p>Review and manage complaints submitted by users.</p>
        </div>
        <span className="complaints-count">
          {complaints.length} Total Complaints
        </span>
      </div>

      <div className="complaints-stats">
        <div className="complaint-stat">
          <span>Total Complaints</span>
          <strong>{complaints.length}</strong>
        </div>
        <div className="complaint-stat">
          <span>Pending</span>
          <strong>{pending}</strong>
        </div>
        <div className="complaint-stat">
          <span>Under Review</span>
          <strong>{underReview}</strong>
        </div>
        <div className="complaint-stat">
          <span>Resolved</span>
          <strong>{resolved}</strong>
        </div>
      </div>

      <section className="complaints-panel">
        <div className="complaints-toolbar">
          <input
            type="search"
            placeholder="Search ID, user or category..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search complaints"
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
            <option value="Dismissed">Dismissed</option>
          </select>
        </div>

        <div className="complaints-table-wrapper">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className={`complaint-status status-${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="complaint-view-btn"
                      onClick={() => setSelected(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="6" className="complaints-empty">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <div
          className="complaint-modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <section
            className="complaint-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="complaint-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="complaint-modal-heading">
              <h2 id="complaint-modal-title">Complaint Details</h2>
              <button
                className="complaint-close-btn"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <p><strong>ID:</strong> {selected.id}</p>
            <p><strong>User:</strong> {selected.user}</p>
            <p><strong>Category:</strong> {selected.category}</p>
            <p><strong>Date:</strong> {selected.date}</p>
            <p><strong>Description:</strong> {selected.description}</p>
            <p><strong>Status:</strong> {selected.status}</p>

            <div className="complaint-modal-actions">
              <button
                className="complaint-review-btn"
                onClick={() =>
                  updateStatus(selected.id, "Under Review")
                }
              >
                Mark Under Review
              </button>
              <button
                className="complaint-resolve-btn"
                onClick={() =>
                  updateStatus(selected.id, "Resolved")
                }
              >
                Resolve
              </button>
              <button
                className="complaint-dismiss-btn"
                onClick={() =>
                  updateStatus(selected.id, "Dismissed")
                }
              >
                Dismiss
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ComplaintsManagement;

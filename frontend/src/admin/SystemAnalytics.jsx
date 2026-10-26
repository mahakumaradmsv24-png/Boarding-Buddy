
import { useState } from "react";
import "./AdminDashboard.css";
import "./SystemAnalytics.css";

const monthlyUsers = [
  { month: "May", users: 120 },
  { month: "Jun", users: 180 },
  { month: "Jul", users: 240 },
  { month: "Aug", users: 210 },
  { month: "Sep", users: 320 },
  { month: "Oct", users: 390 },
];

const boardingStats = [
  { label: "Verified", value: 68, color: "#16a34a" },
  { label: "Pending", value: 22, color: "#f59e0b" },
  { label: "Rejected", value: 10, color: "#ef4444" },
];

const complaintStats = [
  { label: "Pending", value: 12 },
  { label: "Under Review", value: 8 },
  { label: "Resolved", value: 35 },
  { label: "Dismissed", value: 5 },
];

function SystemAnalytics() {
  const [period, setPeriod] = useState("6 months");

  const visibleUsers =
    period === "3 months" ? monthlyUsers.slice(-3) : monthlyUsers;

  const maxUsers = Math.max(...visibleUsers.map((item) => item.users));

  function downloadReport() {
    const rows = [
      ["Boarding Buddy - System Analytics Report"],
      ["Report Period", period],
      ["Metric", "Value"],
      ["Total Users", 1240],
      ["Total Boardings", 486],
      ["Verified Boardings", 330],
      ["Pending Boardings", 107],
      ["Rejected Boardings", 49],
      ["Pending Complaints", 12],
      [],
      ["Month", "New Users"],
      ...visibleUsers.map((item) => [item.month, item.users]),
      [],
      ["Complaint Status", "Count"],
      ...complaintStats.map((item) => [item.label, item.value]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "boarding-buddy-analytics.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="analytics-page">
      <a href="/admin" className="analytics-back-link">
        ← Back to Dashboard
      </a>

      <header className="analytics-header">
        <div>
          <h1>System Analytics &amp; Reports</h1>
          <p>Monitor platform performance and system activity.</p>
        </div>

        <button
          className="analytics-export-button"
          onClick={downloadReport}
        >
          ↓ Export CSV Report
        </button>
      </header>

      <div className="analytics-period">
        <label htmlFor="analytics-period">Report period:</label>
        <select
          id="analytics-period"
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
        >
          <option>6 months</option>
          <option>3 months</option>
        </select>
      </div>

      <section className="analytics-summary">
        <article className="analytics-card">
          <span>Total Users</span>
          <strong>1,240</strong>
          <small>Registered platform users</small>
        </article>

        <article className="analytics-card">
          <span>Total Boardings</span>
          <strong>486</strong>
          <small>All submitted listings</small>
        </article>

        <article className="analytics-card">
          <span>Verified Boardings</span>
          <strong>330</strong>
          <small>68% of total listings</small>
        </article>

        <article className="analytics-card">
          <span>Pending Complaints</span>
          <strong>12</strong>
          <small>Require administrator review</small>
        </article>
      </section>

      <section className="analytics-charts">
        <article className="analytics-panel">
          <h2>Monthly User Growth</h2>
          <p className="analytics-muted">New users by month</p>

          <div className="user-growth-chart">
            {visibleUsers.map((item) => (
              <div className="growth-column" key={item.month}>
                <span className="growth-value">{item.users}</span>
                <div className="growth-bar-area">
                  <div
                    className="growth-bar"
                    style={{
                      height: `${(item.users / maxUsers) * 100}%`,
                    }}
                    title={`${item.users} users`}
                  />
                </div>
                <span className="growth-month">{item.month}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="analytics-panel">
          <h2>Boarding Statistics</h2>
          <p className="analytics-muted">
            Listing verification breakdown
          </p>

          <div className="boarding-stat-list">
            {boardingStats.map((item) => (
              <div className="boarding-stat-item" key={item.label}>
                <div className="boarding-stat-heading">
                  <span>
                    <i style={{ background: item.color }} />
                    {item.label}
                  </span>
                  <strong>{item.value}%</strong>
                </div>

                <div className="boarding-stat-track">
                  <div
                    className="boarding-stat-fill"
                    style={{
                      width: `${item.value}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="boarding-total">
            <span>Total Boardings</span>
            <strong>486</strong>
          </div>
        </article>
      </section>

      <section className="analytics-panel complaint-analytics">
        <h2>Complaints Summary</h2>
        <p className="analytics-muted">
          Current complaint status breakdown
        </p>

        <div className="complaint-analytics-grid">
          {complaintStats.map((item) => (
            <div
              className="complaint-analytics-item"
              key={item.label}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <p className="analytics-disclaimer">
        Demo data for interface preview only. Connect the backend and
        database to display live system statistics.
      </p>
    </main>
  );
}

export default SystemAnalytics;


import { useLocation, Link } from "react-router-dom";
import "./AdminDashboard.css";

const stats = [
  { label: "Total Users", value: "248", icon: "♙", color: "blue" },
  { label: "Total Listings", value: "56", icon: "⌂", color: "teal" },
  { label: "Active Listings", value: "48", icon: "✓", color: "green" },
  { label: "Complaints", value: "7", icon: "!", color: "red" },
];

const complaints = [
  {
    initials: "SK",
    title: "Inappropriate Review",
    detail: "Reported by a student",
    time: "10 min ago",
  },
  {
    initials: "FL",
    title: "Fake Listing",
    detail: "Reported boarding property",
    time: "35 min ago",
  },
  {
    initials: "AM",
    title: "Harassment Message",
    detail: "Reported by a user",
    time: "1 hour ago",
  },
];

const menu = [
  ["▦", "Dashboard", "/admin"],
  ["♙", "Users", "/admin/users"],
  ["⌂", "Listings", "/admin/boarding-verification"],
  ["⚑", "Complaints", "/admin/complaints"],
  ["☆", "Reviews", "/admin/reviews"],
  ["▥", "System Stats", "/admin/analytics"],
  ["✧", "Settings", "/admin/settings"],
];

function AdminDashboard() {
  const location = useLocation();

  return (
    <div className="bb-admin">
      <aside className="bb-sidebar">
        <Link to="/admin" className="bb-brand">
          <span className="bb-logo">⌂</span>
          <span>
            Boarding Buddy
            <small>ADMINISTRATION</small>
          </span>
        </Link>

        <p className="bb-menu-label">MAIN MENU</p>

        <nav className="bb-menu">
          {menu.map(([icon, label, href]) => {
            const isActive =
              location.pathname === href ||
              (href === "/admin/boarding-verification" &&
                location.pathname.startsWith(
                  "/admin/boarding-verification/"
                ));

            return (
              <Link
                to={href}
                key={label}
                className={`bb-menu-link ${
                  isActive ? "selected" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="bb-menu-icon">{icon}</span>
                <span>{label}</span>
                {isActive && <span className="bb-active-mark" />}
              </Link>
            );
          })}
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
            <span>
              Boarding Buddy{" "}
              <span className="bb-divider">/</span> Dashboard
            </span>
          </div>

          <div className="bb-header-right">
            <span className="bb-status">
              <i /> System Online
            </span>
            <div className="bb-header-avatar">A</div>
          </div>
        </header>

        <div className="bb-content">
          <div className="bb-page-heading">
            <div>
              <p className="bb-eyebrow">ADMINISTRATION</p>
              <h1>System Overview</h1>
              <p className="bb-subtitle">
                Monitor users, boarding listings and platform activity.
              </p>
            </div>

            <button
              className="bb-report-button"
              type="button"
              onClick={() => window.print()}
            >
              ↓ &nbsp; Export Report
            </button>
          </div>

          <section className="bb-stats">
            {stats.map((stat) => (
              <article className="bb-stat-card" key={stat.label}>
                <div className="bb-stat-top">
                  <span>{stat.label}</span>
                  <span className={`bb-stat-icon ${stat.color}`}>
                    {stat.icon}
                  </span>
                </div>

                <h2>{stat.value}</h2>

                <div className="bb-stat-bottom">
                  <span className="bb-stat-dot" />
                  <span>Current overview</span>
                </div>
              </article>
            ))}
          </section>

          <section className="bb-dashboard-panels">
            <article className="bb-panel bb-growth-panel">
              <div className="bb-panel-heading">
                <div>
                  <h2>User Growth</h2>
                  <p>Platform registration overview</p>
                </div>

                <select aria-label="Chart period" defaultValue="6">
                  <option value="6">Last 6 months</option>
                  <option value="12">Last 12 months</option>
                </select>
              </div>

              <div className="bb-chart-summary">
                <strong>248</strong>
                <span>Total registered users</span>
              </div>

              <div className="bb-chart">
                <div className="bb-chart-ylabels">
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>

                <div className="bb-chart-area">
                  <div className="bb-chart-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <svg
                    className="bb-chart-svg"
                    viewBox="0 0 600 190"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Illustrative user growth trend over six months"
                  >
                    <defs>
                      <linearGradient
                        id="bbChartFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#18a6b5"
                          stopOpacity=".22"
                        />
                        <stop
                          offset="100%"
                          stopColor="#18a6b5"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 158 C30 150 45 130 75 137 S120 111 150 121 S200 92 235 110 S280 119 320 80 S370 98 405 67 S455 88 485 56 S540 68 570 42 L600 30 L600 190 L0 190 Z"
                      fill="url(#bbChartFill)"
                    />

                    <path
                      d="M0 158 C30 150 45 130 75 137 S120 111 150 121 S200 92 235 110 S280 119 320 80 S370 98 405 67 S455 88 485 56 S540 68 570 42 L600 30"
                      fill="none"
                      stroke="#13a2b2"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {[
                      [0, 158],
                      [150, 121],
                      [235, 110],
                      [320, 80],
                      [405, 67],
                      [485, 56],
                      [600, 30],
                    ].map(([x, y]) => (
                      <circle
                        key={x}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#fff"
                        stroke="#13a2b2"
                        strokeWidth="3"
                      />
                    ))}
                  </svg>

                  <div className="bb-chart-months">
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                  </div>
                </div>
              </div>

              <p className="bb-chart-note">
                Illustrative chart data · Connect to backend for live statistics.
              </p>
            </article>

            <article className="bb-panel bb-complaints-panel">
              <div className="bb-panel-heading">
                <div>
                  <h2>Recent Complaints</h2>
                  <p>Latest reported issues</p>
                </div>

                <Link className="bb-view-all" to="/admin/complaints">
                  View All →
                </Link>
              </div>

              <div className="bb-complaint-list">
                {complaints.map((item, index) => (
                  <div className="bb-complaint" key={item.title}>
                    <div className={`bb-complaint-avatar avatar-${index}`}>
                      {item.initials}
                    </div>

                    <div className="bb-complaint-info">
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                      <small>{item.time}</small>
                    </div>

                    <span className={`bb-complaint-badge badge-${index}`}>
                      {index === 0
                        ? "Review"
                        : index === 1
                          ? "Pending"
                          : "Open"}
                    </span>
                  </div>
                ))}
              </div>

              <Link className="bb-all-complaints" to="/admin/complaints">
                Manage Complaints <span>→</span>
              </Link>
            </article>
          </section>

          <footer className="bb-footer">
            <span>© Boarding Buddy · Administration Panel</span>
            <span>Connecting Students & Boarding Owners</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

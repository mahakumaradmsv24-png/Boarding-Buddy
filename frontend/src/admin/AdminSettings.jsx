
import { useState } from "react";
import "./AdminSettings.css";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Boarding Buddy",
    supportEmail: "support@boardingbuddy.lk",
    timezone: "Asia/Colombo",
    adminName: "System Administrator",
    adminEmail: "admin@boardingbuddy.lk",
    emailNotifications: true,
    complaintAlerts: true,
    boardingAlerts: true,
    twoFactor: false,
    verifyBoardings: true,
    moderateReviews: true,
  });

  const [saved, setSaved] = useState(false);
  const [password, setPassword] = useState("");

  function updateSetting(key, value) {
    setSettings((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  }

  function handleSave(event) {
    event.preventDefault();
    setSaved(true);
  }

  function handlePasswordUpdate() {
    if (password.trim().length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    alert("Demo only: connect a backend to securely update your password.");
    setPassword("");
  }

  function Toggle({ label, description, settingKey }) {
    return (
      <div className="setting-toggle-row">
        <div className="setting-toggle-text">
          <strong>{label}</strong>
          <p>{description}</p>
        </div>

        <button
          type="button"
          className={`setting-switch ${
            settings[settingKey] ? "is-on" : ""
          }`}
          role="switch"
          aria-checked={settings[settingKey]}
          aria-label={label}
          onClick={() =>
            updateSetting(settingKey, !settings[settingKey])
          }
        >
          <span />
        </button>
      </div>
    );
  }

  return (
    <div className="admin-settings-page">
      <header className="settings-header">
        <div>
          <a href="/admin" className="settings-back">
            ← Back to Dashboard
          </a>
          <h1>Settings</h1>
          <p>Manage your Boarding Buddy administration preferences.</p>
        </div>

        <span className="settings-status">Admin Panel</span>
      </header>

      {saved && (
        <div className="settings-success" role="status">
          ✓ Settings saved for this session.
          <span> Persistent database saving is not connected yet.</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-icon">⚙️</div>
            <div>
              <h2>General Settings</h2>
              <p>Configure the basic details of your platform.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <label className="settings-field">
              Site Name
              <input
                value={settings.siteName}
                onChange={(e) =>
                  updateSetting("siteName", e.target.value)
                }
                required
              />
            </label>

            <label className="settings-field">
              Support Email
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  updateSetting("supportEmail", e.target.value)
                }
                required
              />
            </label>

            <label className="settings-field">
              Time Zone
              <select
                value={settings.timezone}
                onChange={(e) =>
                  updateSetting("timezone", e.target.value)
                }
              >
                <option value="Asia/Colombo">Sri Lanka (UTC+05:30)</option>
                <option value="Asia/Kolkata">India (UTC+05:30)</option>
                <option value="UTC">UTC</option>
              </select>
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-icon">👤</div>
            <div>
              <h2>Admin Profile</h2>
              <p>Update the administrator's display information.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <label className="settings-field">
              Admin Name
              <input
                value={settings.adminName}
                onChange={(e) =>
                  updateSetting("adminName", e.target.value)
                }
                required
              />
            </label>

            <label className="settings-field">
              Admin Email
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) =>
                  updateSetting("adminEmail", e.target.value)
                }
                required
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-icon">🔔</div>
            <div>
              <h2>Notifications</h2>
              <p>Choose which admin alerts you want to receive.</p>
            </div>
          </div>

          <Toggle
            label="Email Notifications"
            description="Receive important platform updates by email."
            settingKey="emailNotifications"
          />
          <Toggle
            label="Complaint Alerts"
            description="Get notified when a new complaint is submitted."
            settingKey="complaintAlerts"
          />
          <Toggle
            label="Boarding Verification Alerts"
            description="Get notified when a boarding requires verification."
            settingKey="boardingAlerts"
          />
        </section>

        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-icon">🛡️</div>
            <div>
              <h2>Security</h2>
              <p>Manage basic account security preferences.</p>
            </div>
          </div>

          <Toggle
            label="Two-Factor Authentication"
            description="Demo toggle for an additional sign-in security step."
            settingKey="twoFactor"
          />

          <div className="settings-password">
            <label className="settings-field">
              New Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter at least 8 characters"
                autoComplete="new-password"
                minLength={8}
              />
            </label>
            <button
              type="button"
              className="settings-secondary-button"
              onClick={handlePasswordUpdate}
            >
              Update Password
            </button>
          </div>
          <p className="settings-note">
            Password changes and two-factor authentication need backend
            authentication before they can work securely.
          </p>
        </section>

        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-icon">🏠</div>
            <div>
              <h2>Boarding & Review Management</h2>
              <p>Choose the default moderation preferences.</p>
            </div>
          </div>

          <Toggle
            label="Require Boarding Verification"
            description="Flag newly submitted boarding listings for admin verification."
            settingKey="verifyBoardings"
          />
          <Toggle
            label="Enable Review Moderation"
            description="Flag submitted reviews for moderation by the admin team."
            settingKey="moderateReviews"
          />
        </section>

        <div className="settings-footer">
          <a href="/admin" className="settings-cancel">
            Cancel
          </a>
          <button type="submit" className="settings-save">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

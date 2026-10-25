
import { useState } from "react";
import "./StudentRegistration.css";

export default function StudentRegistration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.phone && !/^[0-9+\s()-]{7,20}$/.test(form.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (
      form.password.length < 8 ||
      !/[A-Za-z]/.test(form.password) ||
      !/[0-9]/.test(form.password)
    ) {
      nextErrors.password = "Use 8+ characters with a letter and number.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.terms) {
      nextErrors.terms = "Please accept the Terms and Conditions.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setMessage(
        "Form validated successfully! Backend registration is not connected yet."
      );
    }
  }

  return (
    <main className="register-screen">
      <section className="register-layout">
        <div className="register-form-panel">
          <a className="bb-logo" href="/" aria-label="Boarding Buddy home">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5.5 9v11h13V9M9.5 20v-7h5v7" />
            </svg>
            <span>Boarding Buddy</span>
          </a>

          <header className="register-heading">
            <h1>Create Student Account</h1>
            <p>Join our community</p>
          </header>

          <form className="register-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <small className="field-error">{errors.name}</small>}
            </div>

            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </div>

            <div className="field-group">
              <label htmlFor="phone">Phone Number <span>(Optional)</span></label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <small className="field-error">{errors.phone}</small>}
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <small className="field-error">{errors.password}</small>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrap">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.confirmPassword)}
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <small className="field-error">{errors.confirmPassword}</small>
              )}
            </div>

            <div className="terms-area">
              <label className="terms-label" htmlFor="terms">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={form.terms}
                  onChange={handleChange}
                />
                <span>
                  I agree to the <a href="/terms">Terms and Conditions</a>
                </span>
              </label>
              {errors.terms && <small className="field-error">{errors.terms}</small>}
            </div>

            <button className="register-submit" type="submit">
              Register
            </button>

            {message && (
              <p className="register-message" role="status">{message}</p>
            )}

            <p className="register-login">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>

        <aside className="register-art-panel">
          <div className="art-illustration" aria-hidden="true">
            <div className="art-sun" />
            <div className="art-plant plant-left">✳</div>
            <div className="art-plant plant-right">✳</div>

            <div className="art-phone">
              <div className="phone-speaker" />
              <div className="phone-check">✓</div>
              <div className="phone-line" />
              <div className="phone-line short" />
              <div className="phone-tick">✓</div>
              <div className="phone-line" />
              <div className="phone-line short" />
              <div className="phone-button" />
            </div>

            <div className="art-person person-one">
              <div className="person-head">●</div>
              <div className="person-body" />
              <div className="person-leg left-leg" />
              <div className="person-leg right-leg" />
            </div>

            <div className="art-person person-two">
              <div className="person-head">●</div>
              <div className="person-body" />
              <div className="person-leg left-leg" />
              <div className="person-leg right-leg" />
            </div>

            <div className="art-spark spark-one">✦</div>
            <div className="art-spark spark-two">•</div>
            <div className="art-ground" />
          </div>

          <h2>Better Places. Brighter<br />Futures.</h2>
        </aside>
      </section>
    </main>
  );
}

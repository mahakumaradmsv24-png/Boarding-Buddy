
import { useMemo, useState } from "react";
import "./BoardingRecommendations.css";

const boardingData = [
  {
    id: 1,
    name: "Green View Boarding",
    location: "Malabe",
    price: 18000,
    distance: 0.8,
    facilities: ["Wi-Fi", "Meals", "Laundry", "Study Area"],
    gender: "Male",
    rating: 4.7,
    verified: true,
  },
  {
    id: 2,
    name: "City Comfort Residence",
    location: "Kaduwela",
    price: 15000,
    distance: 2.1,
    facilities: ["Wi-Fi", "Parking", "CCTV"],
    gender: "Female",
    rating: 4.5,
    verified: true,
  },
  {
    id: 3,
    name: "Campus Nest Boarding",
    location: "Malabe",
    price: 22000,
    distance: 0.4,
    facilities: ["Wi-Fi", "Meals", "Study Area", "CCTV"],
    gender: "Any",
    rating: 4.9,
    verified: true,
  },
  {
    id: 4,
    name: "Sunrise Student Rooms",
    location: "Battaramulla",
    price: 12000,
    distance: 3.5,
    facilities: ["Laundry", "Parking"],
    gender: "Any",
    rating: 4.1,
    verified: false,
  },
  {
    id: 5,
    name: "Serene Stay",
    location: "Kaduwela",
    price: 20000,
    distance: 1.2,
    facilities: ["Wi-Fi", "Meals", "Laundry", "CCTV"],
    gender: "Female",
    rating: 4.8,
    verified: true,
  },
];

const allFacilities = [
  "Wi-Fi",
  "Meals",
  "Laundry",
  "Study Area",
  "Parking",
  "CCTV",
];

function calculateMatch(boarding, filters) {
  let score = 50;

  if (
    !filters.location ||
    boarding.location.toLowerCase().includes(filters.location.toLowerCase())
  ) {
    score += 15;
  }

  if (boarding.price <= Number(filters.budget)) {
    score += 15;
  }

  if (
    filters.facility === "Any" ||
    boarding.facilities.includes(filters.facility)
  ) {
    score += 10;
  }

  if (boarding.verified) score += 5;
  if (boarding.rating >= 4.5) score += 5;

  return Math.min(score, 100);
}

export default function BoardingRecommendations() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("25000");
  const [facility, setFacility] = useState("Any");
  const [gender, setGender] = useState("Any");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("match");

  const filters = { location, budget, facility };

  const recommendations = useMemo(() => {
    return boardingData
      .filter((boarding) => {
        const matchesSearch =
          boarding.name.toLowerCase().includes(search.toLowerCase()) ||
          boarding.location.toLowerCase().includes(search.toLowerCase());

        const matchesLocation =
          !location ||
          boarding.location.toLowerCase().includes(location.toLowerCase());

        const matchesBudget = boarding.price <= Number(budget);
        const matchesFacility =
          facility === "Any" || boarding.facilities.includes(facility);
        const matchesGender =
          gender === "Any" ||
          boarding.gender === "Any" ||
          boarding.gender === gender;
        const matchesVerified = !verifiedOnly || boarding.verified;

        return (
          matchesSearch &&
          matchesLocation &&
          matchesBudget &&
          matchesFacility &&
          matchesGender &&
          matchesVerified
        );
      })
      .map((boarding) => ({
        ...boarding,
        matchScore: calculateMatch(boarding, filters),
      }))
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "distance") return a.distance - b.distance;
        return b.matchScore - a.matchScore;
      });
  }, [search, location, budget, facility, gender, verifiedOnly, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setBudget("25000");
    setFacility("Any");
    setGender("Any");
    setVerifiedOnly(false);
    setSortBy("match");
  };

  return (
    <div className="recommendations-page">
      <header className="recommendations-header">
        <div>
          <a className="recommendations-back" href="/admin">
            ← Back to Dashboard
          </a>
          <p className="recommendations-eyebrow">ADMINISTRATION / AI TOOLS</p>
          <h1>AI Boarding Recommendations</h1>
          <p className="recommendations-subtitle">
            Discover suitable boarding places based on budget, location and
            facilities.
          </p>
        </div>

        <div className="recommendations-header-icon" aria-hidden="true">
          ✨
        </div>
      </header>

      <section className="recommendations-stats">
        <div className="recommendation-stat">
          <span className="recommendation-stat-icon">🏠</span>
          <div>
            <p>Available Listings</p>
            <h2>{boardingData.length}</h2>
          </div>
        </div>

        <div className="recommendation-stat">
          <span className="recommendation-stat-icon">✅</span>
          <div>
            <p>Verified Listings</p>
            <h2>{boardingData.filter((item) => item.verified).length}</h2>
          </div>
        </div>

        <div className="recommendation-stat">
          <span className="recommendation-stat-icon">🎯</span>
          <div>
            <p>Matching Results</p>
            <h2>{recommendations.length}</h2>
          </div>
        </div>
      </section>

      <section className="recommendations-filter-panel">
        <div className="recommendations-section-heading">
          <div>
            <h2>Find the right boarding</h2>
            <p>Adjust the filters to discover suitable options.</p>
          </div>
          <button
            type="button"
            className="recommendations-reset"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>

        <div className="recommendations-filter-grid">
          <label>
            Search boarding
            <input
              type="search"
              placeholder="Name or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label>
            Preferred location
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="">All locations</option>
              <option value="Malabe">Malabe</option>
              <option value="Kaduwela">Kaduwela</option>
              <option value="Battaramulla">Battaramulla</option>
            </select>
          </label>

          <label>
            Maximum monthly budget
            <select
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            >
              <option value="15000">Rs. 15,000</option>
              <option value="18000">Rs. 18,000</option>
              <option value="20000">Rs. 20,000</option>
              <option value="25000">Rs. 25,000</option>
              <option value="30000">Rs. 30,000</option>
            </select>
          </label>

          <label>
            Required facility
            <select
              value={facility}
              onChange={(event) => setFacility(event.target.value)}
            >
              <option value="Any">Any facility</option>
              {allFacilities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Boarding preference
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label>
            Sort results
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="match">Best match</option>
              <option value="price">Lowest price</option>
              <option value="rating">Highest rating</option>
              <option value="distance">Nearest first</option>
            </select>
          </label>
        </div>

        <label className="recommendations-verified-toggle">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(event) => setVerifiedOnly(event.target.checked)}
          />
          Show verified boarding places only
        </label>
      </section>

      <section className="recommendations-results">
        <div className="recommendations-section-heading">
          <div>
            <h2>Recommended boarding places</h2>
            <p>
              {recommendations.length} result
              {recommendations.length === 1 ? "" : "s"} based on your filters
            </p>
          </div>
          <span className="recommendations-demo-badge">DEMO RECOMMENDATIONS</span>
        </div>

        {recommendations.length === 0 ? (
          <div className="recommendations-empty">
            <span>🔎</span>
            <h3>No matching boarding places</h3>
            <p>Try increasing your budget or changing your filters.</p>
            <button type="button" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="recommendations-card-grid">
            {recommendations.map((boarding) => (
              <article className="recommendation-card" key={boarding.id}>
                <div className="recommendation-card-top">
                  <div className="recommendation-house-icon">🏡</div>
                  <div
                    className={`recommendation-match ${
                      boarding.matchScore >= 80
                        ? "recommendation-match-high"
                        : ""
                    }`}
                  >
                    <strong>{boarding.matchScore}%</strong>
                    <span>Match</span>
                  </div>
                </div>

                <div className="recommendation-card-title">
                  <h3>{boarding.name}</h3>
                  {boarding.verified && (
                    <span className="recommendation-verified">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <p className="recommendation-location">
                  <span>📍</span> {boarding.location}
                </p>

                <div className="recommendation-price">
                  <strong>
                    Rs. {boarding.price.toLocaleString("en-LK")}
                  </strong>
                  <span>/ month</span>
                </div>

                <div className="recommendation-details">
                  <span>⭐ {boarding.rating.toFixed(1)} rating</span>
                  <span>🚶 {boarding.distance} km away</span>
                  <span>👤 {boarding.gender}</span>
                </div>

                <div className="recommendation-facilities">
                  <p>Facilities</p>
                  <div>
                    {boarding.facilities.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <div className="recommendation-card-footer">
                  <span>
                    {boarding.matchScore >= 80
                      ? "Excellent match"
                      : boarding.matchScore >= 65
                        ? "Good match"
                        : "Possible match"}
                  </span>
                  <span className="recommendation-score-bar">
                    <span style={{ width: `${boarding.matchScore}%` }} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <p className="recommendations-disclaimer">
        Note: Match scores are calculated using demo rules and sample data.
        They are not generated by a live AI model.
      </p>
    </div>
  );
}

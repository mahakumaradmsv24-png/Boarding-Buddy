
import { useMemo, useState } from "react";
import "./AIReviewSummarization.css";

const reviewData = [
  {
    id: 1,
    boarding: "Green View Boarding",
    reviewer: "Student A",
    rating: 5,
    sentiment: "Positive",
    comment:
      "The rooms are clean and comfortable. The owner is friendly and the Wi-Fi is fast.",
    date: "2026-10-20",
  },
  {
    id: 2,
    boarding: "Green View Boarding",
    reviewer: "Student B",
    rating: 4,
    sentiment: "Positive",
    comment:
      "Good study environment and convenient location. Meals could have more variety.",
    date: "2026-10-18",
  },
  {
    id: 3,
    boarding: "Green View Boarding",
    reviewer: "Student C",
    rating: 2,
    sentiment: "Negative",
    comment:
      "The Wi-Fi sometimes disconnects and the laundry service is slow.",
    date: "2026-10-16",
  },
  {
    id: 4,
    boarding: "City Comfort Residence",
    reviewer: "Student D",
    rating: 5,
    sentiment: "Positive",
    comment:
      "Safe environment, helpful management and good security facilities.",
    date: "2026-10-21",
  },
  {
    id: 5,
    boarding: "City Comfort Residence",
    reviewer: "Student E",
    rating: 3,
    sentiment: "Neutral",
    comment:
      "The room is acceptable, but the shared kitchen could be cleaner.",
    date: "2026-10-19",
  },
  {
    id: 6,
    boarding: "City Comfort Residence",
    reviewer: "Student F",
    rating: 2,
    sentiment: "Negative",
    comment:
      "There is noise at night and maintenance requests take too long.",
    date: "2026-10-15",
  },
  {
    id: 7,
    boarding: "Campus Nest Boarding",
    reviewer: "Student G",
    rating: 5,
    sentiment: "Positive",
    comment:
      "Excellent location near campus. The study area is quiet and the rooms are spacious.",
    date: "2026-10-22",
  },
  {
    id: 8,
    boarding: "Campus Nest Boarding",
    reviewer: "Student H",
    rating: 4,
    sentiment: "Positive",
    comment:
      "Friendly owner and clean rooms. I would appreciate more meal options.",
    date: "2026-10-17",
  },
  {
    id: 9,
    boarding: "Campus Nest Boarding",
    reviewer: "Student I",
    rating: 3,
    sentiment: "Neutral",
    comment:
      "The boarding is good overall, but the monthly price is a little high.",
    date: "2026-10-14",
  },
];

const boardingNames = [
  "All Boardings",
  ...new Set(reviewData.map((review) => review.boarding)),
];

function buildSummary(reviews) {
  if (reviews.length === 0) {
    return {
      positive: "No positive feedback available for this selection.",
      negative: "No negative feedback available for this selection.",
      recommendation: "Collect more reviews to generate useful insights.",
    };
  }

  const positive = reviews.filter((r) => r.sentiment === "Positive");
  const negative = reviews.filter((r) => r.sentiment === "Negative");
  const neutral = reviews.filter((r) => r.sentiment === "Neutral");

  const comments = reviews.map((r) => r.comment.toLowerCase()).join(" ");

  const positiveTopics = [];
  const negativeTopics = [];

  if (comments.includes("clean")) {
    positiveTopics.push("cleanliness");
  }
  if (comments.includes("friendly") || comments.includes("helpful")) {
    positiveTopics.push("friendly management");
  }
  if (comments.includes("study") || comments.includes("campus")) {
    positiveTopics.push("study environment and location");
  }
  if (comments.includes("safe") || comments.includes("security")) {
    positiveTopics.push("safety and security");
  }
  if (comments.includes("wifi") || comments.includes("wi-fi")) {
    positiveTopics.push("Wi-Fi");
  }
  if (comments.includes("noise")) {
    negativeTopics.push("night-time noise");
  }
  if (comments.includes("slow") || comments.includes("maintenance")) {
    negativeTopics.push("service and maintenance delays");
  }
  if (comments.includes("kitchen")) {
    negativeTopics.push("shared kitchen cleanliness");
  }
  if (comments.includes("meal")) {
    negativeTopics.push("meal variety");
  }
  if (comments.includes("price") || comments.includes("expensive")) {
    negativeTopics.push("pricing");
  }

  let recommendation =
    "Continue monitoring feedback and maintain service quality.";

  if (negative.length > positive.length) {
    recommendation =
      "Prioritise the recurring complaints and follow up with boarding management.";
  } else if (positive.length > 0 && negative.length === 0) {
    recommendation =
      "Maintain the current service quality and continue collecting student feedback.";
  } else if (negative.length > 0) {
    recommendation =
      "Maintain the positive aspects while addressing the reported issues.";
  } else if (neutral.length > 0) {
    recommendation =
      "Review neutral feedback to identify practical improvements.";
  }

  return {
    positive:
      positiveTopics.length > 0
        ? `Reviewers highlighted ${positiveTopics.join(", ")}. ${positive.length} of ${reviews.length} reviews are positive.`
        : `${positive.length} of ${reviews.length} reviews are positive. Review the comments for recurring strengths.`,
    negative:
      negativeTopics.length > 0
        ? `Areas mentioned for improvement include ${negativeTopics.join(", ")}. ${negative.length} of ${reviews.length} reviews are negative.`
        : `${negative.length} of ${reviews.length} reviews are negative. Check individual comments for specific concerns.`,
    recommendation,
  };
}

export default function AIReviewSummarization() {
  const [selectedBoarding, setSelectedBoarding] = useState("All Boardings");
  const [selectedSentiment, setSelectedSentiment] = useState("All");
  const [search, setSearch] = useState("");
  const [minimumRating, setMinimumRating] = useState("All");

  const filteredReviews = useMemo(() => {
    return reviewData.filter((review) => {
      const matchesBoarding =
        selectedBoarding === "All Boardings" ||
        review.boarding === selectedBoarding;

      const matchesSentiment =
        selectedSentiment === "All" ||
        review.sentiment === selectedSentiment;

      const matchesSearch =
        review.comment.toLowerCase().includes(search.toLowerCase()) ||
        review.boarding.toLowerCase().includes(search.toLowerCase()) ||
        review.reviewer.toLowerCase().includes(search.toLowerCase());

      const matchesRating =
        minimumRating === "All" || review.rating >= Number(minimumRating);

      return (
        matchesBoarding &&
        matchesSentiment &&
        matchesSearch &&
        matchesRating
      );
    });
  }, [selectedBoarding, selectedSentiment, search, minimumRating]);

  const summary = useMemo(
    () => buildSummary(filteredReviews),
    [filteredReviews]
  );

  const positiveCount = filteredReviews.filter(
    (review) => review.sentiment === "Positive"
  ).length;
  const neutralCount = filteredReviews.filter(
    (review) => review.sentiment === "Neutral"
  ).length;
  const negativeCount = filteredReviews.filter(
    (review) => review.sentiment === "Negative"
  ).length;

  const averageRating = filteredReviews.length
    ? (
        filteredReviews.reduce((sum, review) => sum + review.rating, 0) /
        filteredReviews.length
      ).toFixed(1)
    : "—";

  const positivePercent = filteredReviews.length
    ? Math.round((positiveCount / filteredReviews.length) * 100)
    : 0;
  const neutralPercent = filteredReviews.length
    ? Math.round((neutralCount / filteredReviews.length) * 100)
    : 0;
  const negativePercent = filteredReviews.length
    ? Math.round((negativeCount / filteredReviews.length) * 100)
    : 0;

  const resetFilters = () => {
    setSelectedBoarding("All Boardings");
    setSelectedSentiment("All");
    setSearch("");
    setMinimumRating("All");
  };

  return (
    <div className="ai-review-page">
      <header className="ai-review-header">
        <div>
          <a href="/admin" className="ai-review-back">
            ← Back to Dashboard
          </a>
          <p className="ai-review-eyebrow">ADMINISTRATION / AI TOOLS</p>
          <h1>AI Review Summarization</h1>
          <p className="ai-review-subtitle">
            Understand student feedback, discover trends and identify areas
            that need improvement.
          </p>
        </div>

        <div className="ai-review-header-icon" aria-hidden="true">
          ✨
        </div>
      </header>

      <section className="ai-review-stats">
        <article className="ai-review-stat">
          <div className="ai-review-stat-icon">💬</div>
          <div>
            <p>Total Reviews</p>
            <h2>{filteredReviews.length}</h2>
          </div>
        </article>

        <article className="ai-review-stat">
          <div className="ai-review-stat-icon">⭐</div>
          <div>
            <p>Average Rating</p>
            <h2>{averageRating}</h2>
          </div>
        </article>

        <article className="ai-review-stat">
          <div className="ai-review-stat-icon">😊</div>
          <div>
            <p>Positive Reviews</p>
            <h2>{positiveCount}</h2>
          </div>
        </article>

        <article className="ai-review-stat">
          <div className="ai-review-stat-icon">⚠️</div>
          <div>
            <p>Negative Reviews</p>
            <h2>{negativeCount}</h2>
          </div>
        </article>
      </section>

      <section className="ai-review-filters">
        <div className="ai-review-section-heading">
          <div>
            <h2>Review filters</h2>
            <p>Choose which feedback to analyse.</p>
          </div>
          <button
            type="button"
            className="ai-review-reset"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>

        <div className="ai-review-filter-grid">
          <label>
            Search reviews
            <input
              type="search"
              placeholder="Search comments or reviewer..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label>
            Boarding place
            <select
              value={selectedBoarding}
              onChange={(event) => setSelectedBoarding(event.target.value)}
            >
              {boardingNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sentiment
            <select
              value={selectedSentiment}
              onChange={(event) => setSelectedSentiment(event.target.value)}
            >
              <option value="All">All sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
          </label>

          <label>
            Minimum rating
            <select
              value={minimumRating}
              onChange={(event) => setMinimumRating(event.target.value)}
            >
              <option value="All">Any rating</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars and above</option>
              <option value="3">3 stars and above</option>
              <option value="2">2 stars and above</option>
            </select>
          </label>
        </div>
      </section>

      <section className="ai-review-analysis">
        <div className="ai-review-section-heading">
          <div>
            <h2>Review insights</h2>
            <p>Summary of the reviews currently selected.</p>
          </div>
          <span className="ai-review-demo-badge">DEMO ANALYSIS</span>
        </div>

        <div className="ai-review-insight-grid">
          <article className="ai-review-insight-card">
            <div className="ai-review-insight-title">
              <span className="ai-review-insight-emoji">😊</span>
              <h3>Positive feedback</h3>
            </div>
            <p>{summary.positive}</p>
            <div className="ai-review-insight-count positive">
              {positivePercent}% positive
            </div>
          </article>

          <article className="ai-review-insight-card">
            <div className="ai-review-insight-title">
              <span className="ai-review-insight-emoji">😐</span>
              <h3>Neutral feedback</h3>
            </div>
            <p>
              {neutralCount > 0
                ? `${neutralCount} reviews contain mixed or moderate feedback that may reveal opportunities for improvement.`
                : "No neutral reviews in the current selection."}
            </p>
            <div className="ai-review-insight-count neutral">
              {neutralPercent}% neutral
            </div>
          </article>

          <article className="ai-review-insight-card">
            <div className="ai-review-insight-title">
              <span className="ai-review-insight-emoji">⚠️</span>
              <h3>Areas to improve</h3>
            </div>
            <p>{summary.negative}</p>
            <div className="ai-review-insight-count negative">
              {negativePercent}% negative
            </div>
          </article>
        </div>

        <article className="ai-review-recommendation">
          <div className="ai-review-recommendation-icon">💡</div>
          <div>
            <h3>Suggested action</h3>
            <p>{summary.recommendation}</p>
          </div>
        </article>

        <div className="ai-review-sentiment">
          <div className="ai-review-sentiment-heading">
            <h3>Sentiment breakdown</h3>
            <span>{filteredReviews.length} reviews analysed</span>
          </div>

          <div className="ai-review-sentiment-bar">
            {positivePercent > 0 && (
              <span
                className="ai-review-bar-positive"
                style={{ width: `${positivePercent}%` }}
              />
            )}
            {neutralPercent > 0 && (
              <span
                className="ai-review-bar-neutral"
                style={{ width: `${neutralPercent}%` }}
              />
            )}
            {negativePercent > 0 && (
              <span
                className="ai-review-bar-negative"
                style={{ width: `${negativePercent}%` }}
              />
            )}
          </div>

          <div className="ai-review-sentiment-legend">
            <span><i className="legend-positive" /> Positive ({positiveCount})</span>
            <span><i className="legend-neutral" /> Neutral ({neutralCount})</span>
            <span><i className="legend-negative" /> Negative ({negativeCount})</span>
          </div>
        </div>
      </section>

      <section className="ai-review-table-section">
        <div className="ai-review-section-heading">
          <div>
            <h2>Student reviews</h2>
            <p>Individual comments included in this analysis.</p>
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="ai-review-empty">
            <span>🔎</span>
            <h3>No reviews found</h3>
            <p>Try changing your search or filters.</p>
            <button type="button" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="ai-review-table-wrap">
            <table className="ai-review-table">
              <thead>
                <tr>
                  <th>Boarding place</th>
                  <th>Reviewer</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Sentiment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id}>
                    <td className="ai-review-boarding-name">{review.boarding}</td>
                    <td>{review.reviewer}</td>
                    <td className="ai-review-rating">
                      {"★".repeat(review.rating)}
                      <span>{"★".repeat(5 - review.rating)}</span>
                    </td>
                    <td className="ai-review-comment">{review.comment}</td>
                    <td>
                      <span
                        className={`ai-review-sentiment-pill ${review.sentiment.toLowerCase()}`}
                      >
                        {review.sentiment}
                      </span>
                    </td>
                    <td>{review.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="ai-review-disclaimer">
        Note: This page uses sample reviews and rule-based demo summaries.
        Sentiment labels and summaries are not produced by a live AI model.
      </p>
    </div>
  );
}


import { useState } from "react";
import "./AdminDashboard.css";
import "./ReviewModeration.css";

const initialReviews = [
  {
    id: "REV-001",
    user: "Kasun Perera",
    boarding: "Green View Boarding",
    rating: 5,
    comment: "Clean rooms and a friendly boarding owner.",
    status: "Published",
  },
  {
    id: "REV-002",
    user: "Nethmi Silva",
    boarding: "City Nest",
    rating: 1,
    comment: "Very poor experience. The listing details were misleading.",
    status: "Flagged",
  },
  {
    id: "REV-003",
    user: "Amal Fernando",
    boarding: "Sunrise Residence",
    rating: 4,
    comment: "Good location and reasonable facilities.",
    status: "Published",
  },
  {
    id: "REV-004",
    user: "Tharushi Jay",
    boarding: "Lake Side Rooms",
    rating: 2,
    comment: "The room was not as clean as expected.",
    status: "Pending",
  },
];

function ReviewModeration() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedReview, setSelectedReview] = useState(null);

  const flaggedCount = reviews.filter(
    (review) => review.status === "Flagged"
  ).length;

  const pendingCount = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const publishedCount = reviews.filter(
    (review) => review.status === "Published"
  ).length;

  const filteredReviews = reviews.filter((review) => {
    const query = search.toLowerCase();

    const matchesSearch =
      review.id.toLowerCase().includes(query) ||
      review.user.toLowerCase().includes(query) ||
      review.boarding.toLowerCase().includes(query) ||
      review.comment.toLowerCase().includes(query);

    const matchesFilter =
      filter === "All" || review.status === filter;

    return matchesSearch && matchesFilter;
  });

  function updateReviewStatus(id, status) {
    setReviews((current) =>
      current.map((review) =>
        review.id === id ? { ...review, status } : review
      )
    );

    setSelectedReview((current) =>
      current && current.id === id
        ? { ...current, status }
        : current
    );
  }

  return (
    <div className="review-moderation-page">
      <a href="/admin" className="review-back-link">
        ← Back to Dashboard
      </a>

      <div className="review-page-heading">
        <div>
          <h1>Review &amp; Content Moderation</h1>
          <p>Review user feedback and manage reported content.</p>
        </div>
      </div>

      <div className="review-stat-grid">
        <div className="review-stat-card">
          <span>Total Reviews</span>
          <strong>{reviews.length}</strong>
        </div>

        <div className="review-stat-card">
          <span>Published</span>
          <strong>{publishedCount}</strong>
        </div>

        <div className="review-stat-card">
          <span>Pending Review</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="review-stat-card">
          <span>Flagged Reviews</span>
          <strong>{flaggedCount}</strong>
        </div>
      </div>

      <section className="review-panel">
        <div className="review-toolbar">
          <input
            type="search"
            placeholder="Search reviews, users or boarding..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search reviews"
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter reviews by status"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>

        <div className="review-table-wrapper">
          <table className="review-table">
            <thead>
              <tr>
                <th>Review ID</th>
                <th>User</th>
                <th>Boarding</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.user}</td>
                  <td>{review.boarding}</td>
                  <td>
                    <span className="review-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                    <span className="review-rating-number">
                      {" "}{review.rating}/5
                    </span>
                  </td>
                  <td className="review-comment-cell">
                    {review.comment}
                  </td>
                  <td>
                    <span
                      className={`review-status review-status-${review.status.toLowerCase()}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="review-view-button"
                      onClick={() => setSelectedReview(review)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan="7" className="review-empty">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedReview && (
        <div
          className="review-modal-backdrop"
          onClick={() => setSelectedReview(null)}
        >
          <section
            className="review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="review-modal-heading">
              <h2 id="review-modal-title">Review Details</h2>
              <button
                className="review-close-button"
                onClick={() => setSelectedReview(null)}
                aria-label="Close review details"
              >
                ×
              </button>
            </div>

            <p><strong>Review ID:</strong> {selectedReview.id}</p>
            <p><strong>User:</strong> {selectedReview.user}</p>
            <p><strong>Boarding:</strong> {selectedReview.boarding}</p>
            <p>
              <strong>Rating:</strong> {selectedReview.rating}/5
            </p>
            <p><strong>Comment:</strong> {selectedReview.comment}</p>
            <p><strong>Status:</strong> {selectedReview.status}</p>

            <div className="review-modal-actions">
              <button
                className="review-approve-button"
                onClick={() =>
                  updateReviewStatus(selectedReview.id, "Published")
                }
              >
                Approve / Publish
              </button>

              <button
                className="review-hide-button"
                onClick={() =>
                  updateReviewStatus(selectedReview.id, "Hidden")
                }
              >
                Hide Review
              </button>

              <button
                className="review-flag-button"
                onClick={() =>
                  updateReviewStatus(selectedReview.id, "Flagged")
                }
              >
                Flag Review
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ReviewModeration;

import React, { useState } from 'react';
import { submitFeedback } from '../services/api.js';

export function FeedbackPage({ t }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('recommendation_accuracy');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comments.trim()) {
      setError("Please provide your feedback comments before submitting.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await submitFeedback({
        requestId: 'GENERAL-FEEDBACK',
        helpful: true,
        comment: `User: ${name} (${department}, ${email}) | Category: ${category} | Comments: ${comments}`,
        category
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-feedback">
      <h1>{t.navFeedback || "Portal Feedback & Suggestions"}</h1>

      <div className="panel-white">
        <p>
          We welcome feedback from procurement officials, tender committees, manufacturers, and citizens to continuously refine standard taxonomies and ensure prompt inclusion of recent amendments.
        </p>

        {submitted ? (
          <div className="success-box" role="status">
            <strong>Feedback Submitted Successfully.</strong> Thank you for your valuable input. Your comments will be reviewed by the standards technical secretariat.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ maxWidth: '640px' }}>
            {error && (
              <div className="error-box" role="alert">
                <strong>Error: </strong>{error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="fb-name" className="form-label">
                Full Name / Designation
              </label>
              <input
                type="text"
                id="fb-name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Executive Engineer / Tender Officer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fb-dept" className="form-label">
                Department / Ministry / Organisation
              </label>
              <input
                type="text"
                id="fb-dept"
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. CPWD, Indian Railways, State PWD"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fb-email" className="form-label">
                Official Email ID
              </label>
              <input
                type="email"
                id="fb-email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. procurement-officer@gov.in"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fb-cat" className="form-label">
                Feedback Category <span className="required">*</span>
              </label>
              <select
                id="fb-cat"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="recommendation_accuracy">Standards Recommendation Accuracy</option>
                <option value="missing_standard">Missing Indian Standard or QCO</option>
                <option value="superseded_standard">Outdated / Superseded Standard Flagged</option>
                <option value="user_interface">Accessibility & Portal Usability</option>
                <option value="other">Other Suggestions</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fb-comments" className="form-label">
                Detailed Feedback / Comments <span className="required">*</span>
              </label>
              <textarea
                id="fb-comments"
                className="form-control"
                rows={5}
                required
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Please describe any observed discrepancy or suggested improvement..."
              />
            </div>

            <div className="button-group" style={{ marginTop: '16px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

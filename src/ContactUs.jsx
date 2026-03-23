import { useState } from "react";
import { Instagram, Linkedin, Home } from "lucide-react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {

  const [review, setReview] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [suggestion, setSuggestion] = useState("");

  const sendReview = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_0pkbujc",
        "template_ortxig7",
        {
          from_name: review.name,
          from_email: review.email,
          message: review.message,
          type: "Review",
        },
        "m0isZWk7uOdiyqzlh"
      );

      alert("Review Sent Successfully!");
      setReview({ name: "", email: "", message: "" });

    } catch (err) {
       console.error("EmailJS Error:", err);
      alert("Failed to send review.");
    }
  };

  const sendSuggestion = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_0pkbujc",
        "template_ortxig7",
        {
          from_name: "Anonymous",
          from_email: "N/A",
          message: suggestion,
          type: "Suggestion",
        },
        "m0isZWk7uOdiyqzlh"
      );

      alert("Suggestion Sent Successfully!");
      setSuggestion("");

    } catch (err) {
       console.error("EmailJS Error:", err);
      alert("Failed to send suggestion.");
    }
  };

  return (
    <div className="contact-page">
      <a href="/HomePage" className="home-btn">
        <Home size={24} />
      </a>

      {/* HERO */}
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Contact MDC</h1>
          <p>
            Connect, share feedback, and help us grow the Meta Developers Community.
          </p>
        </div>
      </div>

      {/* SOCIAL SECTION */}
      <div className="social-section">
        <div className="social-left">
          <h2>Stay Connected</h2>
          <p>
            Follow MDC on our social platforms to stay updated with events,
            hackathons, workshops, and announcements.
          </p>

          <div className="social-links">

            <a
              href="https://www.instagram.com/mdc_gitam"
              target="_blank"
              rel="noreferrer"
              className="social-card"
            >
              <div className="icon-box">
                <Instagram size={20} />
              </div>
              <div>
                <h4>Instagram</h4>
                <span>@mdc_gitam</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/company/meta-developer-communities/"
              target="_blank"
              rel="noreferrer"
              className="social-card"
            >
              <div className="icon-box">
                <Linkedin size={20} />
              </div>
              <div>
                <h4>LinkedIn</h4>
                <span>Meta Developer Communities</span>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* FORMS */}
      <div className="form-section">

        <div className="form-header">
          <h2>Share Your Thoughts</h2>
          <p>We value your feedback and ideas.</p>
        </div>

        <div className="form-grid">

          {/* REVIEW */}
          <div className="form-card">
            <h3>Leave a Review</h3>
            <form onSubmit={sendReview}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={review.name}
                onChange={(e) =>
                  setReview({ ...review, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={review.email}
                onChange={(e) =>
                  setReview({ ...review, email: e.target.value })
                }
              />

              <textarea
                placeholder="Your Review"
                rows="4"
                required
                value={review.message}
                onChange={(e) =>
                  setReview({ ...review, message: e.target.value })
                }
              />

              <button type="submit">Submit Review</button>
            </form>
          </div>

          {/* SUGGESTION */}
          <div className="form-card">
            <h3>Suggestions</h3>
            <form onSubmit={sendSuggestion}>
              <textarea
                placeholder="Tell us how we can improve..."
                rows="6"
                required
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
              />

              <button type="submit">Submit Suggestion</button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;

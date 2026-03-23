import { Instagram, Linkedin, Mail } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* BRAND */}
        <div className="footer-brand">
          <div className="footer-logo-row">
            <img src="/mdclogo.png" alt="MDC" className="footer-logo" />
            <span className="footer-brand-name">MDC</span>
          </div>
          <p className="footer-brand-desc">
            Meta Developers Community at GITAM. Empowering developers,
            building communities, and fostering innovation since 2023.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#visionaries">Our Visionaries</a></li>
            <li><a href="#mentors">Our Mentors</a></li>
            <li><a href="#alumni">MDC Alumni</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* CONNECT */}
        <div className="footer-col">
          <h4 className="footer-col-title">Connect</h4>
          <div className="footer-social-icons">
            <a href="https://www.instagram.com/mdc_gitam" target="_blank" rel="noreferrer"
               className="footer-icon-btn instagram" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://www.linkedin.com/company/meta-developer-communities/"
               target="_blank" rel="noreferrer"
               className="footer-icon-btn linkedin" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>

          <h4 className="footer-col-title" style={{ marginTop: 28 }}>Interested in MDC?</h4>
          <a href="mailto:headgcgc@gitam.edu" className="footer-contact-btn">
            <Mail size={16} /> Contact Us
          </a>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <span>© {year} Meta Developers Community, GITAM. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
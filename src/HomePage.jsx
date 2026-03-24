import { useState, useEffect, useRef } from "react";
import { Instagram, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Calendar, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import "./HomePage.css";
import homephoto from './assets/homephoto.jpg'
import img1 from './assets/uma.jpg'
import img2 from './assets/roj.jpg'
import img3 from './assets/jd.jpg'
import ebNitish  from './assets/EB/VINNAKOTA NITISH RAJ.jpg'
import ebGagan   from './assets/EB/RACHAKONDA V S S GAGAN.webp'
import ebSnehal  from './assets/EB/SNEHAL ANDAVARAPU.jpg'
import ebJothisk from './assets/EB/PALLA JOTHISK NANDAN.jpg'
import ebIshitha from './assets/EB/ISHITA GUPTA.jpg'
import ebSravani from './assets/EB/SRAVANI KALISETTY.jpg'
import visionaryGuru from './assets/GuruMurthy.jpg'
import visionaryVikas from './assets/Vikas.jpg' // replace with Vikas photo when available
import paSanjana   from './assets/PApics/Sanjana.jpeg'
import paHarshita  from './assets/PApics/Harshitha.jpeg'
import paHarshitha from './assets/PApics/HarshithaKolipaka.jpeg'
import paSumeet    from './assets/PApics/Sumeet.jpeg'
import paSaketh    from './assets/PApics/SakethVarma.jpeg'
import paSaiP      from './assets/PApics/SaiPraseedaAtluri.jpeg'

const LinkedInSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ─── INFINITE SCROLL EXEC CAROUSEL ─────────────────────── */
const ExecCarousel = ({ execBody }) => {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  // Duplicate the list so we can loop seamlessly
  const items = [...execBody, ...execBody];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animFrame;
    let pos = 0;
    const speed = 0.5; // px per frame — adjust for faster/slower
    const halfWidth = track.scrollWidth / 2;

    const animate = () => {
      if (!paused) {
        pos += speed;
        if (pos >= halfWidth) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [paused]);

  return (
    <section className="home-section">
      <h2>Executive Body</h2>
      <p className="home-section-sub">The leadership team driving MDC's vision and operations.</p>

      <div
        className="exec-scroll-outer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="exec-scroll-track" ref={trackRef}>
          {items.map((member, i) => (
            <div key={i} className="exec-scroll-card">
              <div className="exec-scroll-accent" />
              <div className="exec-scroll-body">
                <img src={member.img} alt={member.name} className="exec-scroll-photo" />
                <p className="exec-scroll-name">{member.name}</p>
                <span className="exec-scroll-role">{member.role}</span>
                <div className="exec-scroll-actions">
                  <a href={member.link} target="_blank" rel="noreferrer" className="mentor-linkedin-btn">
                    <LinkedInSVG /> LinkedIn
                  </a>
                  <a href={`mailto:${member.email}`} className="mentor-email-btn">
                    <Mail size={13} /> {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const AboutAlumni = () => {
  const vision =
    "MDC envisions creating a strong community of student developers who are future-ready, collaborative, and committed to innovation. We aim to foster an environment where students can explore technology, grow as leaders, and contribute meaningfully to the tech ecosystem.";
  const mission =
    "Our mission is to provide students with opportunities to learn, build, and excel through workshops, hackathons, projects, mentorship, and domain-driven activities. MDC strives to encourage peer-to-peer learning, creative thinking, and teamwork while preparing students for real-world challenges in technology and leadership.";

  const [para, setPara] = useState("vision");
  const [review, setReview] = useState({ name: "", email: "", message: "" });
  const [suggestion, setSuggestion] = useState("");
  const sendReview = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send("service_0pkbujc", "template_ortxig7",
        { from_name: review.name, from_email: review.email, message: review.message, type: "Review" },
        "m0isZWk7uOdiyqzlh"
      );
      alert("Review Sent Successfully!");
      setReview({ name: "", email: "", message: "" });
    } catch { alert("Failed to send review."); }
  };

  const sendSuggestion = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send("service_0pkbujc", "template_ortxig7",
        { from_name: "Anonymous", from_email: "N/A", message: suggestion, type: "Suggestion" },
        "m0isZWk7uOdiyqzlh"
      );
      alert("Suggestion Sent Successfully!");
      setSuggestion("");
    } catch { alert("Failed to send suggestion."); }
  };

  const visionaries = [
    {
      img: visionaryGuru,
      name: "Gurumoorthy Gangadharan",
      role: "Founder & Visionary",
      desc: "Pioneered the MDC initiative, laying the foundation for a thriving developer community at GITAM.",
      link: "https://www.linkedin.com/in/ggurumoorthy",
      email: "ggmiitm@gmail.com",
    },
    {
      img: visionaryVikas,
      name: "Vikas B",
      role: "Co-Founder & Visionary",
      desc: "Co-created MDC's vision and drove its early growth into a premier student tech community.",
      link: "https://www.linkedin.com/in/vikas-b-6a4476171/",
      email: "vikasboddu30@gmail.com",
    },
  ];

  const mentors = [
    {
      img: img1,
      name: "Prof. UmaDevi Kancharla",
      role: "Senior Director & Head, GCGC",
      desc: "Visionary mentor guiding MDC's strategic growth and community direction.",
      link: "https://www.linkedin.com/in/umadevi-kancharla-a712b8113/",
      email: "headgcgc@gitam.edu",
    },
    {
      img: img2,
      name: "Dr. Rojeena Mathew",
      role: "Director - TMCG, GCGC",
      desc: "Supports operations, smooth execution, and institutional alignment.",
      link: "https://www.linkedin.com/in/dr-rojeena-mathew/",
      email: "directortmcg_gcgc@gitam.edu",
    },
    {
      img: img3,
      name: "Mr. Jitendra Dasari",
      role: "Assistant Manager",
      desc: "Ensuring alignment with university values and student life excellence.",
      link: "https://www.linkedin.com/in/jitendra-dasari-aa4368171/",
      email: "jdasari2@gitam.edu",
    },
  ];

  const execBody = [
    { name: "Nitish Vinnakota",  role: "President",          img: ebNitish,  link: "https://www.linkedin.com/in/nitish-vinnakota/",   email: "nvinnakot2@gitam.in"   },
    { name: "Gagan Rachakonda",  role: "Vice President",     img: ebGagan,   link: "https://www.linkedin.com/in/gagan-rachakonda/",   email: "garachako2@gitam.in"   },
    { name: "Snehal Andavarapu", role: "Secretary",          img: ebSnehal,  link: "https://www.linkedin.com/in/snehal-andavarapu/",  email: "sandavar@gitam.in"  },
    { name: "Jothisk Nandan",    role: "Head of Operations", img: ebJothisk, link: "https://www.linkedin.com/in/jothisk-nandan/",    email: "jpalla2@gitam.in"     },
    { name: "Ishitha Guptha",    role: "Technical Lead",     img: ebIshitha, link: "https://www.linkedin.com/in/ishitha-guptha/",    email: "iguptha@gitam.in"     },
    { name: "Sravani Kalisetty", role: "Creative Head",      img: ebSravani, link: "https://www.linkedin.com/in/sravani-kalisetty/", email: "skaliset@gitam.in"  },
  ];

  const prominentAlumni = [
    {
      img: paSanjana,
      name: "Sanjana Rayavarapu",
      mdcRole: "Ex President, AY 22-23",
      batch: "2019-2023",
      company: "Deloitte",
      linkedin: "https://www.linkedin.com/in/sanjana~rayavarapu/",
      email: "rayavarapusanjana@gmail.com",
    },
    {
      img: paHarshita,
      name: "Venkata Gnanaprada Harshita",
      mdcRole: "Ex Technical Head, AY 22-23",
      batch: "2020-2024",
      company: "Tata Elxsi",
      linkedin: "https://www.linkedin.com/in/harshitapvg/",
      email: "pvgharshita@gmail.com",
    },
    {
      img: paHarshitha,
      name: "Kashyapi Naga Harshitha Kolipaka",
      mdcRole: "Ex Technical Head, AY 23-24",
      batch: "2021-2025",
      company: "Zeta",
      linkedin: "https://www.linkedin.com/in/harshitha-kolipaka-06b7411aa/",
      email: "Harshithakolipaka28@gmail.com",
    },
    {
      img: paSumeet,
      name: "Sumeet Prusty",
      mdcRole: "Ex Creative Head, AY 23-24",
      batch: "2021-2025",
      company: "JP Morgan",
      linkedin: "https://www.linkedin.com/in/sumeet-prusty-051352246/",
      email: "sumeetprusty2003@gmail.com",
    },
    {
      img: paSaketh,
      name: "Saketh D V",
      mdcRole: "Ex WebArcs Lead, AY 23-24",
      batch: "2021-2025",
      company: "State Street",
      linkedin: "https://www.linkedin.com/in/dv-saketh-varma-936847246/",
      email: "",
    },
    {
      img: paSaiP,
      name: "Sai Praseeda Atluri",
      mdcRole: "Ex Content Lead, AY 24-25",
      batch: "2022-2026",
      company: "Synopsys",
      linkedin: "https://www.linkedin.com/in/saipraseedaatluri/",
      email: "saipraseedaatluri.2004@gmail.com",
    },
  ];

  return (
    <div className="home-wrapper">

      {/* HERO */}
      <section className="home-hero">
        <h1>Meta Developer Communities (MDC)</h1>
        <p>A student-driven developer community at GITAM fostering learning, collaboration and innovation.</p>
      </section>

      {/* ABOUT */}
      <section className="home-section" id="about">
        <h2>About Us</h2>
        <p style={{ marginTop: 14 }}>
          Meta Developer Communities (MDC) was initially launched on 4th January 2023 as Meta Developer Circles
          in collaboration with Meta (formerly Facebook). After Meta discontinued its Developer Circles program
          globally in 2024, MDC evolved independently while preserving the mission of enabling peer-to-peer
          learning, mentorship, and technical excellence.
        </p>
      </section>

      {/* VISION & MISSION */}
      <section className="vm-section">
        <h2>Vision &amp; Mission</h2>
        <div className="vm-toggles">
          {["vision", "mission"].map((t) => (
            <button key={t} onClick={() => setPara(t)}
              className={`vm-btn${para === t ? " active" : ""}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="vm-content">
          <p>{para === "vision" ? vision : mission}</p>
          <img src={homephoto} alt="MDC" />
        </div>
      </section>

      {/* VISIONARIES */}
      <section className="home-section" id="visionaries">
        <h2>Our Visionaries</h2>
        <p className="home-section-sub">The founding minds who brought MDC to life.</p>
        <div className="visionary-grid">
          {visionaries.map((v, i) => (
            <div key={i} className="visionary-card">
              <div className="visionary-bg-accent" />
              <div className="visionary-body">
                <img src={v.img} alt={v.name} className="visionary-photo" />
                <div className="visionary-info">
                  <p className="visionary-name">{v.name}</p>
                  <span className="visionary-role-badge">{v.role}</span>
                  <p className="visionary-desc">{v.desc}</p>
                  <div className="mentor-actions">
                    <a href={v.link} target="_blank" rel="noreferrer" className="mentor-linkedin-btn">
                      <LinkedInSVG /> LinkedIn Profile
                    </a>
                    <a href={`mailto:${v.email}`} className="mentor-email-btn">
                      <Mail size={13} /> {v.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MENTORS */}
      <section className="home-section" id="mentors">
        <h2>Our Mentors</h2>
        <p className="home-section-sub">The guiding pillars of MDC's vision and growth.</p>
        <div className="mentor-grid">
          {mentors.map((m, i) => (
            <div key={i} className="mentor-card">
              <div className="mentor-card-accent" />
              <div className="mentor-card-body">
                <div className="mentor-card-top">
                  <img src={m.img} alt={m.name} />
                  <div>
                    <p className="mentor-name">{m.name}</p>
                    <span className="mentor-role-badge">{m.role}</span>
                  </div>
                </div>
                <p className="mentor-desc">{m.desc}</p>
                <div className="mentor-actions">
                  <a href={m.link} target="_blank" rel="noreferrer" className="mentor-linkedin-btn">
                    <LinkedInSVG /> LinkedIn Profile
                  </a>
                  <a href={`mailto:${m.email}`} className="mentor-email-btn">
                    <Mail size={13} /> {m.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXECUTIVE BODY — infinite scroll */}
      <ExecCarousel execBody={execBody} />

      {/* MDC PROMINENT ALUMNI */}
      <section className="home-section" id="alumni">
        <h2>MDC Prominent Alumni</h2>
        <p className="home-section-sub">
          Former leaders who shaped MDC and are now making their mark in the industry.
        </p>
        <div className="pa-grid">
          {prominentAlumni.map((p, i) => (
            <div key={i} className="pa-card">
              <div className="pa-card-accent" />
              <div className="pa-card-body">
                <div className="pa-card-top">
                  <img src={p.img} alt={p.name} className="pa-photo" />
                  <div className="pa-info">
                    <p className="pa-name">{p.name}</p>
                    <span className="pa-role-badge">{p.mdcRole}</span>
                    <span className="pa-batch-badge">Batch {p.batch}</span>
                  </div>
                </div>
                <div className="pa-divider" />
                <div className="pa-detail-row">
                  <Briefcase size={13} className="pa-icon" />
                  <span className="pa-company">{p.company}</span>
                </div>
                <div className="pa-actions">
                  <a href={p.linkedin} target="_blank" rel="noreferrer" className="mentor-linkedin-btn">
                    <LinkedInSVG /> LinkedIn
                  </a>
                  {p.email && (
                    <a href={`mailto:${p.email}`} className="mentor-email-btn">
                      <Mail size={13} /> {p.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT INLINE */}
      <section className="contact-inline" id="contact">
        <h2>Contact MDC</h2>
        <p className="home-section-sub" style={{ marginBottom: 28 }}>
          Connect, share feedback, and help us grow the Meta Developers Community.
        </p>
        <div className="contact-social-row">
          {[
            { href: "https://www.instagram.com/mdc_gitam", Icon: Instagram, label: "Instagram", sub: "@mdc_gitam" },
            { href: "https://www.linkedin.com/company/meta-developer-communities/", Icon: Linkedin, label: "LinkedIn", sub: "Meta Developer Communities" },
          ].map(({ href, Icon, label, sub }) => ( // eslint-disable-line no-unused-vars
            <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-social-card">
              <div className="contact-icon-box"><Icon size={18} /></div>
              <div><h4>{label}</h4><span>{sub}</span></div>
            </a>
          ))}
        </div>
        <div className="contact-forms-grid">
          <div className="contact-form-card">
            <h3>Leave a Review</h3>
            <form onSubmit={sendReview}>
              <input type="text" placeholder="Full Name" required value={review.name}
                onChange={(e) => setReview({ ...review, name: e.target.value })} />
              <input type="email" placeholder="Email Address" required value={review.email}
                onChange={(e) => setReview({ ...review, email: e.target.value })} />
              <textarea placeholder="Your Review" rows={4} required value={review.message}
                onChange={(e) => setReview({ ...review, message: e.target.value })} />
              <button type="submit" className="contact-submit-btn">Submit Review</button>
            </form>
          </div>
          <div className="contact-form-card">
            <h3>Suggestions</h3>
            <form onSubmit={sendSuggestion}>
              <textarea placeholder="Tell us how we can improve..." rows={9} required value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)} />
              <button type="submit" className="contact-submit-btn">Submit Suggestion</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutAlumni;
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import {
  Search, MapPin, Briefcase, GraduationCap, Calendar,
  Users, ChevronLeft, Phone, Linkedin, Instagram, Twitter, Mail
} from "lucide-react";
import NavBar from "./NavBar";
import "./AlumniPage.css";

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterBatch, setFilterBatch] = useState("All");
  const navigate = useNavigate();

  // Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/login");
      } else {
        setAuthChecked(true);
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (!authChecked) return;
    const fetchAlumni = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true });
      if (!error) {
        setAlumni(data || []);
      }
      setLoading(false);
    };
    fetchAlumni();
  }, [authChecked]);

  const filtered = useMemo(() => {
    let result = alumni;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.full_name?.toLowerCase().includes(q) ||
          a.location?.toLowerCase().includes(q) ||
          a.company_or_college?.toLowerCase().includes(q) ||
          a.company_name?.toLowerCase().includes(q) ||
          a.education?.toLowerCase().includes(q)
      );
    }
    if (filterRole !== "All") result = result.filter((a) => a["Role in MDC"] === filterRole);
    if (filterStatus !== "All") result = result.filter((a) => a.current_status === filterStatus);
    if (filterBatch !== "All") result = result.filter((a) => a.batch === filterBatch);
    return result;
  }, [search, filterRole, filterStatus, filterBatch, alumni]);

  const roles = [
    "All", "Executive Body", "CP Domain", "WebArcs Domain", "DataArcs Domain",
    "Photography Domain", "Design Domain", "Public Relations Domain", "Content Domain",
  ];

  const batches = ["All", ...Array.from(new Set(alumni.map(a => a.batch).filter(Boolean))).sort()];

  if (!authChecked) return null;

  return (
    <>
      <NavBar />
      <div className="alumni-page">

        {/* HEADER */}
        <div className="alumni-page-header">
          <button onClick={() => navigate("/")} className="alumni-back-btn">
            <ChevronLeft size={17} /> Back to Home
          </button>
          <div className="alumni-page-title-row">
            <div className="alumni-page-icon">
              <Users size={26} color="white" />
            </div>
            <div>
              <h1>MDC Alumni Network</h1>
              <p className="alumni-count">{filtered.length} member{filtered.length !== 1 ? "s" : ""} found</p>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="alumni-filter-bar">
          <div className="alumni-search-wrap">
            <span className="alumni-search-icon"><Search size={15} /></span>
            <input
              type="text"
              placeholder="Search by name, location, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="alumni-search-input"
            />
          </div>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="alumni-filter-select">
            {roles.map((r) => <option key={r} value={r}>{r === "All" ? "All Roles" : r}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="alumni-filter-select">
            <option value="All">All Status</option>
            <option value="student">Student</option>
            <option value="working">Working</option>
          </select>
          <select value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)} className="alumni-filter-select">
            {batches.map((b) => <option key={b} value={b}>{b === "All" ? "All Batches" : b}</option>)}
          </select>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="alumni-loading">
            <div className="alumni-spinner" />
            <p>Loading alumni...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="alumni-empty">
            <Users size={48} style={{ opacity: 0.25 }} />
            <p>No alumni found matching your search.</p>
          </div>
        ) : (
          <div className="alumni-grid-layout">
            {filtered.map((person) => {
              const isWorking = person.current_status === "working";
              return (
                <div key={person.id} className="alumni-member-card">
                  <div className="alumni-card-accent" />
                  <div className="alumni-card-body">

                    {/* TOP ROW */}
                    <div className="alumni-card-top-row">
                      <div className="alumni-card-avatar">
                        {person.full_name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div className="alumni-card-name-wrap">
                        <p className="alumni-card-name">{person.full_name || "—"}</p>
                        {person.mdc_position && (
                          <span className="alumni-role-badge">{person.mdc_position}</span>
                        )}
                        {person.batch && (
                          <span className="alumni-batch-badge">Batch {person.batch}</span>
                        )}
                      </div>
                      <span className={`alumni-status-badge ${isWorking ? "alumni-status-working" : "alumni-status-student"}`}>
                        {isWorking ? "Working" : "Student"}
                      </span>
                    </div>

                    <div className="alumni-card-divider" />

                    {/* DETAILS */}
                    <div className="alumni-card-details">
                      {person.location && (
                        <div className="alumni-detail-row"><MapPin size={13} />{person.location}</div>
                      )}
                      {person.education && (
                        <div className="alumni-detail-row"><GraduationCap size={13} />{person.education}</div>
                      )}
                      {(person.company_name || person.company_or_college) && (
                        <div className="alumni-detail-row">
                          <Briefcase size={13} />{person.company_name || person.company_or_college}
                        </div>
                      )}
                      {isWorking && person.job_role && (
                        <div className="alumni-detail-row italic-row">
                          <Briefcase size={13} />
                          {person.job_role}
                          {person.company_name && (
                            <span style={{ color: "#0E4AC9", fontStyle: "normal", fontWeight: 600 }}>
                              @ {person.company_name}
                            </span>
                          )}
                        </div>
                      )}
                      {(person.mdc_from_year || person.mdc_to_year) && (
                        <div className="alumni-detail-row">
                          <Calendar size={13} />
                          MDC: {person.mdc_from_year || "?"} – {person.mdc_to_year || "?"}
                        </div>
                      )}
                    </div>

                    {/* EXPERIENCE */}
                    {person.experiences && person.experiences.length > 0 && (
                      <div className="alumni-exp-section">
                        <p className="alumni-exp-title">Experience</p>
                        {person.experiences.map((exp, i) => (
                          <div key={i} className="alumni-exp-item">
                            <span className="alumni-exp-role">{exp.role}</span>
                            <span className="alumni-exp-company">@ {exp.company}</span>
                            <span className="alumni-exp-years">
                              {exp.from_year}–{exp.current ? "Present" : exp.to_year}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CONTACT */}
                    {person.contact && (
                      <div className="alumni-contact-row">
                        <Phone size={12} style={{ color: "#0E4AC9" }} />
                        <span className="alumni-contact-label">Contact:</span>
                        <span className="alumni-contact-value">{person.contact}</span>
                      </div>
                    )}

                    {/* SOCIAL LINKS */}
                    {(person.linkedin_id || person.insta_id || person.twitter_id || person.personal_email) && (
                      <div className="alumni-social-row">
                        {person.linkedin_id && (
                          <a href={`https://www.linkedin.com/in/${person.linkedin_id}`} target="_blank" rel="noreferrer" className="alumni-social-link linkedin">
                            <Linkedin size={13} /><span>{person.linkedin_id}</span>
                          </a>
                        )}
                        {person.insta_id && (
                          <a href={`https://www.instagram.com/${person.insta_id}`} target="_blank" rel="noreferrer" className="alumni-social-link instagram">
                            <Instagram size={13} /><span>@{person.insta_id}</span>
                          </a>
                        )}
                        {person.twitter_id && (
                          <a href={`https://x.com/${person.twitter_id}`} target="_blank" rel="noreferrer" className="alumni-social-link twitter">
                            <Twitter size={13} /><span>@{person.twitter_id}</span>
                          </a>
                        )}
                        {person.personal_email && (
                          <a href={`mailto:${person.personal_email}`} className="alumni-social-link email">
                            <Mail size={13} /><span>{person.personal_email}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default AlumniPage;
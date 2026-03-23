import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import {
  User, MapPin, Phone, GraduationCap, Briefcase, Calendar,
  ChevronLeft, Save, Mail, Hash, Instagram, Linkedin, Building2,
  Twitter, Plus, Trash2, Globe
} from "lucide-react";
import "./edit-profile.css";

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      if (!session) { navigate("/login"); return; }
      const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (!error && data) {
        setProfile(data);
        setExperiences(data.experiences || []);
      }
      setLoading(false);
    }
    loadProfile();
  }, [navigate]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", from_year: "", to_year: "", current: false }]);
  };
  const removeExperience = (idx) => setExperiences(experiences.filter((_, i) => i !== idx));
  const updateExperience = (idx, field, value) => {
    const updated = [...experiences];
    updated[idx] = { ...updated[idx], [field]: value };
    setExperiences(updated);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { data: auth } = await supabase.auth.getSession();
    const userId = auth.session.user.id;
    const { error } = await supabase.from("profiles").update({
      full_name:          profile.full_name,
      gitam_email:        profile.gitam_email,
      personal_email:     profile.personal_email,
      reg_no:             profile.reg_no,
      course:             profile.course,
      branch:             profile.branch,
      education:          profile.education,
      batch:              profile.batch,
      contact:            profile.contact,
      location:           profile.location,
      current_location:   profile.current_location,
      insta_id:           profile.insta_id,
      linkedin_id:        profile.linkedin_id,
      twitter_id:         profile.twitter_id,
      mdc_from_year:      profile.mdc_from_year,
      mdc_to_year:        profile.mdc_to_year,
      mdc_position:       profile.mdc_position,
      "Role in MDC":      profile["Role in MDC"],
      current_status:     profile.current_status,
      company_or_college: profile.company_or_college,
      company_name:       profile.company_name,
      company_location:   profile.company_location,
      company_website:    profile.company_website,
      job_role:           profile.job_role || null,
      experiences:        experiences,
      updated_at:         new Date(),
    }).eq("id", userId);
    if (error) { alert("Error updating profile: " + error.message); setSaving(false); return; }
    alert("Profile updated successfully!");
    navigate("/");
  };

  if (loading) return (
    <div className="ep-loading">
      <div className="ep-spinner" />
      <p>Loading profile...</p>
    </div>
  );

  const isWorking = profile.current_status === "working";
  const f = (name) => profile[name] || "";

  const mdcRoles = [
    "Executive Body", "CP Domain", "WebArcs Domain", "DataArcs Domain",
    "Photography Domain", "Design Domain", "Public Relations Domain", "Content Domain"
  ];

  const mdcPositions = [
    "President", "Vice President", "Secretary", "Head of Operations",
    "Technical Lead", "Creative Head", "Domain Lead", "Core Member", "Member"
  ];

  const batchOptions = ["2020-2024","2021-2025","2022-2026","2023-2027","2024-2028","2025-2029","2026-2030"];

  return (
    <div className="ep-page">
      <div className="ep-container">

        {/* Header */}
        <div className="ep-header">
          <button onClick={() => navigate("/")} className="ep-back-btn">
            <ChevronLeft size={17} /> Back to Home
          </button>
          <h1>Edit Profile</h1>
          <p>Keep your profile up to date so the MDC community can stay connected.</p>
        </div>

        <form onSubmit={handleUpdate}>

          {/* ── IDENTITY ── */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon"><User size={16} /></div>
              <h2>Identity</h2>
            </div>
            <div className="ep-identity-row">
              <div className="ep-avatar">{profile.full_name?.charAt(0).toUpperCase() || "?"}</div>
              <div className="ep-identity-fields">
                <div className="ep-field ep-field-full">
                  <label className="ep-label">Full Name</label>
                  <input type="text" name="full_name" value={f("full_name")}
                    onChange={handleChange} placeholder="Your full name"
                    className="ep-input ep-input-name" />
                </div>
                <div className="ep-grid-2">
                  <div className="ep-field">
                    <label className="ep-label"><Mail size={11} /> GITAM Email</label>
                    <input type="email" name="gitam_email" value={f("gitam_email")}
                      onChange={handleChange} placeholder="abc@gitam.in" className="ep-input" />
                  </div>
                  <div className="ep-field">
                    <label className="ep-label"><Mail size={11} /> Personal Email</label>
                    <input type="email" name="personal_email" value={f("personal_email")}
                      onChange={handleChange} placeholder="you@gmail.com" className="ep-input" />
                  </div>
                  <div className="ep-field">
                    <label className="ep-label"><Hash size={11} /> Registration No.</label>
                    <input type="text" name="reg_no" value={f("reg_no")}
                      onChange={handleChange} placeholder="e.g. BU21CSEN0100XXX" className="ep-input" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ACADEMIC INFO ── */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon"><GraduationCap size={16} /></div>
              <h2>Academic Info</h2>
            </div>
            <div className="ep-grid-3">
              <div className="ep-field">
                <label className="ep-label">Degree / Course</label>
                <input type="text" name="course" value={f("course")}
                  onChange={handleChange} placeholder="e.g. B.Tech" className="ep-input" />
              </div>
              <div className="ep-field">
                <label className="ep-label">Branch / Specialisation</label>
                <input type="text" name="branch" value={f("branch")}
                  onChange={handleChange} placeholder="e.g. Computer Science" className="ep-input" />
              </div>
              <div className="ep-field">
                <label className="ep-label">Graduation Year</label>
                <input type="text" name="education" value={f("education")}
                  onChange={handleChange} placeholder="e.g. 2025" className="ep-input" />
              </div>
            </div>
            <div className="ep-grid-2" style={{ marginTop: 16 }}>
              <div className="ep-field">
                <label className="ep-label"><Calendar size={11} /> Batch</label>
                <select name="batch" value={f("batch")} onChange={handleChange} className="ep-select">
                  <option value="">Select Batch</option>
                  {batchOptions.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ── CONTACT & LOCATION ── */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon"><Phone size={16} /></div>
              <h2>Contact &amp; Location</h2>
            </div>
            <div className="ep-grid-2">
              <div className="ep-field">
                <label className="ep-label"><Phone size={11} /> Phone Number</label>
                <input type="text" name="contact" value={f("contact")}
                  onChange={handleChange} placeholder="e.g. 9876543210" className="ep-input" />
              </div>
              <div className="ep-field">
                <label className="ep-label"><MapPin size={11} /> Home Location</label>
                <input type="text" name="location" value={f("location")}
                  onChange={handleChange} placeholder="e.g. Hyderabad, India" className="ep-input" />
              </div>
              <div className="ep-field">
                <label className="ep-label"><MapPin size={11} /> Current Location</label>
                <input type="text" name="current_location" value={f("current_location")}
                  onChange={handleChange} placeholder="e.g. Bangalore, India" className="ep-input" />
              </div>
            </div>
          </div>

          {/* ── SOCIAL PROFILES ── */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon"><Instagram size={16} /></div>
              <h2>Social Profiles</h2>
            </div>
            <div className="ep-grid-2">
              <div className="ep-field">
                <label className="ep-label"><Instagram size={11} /> Instagram Handle</label>
                <div className="ep-input-prefix-wrap">
                  <span className="ep-input-prefix">@</span>
                  <input type="text" name="insta_id" value={f("insta_id")}
                    onChange={handleChange} placeholder="your_handle"
                    className="ep-input ep-input-prefixed" />
                </div>
              </div>
              <div className="ep-field">
                <label className="ep-label"><Linkedin size={11} /> LinkedIn Username</label>
                <div className="ep-input-prefix-wrap">
                  <span className="ep-input-prefix">linkedin.com/in/</span>
                  <input type="text" name="linkedin_id" value={f("linkedin_id")}
                    onChange={handleChange} placeholder="your-name"
                    className="ep-input ep-input-prefixed" />
                </div>
              </div>
              <div className="ep-field">
                <label className="ep-label"><Twitter size={11} /> X (Twitter) Handle</label>
                <div className="ep-input-prefix-wrap">
                  <span className="ep-input-prefix">@</span>
                  <input type="text" name="twitter_id" value={f("twitter_id")}
                    onChange={handleChange} placeholder="your_handle"
                    className="ep-input ep-input-prefixed" />
                </div>
              </div>
            </div>
          </div>

          {/* ── MDC TENURE ── */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon"><Calendar size={16} /></div>
              <h2>MDC Tenure</h2>
            </div>
            <div className="ep-grid-3">
              <div className="ep-field">
                <label className="ep-label">From Year</label>
                <input type="number" name="mdc_from_year" value={f("mdc_from_year")}
                  onChange={handleChange} placeholder="2022" className="ep-input" min="2020" max="2030" />
              </div>
              <div className="ep-field">
                <label className="ep-label">To Year</label>
                <input type="number" name="mdc_to_year" value={f("mdc_to_year")}
                  onChange={handleChange} placeholder="2024" className="ep-input" min="2020" max="2030" />
              </div>
            </div>
            <div className="ep-grid-2" style={{ marginTop: 16 }}>
              <div className="ep-field">
                <label className="ep-label">Domain / Role in MDC</label>
                <select name="Role in MDC" value={f("Role in MDC")} onChange={handleChange} className="ep-select">
                  <option value="">Select Domain</option>
                  {mdcRoles.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="ep-field">
                <label className="ep-label">Position Held</label>
                <select name="mdc_position" value={f("mdc_position")} onChange={handleChange} className="ep-select">
                  <option value="">Select Position</option>
                  {mdcPositions.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ── CURRENT STATUS ── */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon"><Briefcase size={16} /></div>
              <h2>Current Status</h2>
            </div>
            <div className="ep-grid-2">
              <div className="ep-field">
                <label className="ep-label">I am currently</label>
                <select name="current_status" value={profile.current_status || "student"} onChange={handleChange} className="ep-select">
                  <option value="student">Student</option>
                  <option value="working">Working Professional</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── PROFESSIONAL / INSTITUTION ── */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon"><Building2 size={16} /></div>
              <h2>{isWorking ? "Company Details" : "Institution"}</h2>
              {isWorking && <span className="ep-working-badge">Working Professional</span>}
            </div>
            {isWorking ? (
              <>
                <div className="ep-grid-2">
                  <div className="ep-field">
                    <label className="ep-label">Company Name</label>
                    <input type="text" name="company_name" value={f("company_name")}
                      onChange={handleChange} placeholder="e.g. Google, Infosys" className="ep-input" />
                  </div>
                  <div className="ep-field">
                    <label className="ep-label">Job Role / Designation</label>
                    <input type="text" name="job_role" value={f("job_role")}
                      onChange={handleChange} placeholder="e.g. Software Engineer" className="ep-input" />
                  </div>
                  <div className="ep-field">
                    <label className="ep-label"><MapPin size={11} /> Company Location</label>
                    <input type="text" name="company_location" value={f("company_location")}
                      onChange={handleChange} placeholder="e.g. Bangalore, India" className="ep-input" />
                  </div>
                  <div className="ep-field">
                    <label className="ep-label"><Globe size={11} /> Company Website</label>
                    <input type="url" name="company_website" value={f("company_website")}
                      onChange={handleChange} placeholder="https://company.com" className="ep-input" />
                  </div>
                </div>
                <div className="ep-note">
                  <Building2 size={14} />
                  <span>Your company details will be visible to the MDC Alumni Network.</span>
                </div>
              </>
            ) : (
              <div className="ep-field" style={{ maxWidth: 440 }}>
                <label className="ep-label">College / Institution</label>
                <input type="text" name="company_or_college" value={f("company_or_college")}
                  onChange={handleChange} placeholder="e.g. GITAM University" className="ep-input" />
              </div>
            )}
          </div>

          {/* ── EXPERIENCE ── */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon"><Briefcase size={16} /></div>
              <h2>Experience</h2>
              <button type="button" className="ep-add-btn" onClick={addExperience}>
                <Plus size={14} /> Add
              </button>
            </div>

            {experiences.length === 0 && (
              <p className="ep-empty-exp">No experience added yet. Click "Add" to add your work experience.</p>
            )}

            {experiences.map((exp, idx) => (
              <div key={idx} className="ep-exp-row">
                <div className="ep-exp-header">
                  <span className="ep-exp-label">Experience {idx + 1}</span>
                  <button type="button" className="ep-remove-btn" onClick={() => removeExperience(idx)}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className="ep-grid-2">
                  <div className="ep-field">
                    <label className="ep-label">Company / Organisation</label>
                    <input type="text" value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)}
                      placeholder="e.g. Google" className="ep-input" />
                  </div>
                  <div className="ep-field">
                    <label className="ep-label">Role / Designation</label>
                    <input type="text" value={exp.role} onChange={(e) => updateExperience(idx, "role", e.target.value)}
                      placeholder="e.g. SDE Intern" className="ep-input" />
                  </div>
                  <div className="ep-field">
                    <label className="ep-label">From Year</label>
                    <input type="number" value={exp.from_year} onChange={(e) => updateExperience(idx, "from_year", e.target.value)}
                      placeholder="2023" className="ep-input" min="2015" max="2030" />
                  </div>
                  <div className="ep-field">
                    <label className="ep-label">To Year {exp.current && <span style={{color:"#0E4AC9"}}>(Current)</span>}</label>
                    <input type="number" value={exp.to_year} onChange={(e) => updateExperience(idx, "to_year", e.target.value)}
                      placeholder="2024" className="ep-input" min="2015" max="2030" disabled={exp.current} />
                  </div>
                </div>
                <label className="ep-checkbox-label">
                  <input type="checkbox" checked={exp.current || false}
                    onChange={(e) => updateExperience(idx, "current", e.target.checked)} />
                  I currently work here
                </label>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="ep-actions">
            <button type="button" className="ep-cancel-btn" onClick={() => navigate("/")}>Cancel</button>
            <button type="submit" className="ep-save-btn" disabled={saving}>
              <Save size={15} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;
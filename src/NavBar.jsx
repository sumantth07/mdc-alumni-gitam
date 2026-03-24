import { useState, useEffect } from "react";
import { User, LogOut, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./NavBar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleMenuClick = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <img src="/mdclogo.png" alt="MDC Logo" className="navbar-logo" />
        <span className="navbar-title">MDC Alumni Connect</span>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <button className="navbar-link-btn" onClick={() => navigate("/")}>Home</button>

        {session ? (
          <>
            <button className="navbar-alumni-pill" onClick={() => navigate("/alumni")}>
              <Users size={15} /> All Alumni
            </button>
            <div className="navbar-profile-wrap">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="navbar-profile-btn">
                <User size={18} />
              </button>
              {dropdownOpen && (
                <div className="navbar-dropdown">
                  <button onClick={() => handleMenuClick("/edit-profile")} className="navbar-dropdown-item">
                    Edit Profile
                  </button>
                  <button onClick={() => handleMenuClick("/forgot-password")} className="navbar-dropdown-item">
                    Forgot Password
                  </button>
                  <button onClick={() => handleMenuClick("/reset-password")} className="navbar-dropdown-item">
                    Reset Password
                  </button>
                  <button onClick={handleLogout} className="navbar-dropdown-item navbar-dropdown-logout">
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="navbar-login-btn" onClick={() => navigate("/login")}>Login</button>
            <button className="navbar-signup-btn" onClick={() => navigate("/register")}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
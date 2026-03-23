import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import LoadingBar from "./LoadingBar";
import image from "./assets/image.jpg";
import './LoginPage.css';

const LoginPage = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [message, setMessage] = useState("");
 const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");
  
  if (!email || !password) {
   setError("Please fill in all fields");
   return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
   setError("Please enter a valid email");
   return;
  }

  setLoading(true);
  
  try {
   const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
   });

   if (authError) {
    throw new Error(authError.message);
   }

   if (data.user) {
    setMessage("Login successful! Redirecting...");
    localStorage.setItem("user", JSON.stringify(data.user));
    setTimeout(() => navigate("/"), 1500);
   }
  } catch (err) {
   setError(err.message || "Login failed. Please try again.");
   console.error("Login error:", err);
  } finally {
   setLoading(false);
  }
 };

 return (
  <>
   <LoadingBar isVisible={loading} />
   <div className="login-container">

    {/* LEFT SECTION */}
    <div className="left-section">
     <div className="content-wrapper">
      <div className="image-box">
       <img
        src={image}
        alt="Group of students"
        className="group-photo"
       />
      </div>
      <div className="text-content">
       <h1>MDC Alumni Portal</h1>
       <p>"Stay connected"</p>
      </div>
     </div>
    </div>

    {/* RIGHT SECTION */}
    <div className="right-section">
     <div className="login-card">
      <h2>Login</h2>
      
      {error && (
       <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
        {error}
       </div>
      )}
      
      {message && (
       <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
        {message}
       </div>
      )}

      <form className="login-form" onSubmit={handleLogin}>
       
       {/* Email */}
       <div className="input-group">
        <label>Email</label>
        <input
         type="email"
         placeholder="Enter your email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         disabled={loading}
         required
        />
       </div>

       {/* Password */}
       <div className="input-group">
        <label>Password</label>
        <input
         type="password"
         placeholder="Enter your password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         disabled={loading}
         required
        />
       </div>

       {/* Buttons */}
       <div className="button-group">
        <button 
         type="submit" 
         className="btn-login"
         disabled={loading}
        >
         {loading ? "Logging in..." : "Login"}
        </button>

        <button 
         type="button" 
         className="btn-register"
         onClick={() => navigate("/register")}
         disabled={loading}
        >
         Create Account
        </button>
       </div>
      </form>

      {/* Forgot password */}
      <div className="forgot-password">
       <a href="/forgot-password">Forgot Password?</a>
      </div>
     </div>
    </div>

   </div>
  </>
 );
};

export default LoginPage;

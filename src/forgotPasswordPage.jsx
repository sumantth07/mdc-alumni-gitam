import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import LoadingBar from "./LoadingBar";
import image from "./assets/image.jpg";
import './LoginPage.css';

const ForgotPasswordPage = () => {
 const [email, setEmail] = useState("");
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState("");
 const [error, setError] = useState("");
 const navigate = useNavigate();

 const handleForgotPassword = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (!email) {
   setError("Please enter your email");
   return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
   setError("Please enter a valid email");
   return;
  }

  setLoading(true);

  try {
   const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/reset-password"
   });

   if (resetError) {
    throw new Error(resetError.message);
   }

   setMessage("Password reset link has been sent to your email!");
   setEmail("");
   setTimeout(() => navigate("/"), 3000);
  } catch (err) {
   setError(err.message || "Failed to process request");
   console.error("Forgot password error:", err);
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
       <h1>Reset Password</h1>
       <p>"We'll help you recover your account"</p>
      </div>
     </div>
    </div>

    {/* RIGHT SECTION */}
    <div className="right-section">
     <div className="login-card">
      <h2>Forgot or Change Password?  </h2>
      
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

      <form onSubmit={handleForgotPassword} className="login-form">
       <div className="input-group">
        <label>Email Address</label>
        <input
         type="email"
         placeholder="Enter your email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         disabled={loading}
        />
       </div>

       <div className="button-group">
        <button 
         type="submit" 
         className="btn-login"
         disabled={loading}
        >
         {loading ? "Sending..." : "Send Reset Link"}
        </button>
        <button 
         type="button" 
         className="btn-register"
         onClick={() => navigate("/")}
         disabled={loading}
        >
         Back to Login
        </button>
       </div>
      </form>
     </div>
    </div>

   </div>
  </>
 );
};

export default ForgotPasswordPage;
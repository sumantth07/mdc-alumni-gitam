import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import LoadingBar from "./LoadingBar";
import image from "./assets/image.jpg";
import './LoginPage.css';

const ResetPasswordPage = () => {
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [message, setMessage] = useState("");
 const navigate = useNavigate();

 const validatePassword = (password) => {
  return password.length >= 6;
 };

 const handleResetPassword = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (!password || !confirmPassword) {
   setError("Please fill in all fields");
   return;
  }

  if (!validatePassword(password)) {
   setError("Password must be at least 6 characters long");
   return;
  }

  if (password !== confirmPassword) {
   setError("Passwords do not match");
   return;
  }

  setLoading(true);

  try {
   const { error: updateError } = await supabase.auth.updateUser({
    password: password
   });

   if (updateError) {
    throw new Error(updateError.message);
   }

   setMessage("Password reset successfully! Redirecting to login...");
   setTimeout(() => navigate("/"), 2000);
  } catch (err) {
   setError(err.message || "Failed to reset password. Please try again.");
   console.error("Reset password error:", err);
  } finally {
   setLoading(false);
  }
 };

 return (
  <>
   <LoadingBar isVisible={loading} />
   <div className="login-container">
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
       <p>"Create a new secure password"</p>
      </div>
     </div>
    </div>

    <div className="right-section">
     <div className="login-card">
      <h2>Set New Password</h2>
      
      {error && (
       <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-400">
        {error}
       </div>
      )}
      
      {message && (
       <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm border border-green-400">
        {message}
       </div>
      )}

      <form onSubmit={handleResetPassword} className="login-form">
       <div className="input-group">
        <label htmlFor="password">New Password</label>
        <input
         id="password"
         type="password"
         placeholder="Enter new password (min 6 characters)"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         disabled={loading}
         required
        />
       </div>

       <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
         id="confirmPassword"
         type="password"
         placeholder="Confirm new password"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         disabled={loading}
         required
        />
       </div>

       <div className="button-group">
        <button 
         type="submit" 
         className="btn-login"
         disabled={loading}
        >
         {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPage;
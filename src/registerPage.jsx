import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import LoadingBar from "./LoadingBar";
import image from "./assets/image.jpg";
import './RegisterPage.css';

const RegisterPage = () => {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  dob: "",
  
 });
 
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [message, setMessage] = useState("");
 const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
   ...prevState,
   [name]: value
  }));
 };

 

 const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
 };

 const validatePassword = (password) => {
  return password.length >= 6;
 };

 const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
 };

 

 const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  // Validation
  if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
   setError("Please fill in name, email, and password fields");
   return;
  }

  if (!formData.phone.trim()) {
   setError("Please enter your phone number");
   return;
  }

  if (!formData.dob) {
   setError("Please enter your date of birth");
   return;
  }

  

  if (!validateEmail(formData.email)) {
   setError("Please enter a valid email address");
   return;
  }

  if (!validatePhone(formData.phone)) {
   setError("Please enter a valid 10-digit phone number");
   return;
  }

  if (!validatePassword(formData.password)) {
   setError("Password must be at least 6 characters long");
   return;
  }

  if (formData.password !== formData.confirmPassword) {
   setError("Passwords do not match");
   return;
  }

  // Check age (must be 18+)
  const dob = new Date(formData.dob);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
   if (age - 1 < 18) {
    setError("You must be at least 18 years old");
    return;
   }
  } else if (age < 18) {
   setError("You must be at least 18 years old");
   return;
  }

  setLoading(true);

  try {
   // Step 1: Sign up user with Supabase Auth
   const { data, error: authError } = await supabase.auth.signUp({
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
    options: {
     data: {
      full_name: formData.name.trim()
     }
    }
   });

   if (authError) {
    if (authError.message.includes("already registered")) {
     throw new Error("This email is already registered. Please login instead.");
    }
    throw new Error(authError.message);
   }

   if (!data.user) {
    throw new Error("Account creation failed. Please try again.");
   }

   // Step 3: Create profile in profiles table
   const { error: profileError } = await supabase
    .from("profiles")
    .insert([{
     id: data.user.id,
     full_name: formData.name.trim(),
     
     contact: formData.phone.trim(),
    
   
     
     updated_at: new Date().toISOString()
    }]);

   if (profileError) {
    console.error("Profile creation error:", profileError);
    throw new Error(`Failed to create profile: ${profileError.message}`);
   }

   setMessage("Account created successfully! Please check your email to verify.");
   setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
    
   });
   
   
   setTimeout(() => navigate("/"), 2000);
  } catch (err) {
   setError(err.message || "Registration failed. Please try again.");
   console.error("Registration error:", err);
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
       <h1>MDC Alumni Portal</h1>
       <p>Join our community</p>
      </div>
     </div>
    </div>

    <div className="right-section">
     <div className="login-card" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <h2>Create Account</h2>
      
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

      <form onSubmit={handleRegister} className="login-form" noValidate>
       {/* Full Name */}
       <div className="input-group">
        <label htmlFor="name">Full Name *</label>
        <input
         id="name"
         type="text"
         name="name"
         placeholder="Enter your full name"
         value={formData.name}
         onChange={handleChange}
         disabled={loading}
         required
        />
       </div>

       {/* Email */}
       <div className="input-group">
        <label htmlFor="email">Email *</label>
        <input
         id="email"
         type="email"
         name="email"
         placeholder="Enter your email"
         value={formData.email}
         onChange={handleChange}
         disabled={loading}
         required
        />
       </div>

       {/* Phone */}
       <div className="input-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
         id="phone"
         type="tel"
         name="phone"
         placeholder="Enter 10-digit phone number"
         value={formData.phone}
         onChange={handleChange}
         disabled={loading}
         required
        />
       </div>

       {/* Date of Birth */}
       <div className="input-group">
        <label htmlFor="dob">Date of Birth *</label>
        <input
         id="dob"
         type="date"
         name="dob"
         value={formData.dob}
         onChange={handleChange}
         disabled={loading}
         required
        />
       </div>

       {/* Password */}
       <div className="input-group">
        <label htmlFor="password">Password *</label>
        <input
         id="password"
         type="password"
         name="password"
         placeholder="Enter your password (min 6 characters)"
         value={formData.password}
         onChange={handleChange}
         disabled={loading}
         required
        />
       </div>

       {/* Confirm Password */}
       <div className="input-group">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
         id="confirmPassword"
         type="password"
         name="confirmPassword"
         placeholder="Confirm your password"
         value={formData.confirmPassword}
         onChange={handleChange}
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
         {loading ? "Creating Account..." : "Sign Up"}
        </button>
        <button 
         type="button" 
         className="btn-register"
         onClick={() => navigate("/")}
         disabled={loading}
        >
         Already have an account? Login
        </button>
       </div>
      </form>
     </div>
    </div>
   </div>
  </>
 );
};

export default RegisterPage;

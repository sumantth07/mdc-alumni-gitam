import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from "./registerPage";
import AboutAlumni from './HomePage';
import EditProfile from './edit-profile';
import ForgotPasswordPage from './forgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import AlumniPage from './AlumniPage';
import NavBar from './NavBar';
import Events from './Events';
import Footer from './Footer';

export default function App() {
  return (
    <Routes>
      {/* PUBLIC - anyone can view */}
      <Route path="/" element={<><NavBar /><AboutAlumni /><Events /><Footer /></>} />

      {/* AUTH PAGES */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* AUTH-GATED PAGES */}
      <Route path="/alumni" element={<AlumniPage />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}
import { Routes, Route } from "react-router-dom";
import Welcome from "./Entry/Welcome";
import Login from "./Entry/Login";
import OtpVerify from "./Entry/Otp-verify";
import CompleteProfile from "./Entry/Complete-profile";
import Navbar from "./Reuseable/Navbar";
import Footer from "./Reuseable/Footer";
import Dashboard from "./Dashboard/Dashboard";
import Flashcard from "./Flashcard/Flashcard";
import Streaks from "./Flashcard/Streaks";
import Pricing from "./Subscription/Pricing";
import PaymentCheckout from "./Subscription/Payment-checkout";
import Thanks from "./Subscription/Thanks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp-verify" element={<OtpVerify />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/flashcard" element={<Flashcard />} />
      <Route path="/streaks" element={<Streaks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/payment-checkout" element={<PaymentCheckout />} />
      <Route path="/thanks" element={<Thanks />} />
    </Routes>
  );
}

export default App;
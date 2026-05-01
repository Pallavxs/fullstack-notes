import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate, Link } from "react-router";

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const CheckCircle2Icon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

    body {
      background-color: white;
      color: #0a0a0a;
      -webkit-font-smoothing: antialiased;
      font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
      margin: 0;
      padding: 0;
    }
    ::selection {
      background: black;
      color: white;
    }
    .font-serif {
      font-family: "Cormorant Garamond", serif;
    }
    .text-meta {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      font-weight: 700;
      color: #6b7280; /* text-gray-500 */
    }
    .bg-faint {
      background-color: #fbfbfb;
    }
  `}</style>
);

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await handleRegister({
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
        contact: formData.contact,
        isSeller: formData.isSeller,
      });
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrorMsg(error.response.data.errors[0].msg);
      } else if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12 font-sans">
      <Styles />
      <div className="w-full max-w-sm space-y-10">
        <div className="text-center space-y-4">
          <Link to="/" className="text-2xl font-serif tracking-[0.4em] font-bold uppercase inline-block mb-4 text-black">SNITCH</Link>
          <div className="text-meta">Join the studio</div>
          <h1 className="text-4xl font-serif tracking-tight">Create Account</h1>
        </div>

        <div className="space-y-6">
          <a 
            href="/api/auth/google"
            className="w-full border border-gray-100 py-4 flex items-center justify-center gap-3 hover:bg-faint transition-all group no-underline text-black"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
            <span className="text-meta text-black group-hover:text-black">Continue with Google</span>
          </a>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-[10px] text-gray-300 uppercase tracking-widest">or email</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-0 top-3 text-gray-300">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  name="fullname"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full border-b border-gray-100 py-3 pl-8 focus:outline-none focus:border-black transition-colors bg-transparent italic text-sm text-black"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative">
                <div className="absolute left-0 top-3 text-gray-300">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-100 py-3 pl-8 focus:outline-none focus:border-black transition-colors bg-transparent italic text-sm text-black"
                  placeholder="Email Address"
                />
              </div>

              <div className="relative">
                <div className="absolute left-0 top-3 text-gray-300">
                  <PhoneIcon />
                </div>
                <input
                  type="tel"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border-b border-gray-100 py-3 pl-8 focus:outline-none focus:border-black transition-colors bg-transparent italic text-sm text-black"
                  placeholder="Contact Number"
                />
              </div>

              <div className="relative">
                <div className="absolute left-0 top-3 text-gray-300">
                  <LockIcon />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-b border-gray-100 py-3 pl-8 focus:outline-none focus:border-black transition-colors bg-transparent italic text-sm text-black"
                  placeholder="Password"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative pt-1">
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${formData.isSeller ? 'bg-black border-black' : 'border-gray-200 group-hover:border-black'}`}>
                  {formData.isSeller && <CheckCircle2Icon />}
                </div>
              </div>
              <div>
                <span className="text-meta block text-black">Register as studio curator (Seller)</span>
                <p className="text-[10px] text-gray-400 italic m-0 p-0 pt-1">I want to list and manage my own archive items.</p>
              </div>
            </label>

            {errorMsg && (
              <div className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">
                {errorMsg}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-black text-white py-5 text-meta uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Initialize Profile
            </button>
          </form>

          <p className="text-center text-meta text-gray-400">
            Already registered? <Link to="/login" className="text-black border-b border-black pb-0.5 no-underline">Access Studio</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

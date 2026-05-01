import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate, Link } from 'react-router';

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const user = await handleLogin({ email: formData.email, password: formData.password });
      if(user.role == 'buyer'){
        navigate("/");
      } else if(user.role == 'seller'){
        navigate("/seller/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Login failed. Please check your credentials.');
      }
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 font-sans">
      <Styles />
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-4">
          <Link to="/" className="text-2xl font-serif tracking-[0.4em] font-bold uppercase inline-block mb-8 text-black">SNITCH</Link>
          <div className="text-meta">Access your studio</div>
          <h1 className="text-4xl font-serif tracking-tight">Welcome Back</h1>
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

            {errorMsg && (
              <div className="text-red-500 text-xs text-center font-bold uppercase tracking-widest">
                {errorMsg}
              </div>
            )}

            <button type="submit" className="w-full bg-black text-white py-5 flex items-center justify-center gap-4 group transition-all hover:bg-gray-900 shadow-xl cursor-pointer">
              <span className="text-[10px] uppercase tracking-widest font-bold">Access Studio</span>
              <div className="group-hover:translate-x-1 transition-transform">
                <ArrowRightIcon />
              </div>
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 text-xs italic">
              Don't have an account? <Link to="/register" className="text-black not-italic font-bold underline decoration-gray-100 hover:decoration-black transition-all">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      email: formData.email,
      password: formData.password,
      fullname: formData.fullname,
      contact: formData.contact,
      isSeller: formData.isSeller,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative font-sans overflow-hidden">
      <style>
        {`
          @keyframes slow-pan {
            0% { transform: scale(1.05) translate(0, 0); }
            100% { transform: scale(1.1) translate(-2%, 2%); }
          }
          @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -10%); }
            20% { transform: translate(-15%, 5%); }
            30% { transform: translate(7%, -25%); }
            40% { transform: translate(-5%, 25%); }
            50% { transform: translate(-15%, 10%); }
            60% { transform: translate(15%, 0%); }
            70% { transform: translate(0%, 15%); }
            80% { transform: translate(3%, 35%); }
            90% { transform: translate(-10%, 10%); }
          }
          .film-grain {
            position: absolute;
            top: -50%; left: -50%; right: -50%; bottom: -50%;
            width: 200%; height: 200%;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.15;
            animation: grain 8s steps(10) infinite;
            z-index: 1;
            mix-blend-mode: color-dodge;
          }
        `}
      </style>

      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950/80">
        <img
          src="/boutique-bg.png"
          alt="Boutique Environment"
          className="w-full h-full object-cover opacity-50 grayscale-[40%] contrast-125 brightness-75 mix-blend-screen animate-[slow-pan_20s_ease-in-out_infinite_alternate]"
        />
        {/* Gradients to frame the form */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950/90"></div>
        <div className="film-grain"></div>
      </div>

      {/* Massive Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-[120vw] overflow-hidden text-center opacity-70">
        <h1
          className="text-[20vw] font-black uppercase leading-none text-transparent"
          style={{ WebkitTextStroke: "2px rgba(255,215,0,0.1)" }}
        >
          SNITCH
        </h1>
      </div>

      {/* Vertical Side Label */}
      <div className="hidden lg:flex absolute left-8 top-0 h-full flex-col justify-center items-center z-10 pointer-events-none opacity-40">
        <div className="-rotate-90 origin-center text-[10px] font-bold tracking-[0.5em] text-white uppercase whitespace-nowrap">
          FW24 / Archive Collection
        </div>
        <div className="h-24 w-[1px] bg-white mt-12 opacity-50"></div>
      </div>

      {/* Premium Glass Registration Card */}
      <div className="relative z-20 w-full max-w-lg p-6 sm:p-10 mx-6">
        {/* The Glass Container */}
        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-none"></div>

        <div className="relative z-10 px-4 py-8 sm:px-8">
          <div className="mb-10 block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-yellow-500"></div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-yellow-500">
                VIP Access
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-wide font-serif">
              Create Account.
            </h2>
            <p className="text-neutral-400 text-sm tracking-widest uppercase text-[10px]">
              Join the Snitch Syndicate.
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-8">
            {[
              { id: "fullname", type: "text", label: "Full Name" },
              { id: "email", type: "email", label: "Email Address" },
              { id: "contact", type: "tel", label: "Mobile Number" },
              { id: "password", type: "password", label: "Password" },
            ].map((field) => (
              <div key={field.id} className="relative group">
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="peer w-full h-10 bg-transparent border-0 border-b border-white/20 text-white placeholder-transparent focus:outline-none focus:border-yellow-500 transition-colors font-medium text-base rounded-none"
                  placeholder={field.label}
                  required
                />
                <label
                  htmlFor={field.id}
                  className="absolute left-0 -top-4 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.1em] transition-all 
                  peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/40 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-wide peer-placeholder-shown:top-2
                  peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-[0.1em] peer-focus:text-yellow-500 cursor-text"
                >
                  {field.label}
                </label>
              </div>
            ))}

            <div className="flex items-center gap-4 mt-2">
              <label className="relative flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border border-white/30 rounded-full transition-all peer-checked:bg-yellow-500 peer-checked:border-yellow-500 flex items-center justify-center group-hover:border-yellow-500/50">
                  <div className="w-2 h-2 rounded-full bg-black opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="ml-3 text-neutral-300 text-[11px] tracking-widest uppercase font-medium group-hover:text-white transition-colors">
                  Apply for Seller Access
                </span>
              </label>
            </div>

            <div className="mt-6 w-full pt-4">
              <button
                type="submit"
                className="group relative w-full overflow-hidden bg-transparent border border-yellow-500 text-yellow-500 uppercase font-bold tracking-[0.2em] text-xs py-4 rounded-full
                transition-all duration-300 hover:text-black w-full text-center"
              >
                <div className="absolute inset-0 bg-yellow-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10"></div>
                <span className="relative z-10 transition-colors duration-300">
                  Enter The Collection
                </span>
              </button>
            </div>
          </form>

           <a href="/api/auth/google" className="block text-center mt-8 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-yellow-500 transition-colors duration-300">
             — OR Continue With Google —
           </a>

          <div className="mt-12 text-center text-[10px] sm:text-xs tracking-widest uppercase font-medium text-neutral-500">
            <p>
              Already verified?{" "}
              <a
                href="/login"
                className="text-white hover:text-yellow-500 transition-colors ml-2 border-b border-white hover:border-yellow-500 pb-1"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

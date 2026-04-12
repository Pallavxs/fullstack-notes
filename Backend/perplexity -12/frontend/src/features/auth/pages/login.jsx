import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth';

const Login = () => {

    const { handleLogin } = useAuth()
    const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const payload = {
        email : form.email,
        password : form.password
    }

    await handleLogin(payload)
    navigate("/")
    console.log('Login submit', form)
  }

  const handleSwitchToRegister = () => {
    console.log('Switch to register')
  }

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_25%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.14),_transparent_30%)]" />
      <div className="relative mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-700/50 bg-slate-950/92 p-8 shadow-[0_32px_120px_-50px_rgba(15,23,42,0.7)]">
          <h1 className="text-3xl font-semibold text-white">Login</h1>
          <p className="mt-3 text-sm text-slate-400">Enter your email and password.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm">
              <span className="text-slate-300">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="mt-2 w-full rounded-3xl border border-slate-700/80 bg-slate-950/85 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>

            <label className="block text-sm">
              <span className="text-slate-300">Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-2 w-full rounded-3xl border border-slate-700/80 bg-slate-950/85 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01]"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleSwitchToRegister}
              className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/75 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
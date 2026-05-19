import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import hero from '../assets/hero.png';

const Landing = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(form.email, form.password);
  };

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="space-y-7">
          <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-indigo-700 shadow">New social media experience</div>
          <h1 className="text-5xl font-black leading-tight text-slate-950 md:text-7xl">Meet people. Share stories. Build your circle.</h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">Kivo Socials is a clean MERN social app with login, profile, posts, image uploads, likes and comments.</p>
          <div className="hidden rounded-[2rem] bg-white/70 p-4 shadow-soft backdrop-blur lg:block">
            <img src={hero} alt="social" className="max-h-72 w-full rounded-[1.5rem] object-contain" />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/70 bg-white/85 p-7 shadow-soft backdrop-blur">
          <div className="mb-7 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-3xl font-black text-white">K</div>
            <h2 className="mt-4 text-3xl font-black text-slate-900">Welcome back</h2>
            <p className="text-slate-500">Login to continue to Kivo Socials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={form.email} name="email" onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" required />
            <input type="password" value={form.password} name="password" onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" required />
            <button type="submit" className="w-full rounded-2xl bg-slate-900 py-3.5 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-indigo-700">Log In</button>
          </form>

          <div className="my-6 flex items-center gap-3 text-sm text-slate-400"><hr className="flex-1" /> OR <hr className="flex-1" /></div>
          <div className="flex justify-center gap-5 text-2xl text-slate-700"><FaFacebook /><FaGoogle /><FaApple /></div>

          <div className="mt-7 rounded-2xl bg-indigo-50 p-4 text-center text-slate-600">
            Don&apos;t have an account? <button onClick={() => navigate('/register')} className="font-black text-indigo-700 hover:underline">Sign up</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;

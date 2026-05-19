import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCameraOutline } from 'react-icons/io5';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    setAvatar(file || null);
    setPreview(file ? URL.createObjectURL(file) : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(form.username, form.email, form.password, avatar);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-soft backdrop-blur">
        <div className="mb-7 text-center">
          <h1 className="text-4xl font-black text-slate-950">Create account</h1>
          <p className="mt-2 text-slate-500">Join Kivo Socials and start posting today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="mx-auto flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-white bg-indigo-50 shadow-soft">
            {preview ? <img src={preview} alt="avatar" className="h-full w-full object-cover" /> : <IoCameraOutline className="text-4xl text-indigo-600" />}
            <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
          </label>

          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" required />
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" required />
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" required />
          <button type="submit" className="w-full rounded-2xl bg-slate-900 py-3.5 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-indigo-700">Create Account</button>
        </form>

        <p className="mt-6 text-center text-slate-600">Already have an account? <button onClick={() => navigate('/')} className="font-black text-indigo-700 hover:underline">Login</button></p>
      </div>
    </main>
  );
};

export default Register;

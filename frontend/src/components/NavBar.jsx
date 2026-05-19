import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut, IoMdClose, IoMdMenu } from 'react-icons/io';
import { IoAddCircleOutline } from 'react-icons/io5';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { handleLogout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <button onClick={() => navigate('/posts')} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-xl font-black text-white shadow-soft">K</div>
          <div className="text-left">
            <h1 className="text-lg font-black text-slate-900">Kivo Socials</h1>
            <p className="hidden text-xs text-slate-500 sm:block">Connect • Share • Grow</p>
          </div>
        </button>

        <div className="hidden items-center gap-3 md:flex">
          <button onClick={() => navigate('/create-post')} className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-indigo-700">
            <IoAddCircleOutline className="text-xl" /> Add Post
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-full bg-red-50 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-100">
            <IoIosLogOut className="text-xl" /> Logout
          </button>
          <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-indigo-100 shadow">
            {user?.avatar ? <img src={user.avatar} alt="avatar" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center font-bold text-indigo-700">{user?.username?.[0]?.toUpperCase() || 'U'}</div>}
          </div>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl p-2 text-2xl md:hidden">
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <button onClick={() => navigate('/create-post')} className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white">
            <IoAddCircleOutline /> Add Post
          </button>
          <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-semibold text-red-600">
            <IoIosLogOut /> Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;

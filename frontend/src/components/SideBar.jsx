import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { CiSettings } from 'react-icons/ci';
import { RiHome2Line } from 'react-icons/ri';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';
import { AuthContext } from '../context/AuthContext';

const SideBar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const items = [
    { icon: <RiHome2Line />, label: 'Home', action: () => navigate('/posts') },
    { icon: <CgProfile />, label: 'Profile' },
    { icon: <CiSettings />, label: 'Settings' }
  ];

  return (
    <aside className="hidden h-[calc(100vh-90px)] w-56 shrink-0 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-soft backdrop-blur md:flex md:flex-col md:justify-between">
      <div className="space-y-2">
        {items.map((item) => (
          <button key={item.label} onClick={item.action} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">
            <span className="text-xl">{item.icon}</span>{item.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold text-slate-600 hover:bg-slate-50">
          <MdOutlineHelpOutline className="text-xl" /> Help
        </button>
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-2xl bg-red-50 px-4 py-3 text-left font-semibold text-red-600 hover:bg-red-100">
          <IoIosLogOut className="text-xl" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

import axios from 'axios';
import cookie from 'js-cookie';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://kevo-socialmedia-backend.onrender.com';

  const [token, setToken] = useState(cookie.get('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete axios.defaults.headers.common.Authorization;
  }, [token]);

  const fetchCurrentUserDetails = async () => {
    try {
      const currentToken = cookie.get('token');
      if (!currentToken) return;
      const { data } = await axios.get(`${backendUrl}/api/user/me`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      if (data.success) setUser(data.currentUser);
    } catch (error) {
      cookie.remove('token');
      setToken('');
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) fetchCurrentUserDetails();
  }, [token]);

  const handleRegister = async (username, email, password, avatar) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      if (avatar) formData.append('image', avatar);

      const { data } = await axios.post(`${backendUrl}/api/user/register`, formData);

      if (data.success) {
        cookie.set('token', data.token, { expires: 7 });
        setToken(data.token);
        setUser(data.user);
        toast.success(data.message);
        navigate('/posts');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Register failed');
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
      if (data.success) {
        cookie.set('token', data.token, { expires: 7 });
        setToken(data.token);
        setUser(data.user);
        toast.success(data.message);
        navigate('/posts');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    cookie.remove('token');
    setToken('');
    setUser(null);
    toast.success('Logout successfully');
    navigate('/');
  };

  const value = useMemo(() => ({
    backendUrl,
    token,
    user,
    setUser,
    handleRegister,
    handleLogin,
    handleLogout,
    fetchCurrentUserDetails
  }), [backendUrl, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

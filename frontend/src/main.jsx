import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App.jsx';
import AuthContextProvider from './context/AuthContext.jsx';
import PostContextProvider from './context/PostsContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
        <ToastContainer position="top-right" autoClose={2500} />
      </PostContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

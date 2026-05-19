import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';
import AddPost from './components/AddPost';
import Landing from './pages/Landing';
import PostsPage from './pages/PostsPage';
import Register from './pages/Register';

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      {token && <NavBar />}
      <Routes>
        {token ? (
          <>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/create-post" element={<AddPost />} />
            <Route path="*" element={<Navigate to="/posts" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;

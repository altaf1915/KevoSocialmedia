import axios from 'axios';
import cookie from 'js-cookie';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export const PostContext = createContext(null);

const authHeader = () => ({ Authorization: `Bearer ${cookie.get('token')}` });

const PostContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AuthContext);

  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const normalizeUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${backendUrl}${url}`;
  };

  const fetchAllPosts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/posts/get-posts`);
      if (data.success) setAllPosts(data.posts);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load posts');
    }
  };

  const fetchPostsOfLoginUser = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/posts/user-posts`, { headers: authHeader() });
      if (data.success) setUserPosts(data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (id) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/posts/post/${id}/like`, {}, { headers: authHeader() });
      if (data.success) fetchAllPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Like failed');
    }
  };

  const addComment = async (id, text) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/posts/post/${id}/comment`, { text }, { headers: authHeader() });
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Comment failed');
    }
  };

  const createPost = async (text, image) => {
    try {
      const formData = new FormData();
      formData.append('text', text);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/posts/create`, formData, { headers: authHeader() });
      if (data.success) {
        toast.success(data.message);
        await fetchAllPosts();
        await fetchPostsOfLoginUser();
        navigate('/posts');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Post creation failed');
    }
  };

  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/posts/post/${id}`, { headers: authHeader() });
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
        fetchPostsOfLoginUser();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllPosts();
      fetchPostsOfLoginUser();
    }
  }, [token]);

  const value = useMemo(() => ({
    allPosts,
    userPosts,
    setUserPosts,
    fetchAllPosts,
    fetchPostsOfLoginUser,
    likePost,
    addComment,
    createPost,
    deletePost,
    normalizeUrl
  }), [allPosts, userPosts]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostContextProvider;

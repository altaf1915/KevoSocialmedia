import { useContext, useState } from 'react';
import { FaCommentDots, FaThumbsUp } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostsContext';
import Profile from '../components/Profile';
import SideBar from '../components/SideBar';

const PostsPage = () => {
  const { user } = useContext(AuthContext);
  const { allPosts, likePost, addComment, normalizeUrl } = useContext(PostContext);
  const [comments, setComments] = useState({});

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const text = comments[id]?.trim();
    if (text) {
      addComment(id, text);
      setComments((prev) => ({ ...prev, [id]: '' }));
    }
  };

  return (
    <main className="mx-auto flex max-w-7xl gap-5 px-4 py-6">
      <SideBar />

      <section className="min-w-0 flex-1 space-y-5">
        {allPosts.length === 0 && (
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-10 text-center shadow-soft">
            <h2 className="text-2xl font-black text-slate-900">No posts yet</h2>
            <p className="mt-2 text-slate-500">Create your first post to see it here.</p>
          </div>
        )}

        {allPosts.map((post) => (
          <article key={post._id} className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-soft backdrop-blur">
            <div className="flex items-center gap-3 p-5">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-indigo-100">
                {post.user?.avatar ? <img src={normalizeUrl(post.user.avatar)} alt="avatar" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center font-black text-indigo-700">{post.user?.username?.[0]?.toUpperCase() || 'U'}</div>}
              </div>
              <div>
                <h3 className="font-black text-slate-900">{post.user?.username || 'User'}</h3>
                <p className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {post.text && <p className="px-5 pb-4 leading-7 text-slate-700">{post.text}</p>}
            {post.image && <img src={normalizeUrl(post.image)} alt="post" className="max-h-[560px] w-full object-cover" />}

            <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 text-sm font-bold text-slate-600">
              <button onClick={() => likePost(post._id)} className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-indigo-700 hover:bg-indigo-100">
                <FaThumbsUp /> {post.likes?.length || 0} Likes
              </button>
              <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2"><FaCommentDots /> {post.comments?.length || 0} Comments</div>
            </div>

            <div className="space-y-3 p-5">
              {(post.comments || []).slice(-3).map((comment) => (
                <div key={comment._id} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <span className="font-black text-slate-900">{comment.user?.username || 'User'}: </span>{comment.text}
                </div>
              ))}

              <form onSubmit={(e) => handleSubmit(e, post._id)} className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-indigo-100">
                  {user?.avatar ? <img src={normalizeUrl(user.avatar)} alt="avatar" className="h-full w-full object-cover" /> : null}
                </div>
                <input value={comments[post._id] || ''} onChange={(e) => setComments((prev) => ({ ...prev, [post._id]: e.target.value }))} placeholder="Write your comment..." className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
                <button type="submit" className="rounded-full bg-slate-900 p-3 text-white hover:bg-indigo-700"><IoSend /></button>
              </form>
            </div>
          </article>
        ))}
      </section>

      <Profile />
    </main>
  );
};

export default PostsPage;

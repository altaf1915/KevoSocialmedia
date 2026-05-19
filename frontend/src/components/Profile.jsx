import { useContext, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostsContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { userPosts, deletePost, fetchPostsOfLoginUser, normalizeUrl } = useContext(PostContext);

  useEffect(() => {
    fetchPostsOfLoginUser();
  }, []);

  return (
    <aside className="hidden h-[calc(100vh-90px)] w-80 shrink-0 overflow-y-auto rounded-3xl border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur lg:block">
      <div className="text-center">
        <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-indigo-100 shadow-soft">
          {user?.avatar ? <img src={normalizeUrl(user.avatar)} alt="avatar" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-4xl font-black text-indigo-700">{user?.username?.[0]?.toUpperCase() || 'U'}</div>}
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-900">{user?.username}</h2>
        <p className="text-sm text-slate-500">{user?.email}</p>
        <div className="mt-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-fuchsia-50 p-4 font-bold text-slate-700">
          Total Posts: <span className="text-indigo-700">{userPosts.length}</span>
        </div>
      </div>

      <h3 className="mb-3 mt-6 font-black text-slate-900">Your Uploads</h3>
      <div className="grid grid-cols-3 gap-3">
        {userPosts.map((post) => (
          <div key={post._id} className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
            {post.image ? <img src={normalizeUrl(post.image)} alt="post" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center p-2 text-center text-xs text-slate-500">Text post</div>}
            <button onClick={() => deletePost(post._id)} className="absolute inset-0 flex items-center justify-center bg-black/50 text-2xl text-white opacity-0 transition group-hover:opacity-100">
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Profile;
